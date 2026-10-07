export function GridBackdrop() {
  const mask = "radial-gradient(ellipse 70% 100% at 50% 0%, #000 30%, transparent 75%)";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
      style={{
        backgroundImage:
          "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
