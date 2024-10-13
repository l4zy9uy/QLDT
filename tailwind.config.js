// tailwind.config.js
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
              white: {
                  DEFAULT: '#FFFFFF',
              },
              'red-lip': {
                  DEFAULT: '#BE1625',
              }
            },
            fontFamily: {
                arialBlack: ["ArialBlack", "sans-serif"],
                arialLight: ["ArialLight", "sans-serif"],
                arialMedium: ["ArialMedium", "sans-serif"],
                arialBold: ["ArialBold", "sans-serif"],
                arialItalic: ["ArialItalic", "sans-serif"],
            },
        },
    },
    plugins: [],
}