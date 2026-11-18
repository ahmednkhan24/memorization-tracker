import { SURAHS } from "./surahs.js";

// CSV format: surah,verse,status
// A blank verse is a whole-surah row. Every surah gets a row ("none" by default);
// verse rows are only written for learning/memorized verses, in any order.
// A memorized surah needs no verse rows (they are ignored on load).
const HEADER = "surah,verse,status";
const STATUSES = new Set(["none", "learning", "memorized"]);
const VERSE_COUNTS = Object.fromEntries(SURAHS.map((s) => [s.number, s.verses]));

export function dataToCsv(data) {
  const rows = [HEADER];
  for (const { number: s, verses: count } of SURAHS) {
    const surah = data.surahStatus[s] || "none";
    rows.push(`${s},,${surah}`);
    if (surah === "memorized") continue;
    const verses = data.verseStatus[s] || {};
    for (let v = 1; v <= count; v++) {
      if (verses[v] && verses[v] !== "none") rows.push(`${s},${v},${verses[v]}`);
    }
  }
  return rows.join("\n") + "\n";
}

// Returns null if the text isn't a valid tracker CSV (e.g. a 404 / index.html fallback).
// Invalid rows are skipped with a console warning.
export function csvToData(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines[0]?.trim().toLowerCase() !== HEADER) return null;
  const data = { surahStatus: {}, verseStatus: {} };
  lines.slice(1).forEach((line, i) => {
    if (!line.trim()) return;
    const [s, v, rawStatus] = line.split(",").map((x) => x.trim());
    const status = (rawStatus || "").toLowerCase();
    const surah = Number(s);
    const verse = v ? Number(v) : null;
    const max = VERSE_COUNTS[surah];
    const ok =
      STATUSES.has(status) &&
      Number.isInteger(surah) && max &&
      (verse === null || (Number.isInteger(verse) && verse >= 1 && verse <= max));
    if (!ok) {
      console.warn(`memorization.csv line ${i + 2} skipped: "${line}"`);
      return;
    }
    // Later rows override earlier ones; "none" clears.
    const target = verse === null ? data.surahStatus : (data.verseStatus[surah] ||= {});
    const key = verse === null ? surah : verse;
    if (status === "none") delete target[key];
    else target[key] = status;
  });
  // A memorized surah stores no per-verse statuses in the app.
  for (const s of Object.keys(data.surahStatus)) {
    if (data.surahStatus[s] === "memorized") delete data.verseStatus[s];
  }
  for (const s of Object.keys(data.verseStatus)) {
    if (!Object.keys(data.verseStatus[s]).length) delete data.verseStatus[s];
  }
  return data;
}

export async function fetchSavedData() {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}memorization.csv`, { cache: "no-store" });
    if (!res.ok) return null;
    return csvToData(await res.text());
  } catch {
    return null;
  }
}

export function downloadCsv(data) {
  const url = URL.createObjectURL(new Blob([dataToCsv(data)], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "memorization.csv";
  a.click();
  URL.revokeObjectURL(url);
}
