/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)"
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)"
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-destructive-foreground)"
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)"
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)"
        },
        popover: {
          DEFAULT: "var(--color-popover)",
          foreground: "var(--color-popover-foreground)"
        },
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)"
        },
        success: {
          DEFAULT: "var(--color-success)",
          foreground: "var(--color-success-foreground)"
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          foreground: "var(--color-warning-foreground)"
        },
        error: {
          DEFAULT: "var(--color-error)",
          foreground: "var(--color-error-foreground)"
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-surface-foreground)"
        },
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "neon-mint": {
          DEFAULT: "var(--color-neon-mint)",
          dark: "var(--color-neon-mint-dark)",
          light: "var(--color-neon-mint-light)"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        "space-grotesk": ["Space Grotesk", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        "jetbrains-mono": ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        hero: ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        display: ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        heading: ["2rem", { lineHeight: "1.3" }],
        subheading: ["1.5rem", { lineHeight: "1.4" }],
        body: ["1rem", { lineHeight: "1.6" }],
        caption: ["0.875rem", { lineHeight: "1.5" }],
        micro: ["0.75rem", { lineHeight: "1.4" }]
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)"
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
        "glow-active": "var(--shadow-glow-active)",
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)"
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        orbit: "orbit 10s linear infinite",
        magnetic: "magnetic 0.2s ease-out",
        "slide-in-from-top-2": "slideInFromTop2 0.2s ease-out"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 209, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 255, 209, 0.6)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(100px) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(100px) rotate(-360deg)"
          }
        },
        magnetic: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.02)" }
        },
        slideInFromTop2: {
          "0%": { transform: "translateY(-8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        }
      },
      backdropBlur: {
        xs: "2px"
      },
      perspective: {
        1000: "1000px",
        1500: "1500px",
        2000: "2000px"
      },
      transformStyle: {
        "preserve-3d": "preserve-3d"
      },
      backfaceVisibility: {
        hidden: "hidden"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".perspective-1000": {
          perspective: "1000px"
        },
        ".perspective-1500": {
          perspective: "1500px"
        },
        ".perspective-2000": {
          perspective: "2000px"
        },
        ".transform-style-preserve-3d": {
          "transform-style": "preserve-3d"
        },
        ".backface-hidden": {
          "backface-visibility": "hidden"
        },
        ".text-glow": {
          "text-shadow": "0 0 10px currentColor"
        },
        ".glow-neon": {
          "box-shadow": "var(--shadow-glow)"
        },
        ".glow-neon-active": {
          "box-shadow": "var(--shadow-glow-active)"
        },
        ".transition-smooth": {
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)"
        },
        ".transition-fast": {
          transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)"
        },
        ".transition-slow": {
          transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)"
        }
      };
      addUtilities(newUtilities);
    }
  ]
};
