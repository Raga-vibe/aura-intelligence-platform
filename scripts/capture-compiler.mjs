import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BROWSER_PATH = fs.existsSync(CHROME_PATH) ? CHROME_PATH : EDGE_PATH;
const USER_DATA_DIR = path.resolve("./.chrome-profile");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
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

  const versionRes = await fetch("http://127.0.0.1:9222/json/list");
  const targets = await versionRes.json();
  const pageTarget = targets.find((t) => t.type === "page") || targets[0];

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

  await send("Page.enable");
  await send("DOM.enable");
  await send("Page.navigate", { url: "http://localhost:3000" });
  await sleep(2500);

  // Scroll to middle of bento
  await send("Runtime.evaluate", {
    expression: `
      const bento = document.getElementById('bento-features');
      if (bento) {
        const top = bento.getBoundingClientRect().top + window.scrollY + 400;
        window.scrollTo({ top, behavior: 'instant' });
      }
    `,
  });

  await sleep(600);

  const res = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("screenshots/05-bento-bottom-row.png", Buffer.from(res.result.data, "base64"));
  console.log("Captured 05-bento-bottom-row.png");

  // Scroll to CTA specifically
  await send("Runtime.evaluate", {
    expression: `
      const cta = document.getElementById('keynote-cta');
      if (cta) {
        cta.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    `,
  });

  await sleep(600);

  const resCTA = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("screenshots/07-keynote-cta-centered.png", Buffer.from(resCTA.result.data, "base64"));
  console.log("Captured 07-keynote-cta-centered.png");

  ws.close();
  browserProc.kill();
}

main().catch(console.error);
