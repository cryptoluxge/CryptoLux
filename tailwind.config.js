module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        firago: ["FiraGO", "regular"],
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        violet: '#801df0',
        violetDark: '#501296',
      }),
      colors: {
        darkBackground: "#131313",
        darkCard: "#202020",
        darkText: "#A3A3A8",
        darkModal: "#131313",
        lightBackground: "#F8F9FA",
        lightText: "#3A416F",
        lightModal: "#F8F9FA",
        primary: "#761AED",
        dark: "#320073",
        warning: "#EDC31A",
        info: "#1AAAED",
        error: "#ED1A1A"
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      }
    },
  },
  plugins: [],
}