module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}' // Ensure this matches your project structure
  ],
  theme: {
    extend: {
      customBlue: '#1e3a8a',
      customYellow: '#fbbf24',
      boxShadow: {
        'custom-gray': '2px 2px 4px -1px rgba(64, 64, 64, 0.4)',
      }
    },
  },
  plugins: [],
}

