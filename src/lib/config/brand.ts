/** Design tokens derived from Takamel HR logo — all UI pulls from these variables. */
export const brand = {
  navy: "#003366",
  teal: "#00A3A3",
  tealDeep: "#008080",
  emerald: "#2ECC71",
  gold: "#C5A059",
  surface: "#F8FAFB",
  border: "#E2E8F0",
  muted: "#64748B",
} as const;

export const gradients = {
  primary: "linear-gradient(135deg, #003366 0%, #00A3A3 55%, #2ECC71 100%)",
  subtle: "linear-gradient(180deg, rgba(0, 163, 163, 0.08) 0%, rgba(46, 204, 113, 0.06) 100%)",
} as const;
