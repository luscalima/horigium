/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        day: "url('../src/assets/img/day.jpg')",
        night: "url('../src/assets/img/night.jpg')",
      },
    },
  },
  plugins: [],
};
