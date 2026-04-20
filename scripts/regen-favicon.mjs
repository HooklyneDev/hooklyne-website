import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const faviconDir = path.resolve(__dirname, "../public/favicon");
const svgPath = path.join(faviconDir, "favicon.svg");
const svgBuf = fs.readFileSync(svgPath);

// Render PNGs at required sizes
async function renderPng(size) {
  return sharp(svgBuf, { density: 384 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

// Minimal ICO writer: embeds PNG-compressed images (supported everywhere since Vista)
function buildIco(pngs) {
  const ICONDIR = Buffer.alloc(6);
  ICONDIR.writeUInt16LE(0, 0);           // reserved
  ICONDIR.writeUInt16LE(1, 2);           // type: 1 = ICO
  ICONDIR.writeUInt16LE(pngs.length, 4); // count

  const entries = [];
  let offset = 6 + pngs.length * 16;
  for (const { size, buf } of pngs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2);                      // palette
    entry.writeUInt8(0, 3);                      // reserved
    entry.writeUInt16LE(1, 4);                   // planes
    entry.writeUInt16LE(32, 6);                  // bpp
    entry.writeUInt32LE(buf.length, 8);          // size
    entry.writeUInt32LE(offset, 12);             // offset
    offset += buf.length;
    entries.push(entry);
  }
  return Buffer.concat([ICONDIR, ...entries, ...pngs.map((p) => p.buf)]);
}

const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map(async (s) => ({ size: s, buf: await renderPng(s) })));
fs.writeFileSync(path.join(faviconDir, "favicon.ico"), buildIco(pngs));
console.log("wrote favicon.ico (" + sizes.join(", ") + ")");

// Regenerate the PNG variants from the tightened SVG
fs.writeFileSync(path.join(faviconDir, "favicon-96x96.png"), await renderPng(96));
console.log("wrote favicon-96x96.png");

fs.writeFileSync(path.join(faviconDir, "apple-touch-icon.png"), await renderPng(180));
console.log("wrote apple-touch-icon.png");

fs.writeFileSync(path.join(faviconDir, "web-app-manifest-192x192.png"), await renderPng(192));
console.log("wrote web-app-manifest-192x192.png");

fs.writeFileSync(path.join(faviconDir, "web-app-manifest-512x512.png"), await renderPng(512));
console.log("wrote web-app-manifest-512x512.png");
