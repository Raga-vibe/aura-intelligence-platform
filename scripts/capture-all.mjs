import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BROWSER_PATH = fs.existsSync(CHROME_PATH) ? CHROME_PATH : EDGE_PATH;
const USER_DATA_DIR = path.resolve("./.chrome-profile");
const SCREENSHOTS_DIR = path.resolve("./screenshots");

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("Launching headless browser at:", BROWSER_PATH);
  const browserProc = spawn(
    BROWSER_PATH,
    [
      "--headless=new",
      "--remote-debugging-port=9222",
      `--user-data-dir=${USER_DATA_DIR}`,
      "--disable-gpu",
      "--window-size=1440,960",
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  await sleep(1500);

  // Fetch debugging target
  const versionRes = await fetch("http://127.0.0.1:9222/json/list");
  const targets = await versionRes.json();
  const pageTarget = targets.find((t) => t.type === "page") || targets[0];
  console.log("Connected to page target:", pageTarget.webSocketDebuggerUrl);

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  let idCounter = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  };

  const send = (method, params = {}) => {
    return new Promise((resolve) => {
      const id = idCounter++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  await new Promise((r) => (ws.onopen = r));
  console.log("CDP WebSocket connection opened.");

  await send("Page.enable");
  await send("DOM.enable");

  // Navigate to localhost:3000
  console.log("Navigating to http://localhost:3000...");
  await send("Page.navigate", { url: "http://localhost:3000" });
  await sleep(3000); // Wait for hydration and WebGL init

  const capture = async (name) => {
    const res = await send("Page.captureScreenshot", { format: "png" });
    const buffer = Buffer.from(res.result.data, "base64");
    const filePath = path.join(SCREENSHOTS_DIR, `${name}.png`);
    fs.writeFileSync(filePath, buffer);
    console.log(`Saved screenshot: ${name}.png (${buffer.length} bytes)`);
  };

  const evaluate = async (expression) => {
    return await send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
  };

  // 1. Hero
  console.log("Capturing Hero...");
  await capture("01-hero");

  // 2. Scroll to Architecture Story
  console.log("Scrolling to ScrollStory...");
  await evaluate(`document.getElementById('scroll-story')?.scrollIntoView({ behavior: 'instant', block: 'start' });`);
  await sleep(800);
  await capture("02-scroll-story");

  // 3. Scroll to Interactive Demo
  console.log("Scrolling to Interactive Demo...");
  await evaluate(`document.getElementById('interactive-demo')?.scrollIntoView({ behavior: 'instant', block: 'start' });`);
  await sleep(800);
  await capture("03-interactive-demo");

  // 4. Click Dataset Switcher (e.g. Single-Cell RNA)
  console.log("Clicking Single-Cell RNA dataset tab...");
  await evaluate(`
    const buttons = Array.from(document.querySelectorAll('button'));
    const rnaBtn = buttons.find(b => b.textContent.includes('Single-Cell RNA'));
    if (rnaBtn) rnaBtn.click();
  `);
  await sleep(1000);
  await capture("04-interactive-demo-rna");

  // 5. Scroll to Bento Features
  console.log("Scrolling to Bento Features...");
  await evaluate(`document.getElementById('bento-features')?.scrollIntoView({ behavior: 'instant', block: 'start' });`);
  await sleep(800);
  await capture("05-bento-features");

  // 6. Scroll to Performance Specs
  console.log("Scrolling to Performance Specs...");
  await evaluate(`document.getElementById('performance')?.scrollIntoView({ behavior: 'instant', block: 'start' });`);
  await sleep(800);
  await capture("06-performance-specs");

  // 7. Scroll to Footer / CTA
  console.log("Scrolling to Keynote CTA & Footer...");
  await evaluate(`window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`);
  await sleep(800);
  await capture("07-keynote-cta-footer");

  ws.close();
  browserProc.kill();
  console.log("All screenshots captured successfully.");
}

main().catch(console.error);
