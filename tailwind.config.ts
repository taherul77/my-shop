import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#C4161C",
        brandColor: "#E84538",
        brandColorSecondary: "#010202",
        brandColorLs: "#0A0A0A",
        brandColorHover: "#212424",
        text: "#1C1C1C",
        textSecondary: "#444444",
        textOptional: "#646464",
        backgroundColor: "#F5F5F5",
        grayLightPrimary: "#D4D4D4",
        grayLightSecondary: "#EBEBEB",
        grayPrimary: "#F2F2F2",
        graySecondary: "#E6E6E6",
        // grayTertiary:"#D4D4D4",
        grayQuaternary: "#989898",
        grayDarkPrimary: "#939393",
        whitePrimary: "#FFFFFF",
        successColor: "#53A653",
        successColorHover: "#418D41",
        whatsappColor:"#55CD6C",
        linkPrimary: "#0075FF",
        brandColorOptional: "#FF0000",
        brandColorTertiary: "#FF5F15",
        yellow:'#EAB308',
        //gradientColorOne:'#010202',

        BrandColor1: "redBrandColor1",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        // lg: "var(--radius)",
        // md: "calc(var(--radius) - 2px)",
        // sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
