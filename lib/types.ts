export type StatPair = {
  label: string;
  value: string;
};

export type ContactLink = {
  label: string;
  url: string;
};

export function asStatPairs(value: unknown): StatPair[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const label = typeof record.label === "string" ? record.label : "";
      const statValue = typeof record.value === "string" ? record.value : "";
      if (!label && !statValue) return null;
      return { label, value: statValue };
    })
    .filter((item): item is StatPair => item !== null);
}

export function asContactLinks(value: unknown): ContactLink[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const label = typeof record.label === "string" ? record.label : "";
      const url = typeof record.url === "string" ? record.url : "";
      if (!label && !url) return null;
      return { label, url };
    })
    .filter((item): item is ContactLink => item !== null);
}
