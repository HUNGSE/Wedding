// Color Palette - Unified Design System
export const COLORS = {
  // Primary Colors
  primary: {
    main: "#5a4585",      // Tím chính (headings, main text)
    light: "#a87ca0",     // Tím nhạt (menu, secondary)
    accent: "#b588a1",    // Hồng tím (accents, timeline)
    dark: "#7b68c5",      // Tím đậm (buttons hover)
  },
  // Background Colors (Standardized - 2 colors only)
  background: {
    primary: "#fcf7fa",   // Hồng nhạt chính (most sections)
    accent: "#fff9fb",    // Trắng hồng (hero, video)
    footer: "#f3effb",    // Tím nhạt (footer)
  },
  // Supporting Colors
  support: {
    text: "#6d6d6d",      // Xám body text
    border: "#e8d9d0",    // Biên vàng (unified)
    white: "#ffffff",     // Trắng
  },
  // Gradient Colors
  gradient: {
    timeline: "from-[#d9c7f0] to-[#f0d4d8]", // Timeline gradient
  },
};

// Typography - Unified Font System (3 fonts only)
export const FONTS = {
  serif: "Playfair Display, serif",      // Titles, headings
  script: "Dancing Script, cursive",     // Hero accent
  display: "Cormorant Garamond, serif",  // Secondary titles
  sans: "Poppins, sans-serif",           // Body, descriptions
  decorative: "Great Vibes, cursive",    // Logo only
};

// Font Sizes
export const FONT_SIZES = {
  h1: "text-4xl sm:text-5xl",
  h2: "text-4xl",
  h3: "text-2xl sm:text-3xl",
  h4: "text-xl",
  body: "text-base",
  small: "text-sm",
  tiny: "text-xs",
};

// Transitions
export const TRANSITIONS = {
  default: "transition-all duration-300",
  slow: "transition-all duration-500",
  fast: "transition-colors duration-300",
};
