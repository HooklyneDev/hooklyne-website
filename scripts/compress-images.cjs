const sharp = require("sharp");
const { mkdirSync } = require("fs");
const path = require("path");

const pub = path.join(__dirname, "../public");
mkdirSync(path.join(pub, "home/screens"), { recursive: true });

const jobs = [
  ["your research layer.png",                    "home/hooklyne-research-layer-b2b-prospecting.webp"],
  ["Dutch built .png",                           "home/hooklyne-dutch-international-outreach.webp"],
  ["every outreach backed by a real signal.png", "home/hooklyne-signal-based-outreach.webp"],
  ["triple verified accross 20+ sources.png",    "home/hooklyne-triple-verified-contact-data.webp"],
  ["your reps voice.png",                        "home/hooklyne-personalized-outreach-email.webp"],
  ["real time signals.png",                      "home/hooklyne-real-time-prospect-signals.webp"],
  ["screens/signal-hook.png",                    "home/screens/hooklyne-signal-hook.webp"],
  ["screens/contact-verified.png",               "home/screens/hooklyne-contact-verified.webp"],
  ["screens/voice-email.png",                    "home/screens/hooklyne-voice-email.webp"],
  ["screens/inbox-ready.png",                    "home/screens/hooklyne-inbox-ready.webp"],
  ["screens/positioning-stack.png",              "home/screens/hooklyne-positioning-stack.webp"],
  ["screens/dutch-en-nl.png",                    "home/screens/hooklyne-dutch-en-nl.webp"],
];

(async () => {
  for (const [src, dest] of jobs) {
    try {
      const info = await sharp(path.join(pub, src))
        .resize({ width: 1400, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(path.join(pub, dest));
      process.stdout.write("OK " + dest + " " + Math.round(info.size / 1024) + "KB\n");
    } catch (e) {
      process.stderr.write("ERR " + src + " " + e.message + "\n");
    }
  }
  process.stdout.write("Done\n");
})();
