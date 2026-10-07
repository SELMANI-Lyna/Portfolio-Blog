export const TAG_SPLIT = /((?:^|\s)#(?:[\w-]+))/g;

export function extractTags(...parts: Array<string | null | undefined>) {
  const text = parts.filter(Boolean).join(" ");
  const matches = text.matchAll(TAG_SPLIT);
  const tags = [...matches].map((m) => m[1].trim().slice(1).toLowerCase());
  return [...new Set(tags)];
}

export function fmtDate(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function readingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
