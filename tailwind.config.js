/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "components/**/*.{vue,js,ts}",
    "layouts/**/*.vue",
    "pages/**/*.vue",
    "composables/**/*.{js,ts}",
    "plugins/**/*.{js,ts}",
    "App.{js,ts,vue}",
    "app.{js,ts,vue}",
    "Error.{js,ts,vue}",
    "error.{js,ts,vue}",
    "content/**/*.md",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#B76246",
          light: "#D0835F",
          dark: "#A65339",
        },
        secondary: {
          DEFAULT: "#3E5777",
          dark: "#262222",
        },
        neutral: {
          100: "#FFFFFF",
          200: "#F9F5F2",
          300: "#F7EEE6",
          400: "#E6E4DF",
          500: "#D9D9D9",
          600: "#363434",
        },
      },
      fontSize: {
        xxs: "0.75rem", // 12px
        xs: "0.875rem", // 14px
        sm: "0.938rem", // 15px
        base: "1rem", // 16px
        lg: "1.25rem", // 20px
        xl: "1.5rem", // 24px
        "2xl": "2rem", // 32px
        "3xl": "2.5rem", // 40px
        "4xl": "3rem", // 48px
        "5xl": "4rem", // 64px
        "6xl": "6rem", // 96px
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      letterSpacing: {
        tighter: "-0.25rem",
        tight: "-0.03125rem",
        wide: "0.0625rem",
      },
      lineHeight: {
        none: "1",
        tight: "1.1",
        normal: "1.5",
        relaxed: "1.875",
        loose: "2.272727",
      },
    },
  },
  plugins: [],
};
