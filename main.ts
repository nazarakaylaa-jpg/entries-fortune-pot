// Fortune in a Pot — u-golden-heron-44-fortune-in-a-pot-ded981e9
// One kind, funny fortune for a houseplant, written to /output/entry.txt.
// The fortune is a fixed string: the program is deterministic by design,
// so the two grading runs produce byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "The cat will finally admit you are the prettiest thing on the sill — and this time, it will not even try a nibble.";

// Gate (competition.yaml): /output/entry.txt must be UTF-8 text of
// 1 to 120 characters, not only whitespace, a single line.
const MAX_CHARS = 120;

function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`fortune is ${chars} characters, must be 1-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("fortune must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("fortune must be a single line");
  }
}

validate(FORTUNE);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, FORTUNE, "utf8");
// Read back and re-validate: the file on disk must be exactly the fortune,
// valid UTF-8, one line, within the gate — no trailing newline, no drift.
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== FORTUNE) {
  throw new Error("entry.txt on disk differs from the validated fortune");
}
validate(onDisk);
console.log(`wrote ${[...FORTUNE].length} characters to ${outPath}`);
console.log(FORTUNE);
