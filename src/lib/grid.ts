/**
 * Picks a column count for a row of cards so the last row never holds a
 * single orphan card. 4 cards → 4 across (2x2 on tablets). 5 → 3 + 2.
 * 6 → 3 + 3. 7 → 4 + 3. Works for any count, so admin edits stay tidy.
 */
export function balancedCols(count: number, max = 4): number {
  if (count <= max) return Math.max(1, count);
  for (let c = max; c >= 2; c--) if (count % c === 0) return c;
  for (let c = max; c >= 2; c--) if (count % c !== 1) return c;
  return 2;
}

/** Literal class names so Tailwind generates them. */
export const LG_COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};
