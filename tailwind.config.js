/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          "brand-navy": "#0E1B36",
          "brand-red": "#EF4438",
          "brand-coral": "#FF6F61",
          "brand-grey": "#F3F4F6",
        },
        fontFamily: {
          sans: ["Inter", "system-ui", "sans-serif"],
          heading: ["Montserrat", "system-ui", "sans-serif"],
        },
        boxShadow: {
          soft: "0 12px 30px rgba(14, 27, 54, 0.10)",
          card: "0 18px 50px rgba(14, 27, 54, 0.14)",
        },
      },
    },
    plugins: [],
  };