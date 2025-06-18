// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        
      },
      spacing: {
        '128': '32rem', // Add custom spacing
      }
    },
  },
  plugins: [],
}