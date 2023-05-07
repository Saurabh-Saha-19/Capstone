/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        //inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        //greatVibes: ["Great Vibes", "cursive"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // require("tailwind-scrollbar"),
    // require("tailwind-scrollbar-hide"),
  ],
};
