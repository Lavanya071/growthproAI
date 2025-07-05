require('dotenv').config();

console.log('Tailwind PORT:', process.env.PORT);  // just to verify

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
