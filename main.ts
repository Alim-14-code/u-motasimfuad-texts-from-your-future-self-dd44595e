// Texts from Your Future Self — R1 entry program.
// Reads the text message from your future self in entry.txt beside this
// file and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt (Node stdlib only).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entryPath = join(here, "entry.txt");
const entry = readFileSync(entryPath, "utf8").trim();
if (!entry) throw new Error("entry.txt is empty — future you has nothing to say");
const charCount = entry.length;
if (charCount >= 200) throw new Error(`entry is ${charCount} chars — must stay under 200`);
const preview = entry.length > 40 ? entry.slice(0, 40) + "…" : entry;

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry + "\n", "utf8");
const target = join(outDir, "entry.txt");
console.log(`Future self texts (${charCount} chars): "${preview}" → ${target}`);
console.log(`Message received at ${target} — future you is still waiting up.`);
