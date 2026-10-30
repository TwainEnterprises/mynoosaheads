/**
 * V2TrustRow — the source/trust strip.
 *
 * MSN-3100. Mirrors the partner row on the quality bar, but every entry is
 * one of the sources this page already cites (BOM, Open-Meteo, MSQ,
 * SunSmart, QPWS). Text wordmarks only — we do not fabricate logos.
 */

export type V2TrustRowProps = {
  label?: string;
  items: { label: string; href: string }[];
};

export function V2TrustRow({ label = "Live sources", items }: V2TrustRowProps) {
  return (
    <section className="v2-trust" aria-label={label}>
      <div className="v2-container">
        <div className="v2-trust__inner">
          <span className="v2-trust__label">{label}</span>
          {items.map((item) => (
            <a
              key={item.href}
              className="v2-trust__item"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
