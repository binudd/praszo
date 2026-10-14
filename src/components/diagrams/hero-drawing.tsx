export function HeroDrawing() {
  return (
    <svg
      viewBox="0 0 520 620"
      role="img"
      aria-label="Technical drawing connecting interface frames, components, and a workspace system"
      className="h-auto w-full"
    >
      <defs>
        <pattern id="hero-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e4e7ec" strokeWidth="0.55" />
        </pattern>
      </defs>
      <rect width="520" height="620" fill="#f8f9fc" />
      <rect width="520" height="620" fill="url(#hero-grid)" />
      <g data-hero-wire fill="none" stroke="#5f666d" strokeWidth="0.8" opacity="0.75">
        <rect x="32" y="40" width="150" height="88" />
        <rect x="48" y="56" width="78" height="8" />
        <rect x="48" y="74" width="112" height="6" />
        <rect x="48" y="90" width="64" height="6" />
      </g>
      <g data-hero-shape fill="none" stroke="#9aa0a6" strokeWidth="1">
        <rect x="214" y="32" width="274" height="188" />
        <rect x="230" y="48" width="242" height="24" />
        <rect x="230" y="86" width="148" height="118" />
        <rect x="390" y="86" width="82" height="118" />
        <path d="M238 60h52" stroke="#217BFE" strokeWidth="2" />
        <path d="M238 106h86M238 126h112M238 146h58" stroke="#5f666d" />
        <rect x="400" y="100" width="62" height="14" stroke="#217BFE" />
        <rect x="400" y="124" width="62" height="64" />
      </g>
      <path
        data-hero-link
        d="M182 92 C182 150 198 176 214 128"
        fill="none"
        stroke="#e4e7ec"
      />
      <circle data-hero-pulse cx="214" cy="128" r="3.5" fill="#217BFE" />
      <g data-hero-nodes fill="none" stroke="#5f666d">
        <circle cx="86" cy="196" r="11" />
        <circle cx="148" cy="228" r="11" />
        <circle cx="214" cy="248" r="11" stroke="#217BFE" />
        <path d="M97 202 L137 222M159 232 L203 244" />
      </g>
      <g fill="none" stroke="#9aa0a6" strokeWidth="1">
        <rect x="32" y="292" width="456" height="284" />
        <rect x="32" y="292" width="456" height="34" />
        <rect x="48" y="304" width="70" height="10" />
        <rect x="396" y="302" width="76" height="14" stroke="#217BFE" />
        <path d="M32 390h456M176 326v250" />
        {[0, 1, 2, 3, 4].map((row) => (
          <g key={row}>
            <rect x="48" y={344 + row * 36} width="108" height="10" stroke="#5f666d" />
            <rect x="196" y={344 + row * 36} width="52" height="10" stroke="#5f666d" />
            <rect x="268" y={344 + row * 36} width="52" height="10" stroke="#5f666d" />
            <rect x="340" y={344 + row * 36} width="52" height="10" stroke="#5f666d" />
            <rect x="412" y={344 + row * 36} width="52" height="10" stroke="#5f666d" />
          </g>
        ))}
      </g>
      <text
        x="32"
        y="604"
        fill="#5f666d"
        fontSize="10"
        fontFamily="Roboto Flex, Roboto, sans-serif"
        letterSpacing="1.8"
      >
        INTERFACE → COMPONENTS → SYSTEM
      </text>
    </svg>
  );
}
