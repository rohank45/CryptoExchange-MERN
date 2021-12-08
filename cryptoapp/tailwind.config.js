module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        mobile: { min: "100px", max: "500px" },
        tablet: { min: "501px", max: "1000px" },
        laptop: { min: "1001px", max: "1400px " },
        pc: { min: "1401px" },
      },
      fontFamily: {
        nunito: ["nunito", "sans-serif"],
        ubuntu: ["Ubuntu", "sans - serif"],
      },
      spacing: {
        "100": "500px",
        "600": "600px",
      },
      backgroundImage: {
        "taj-mahal": "url('./Images/TajMahal.png')",
      },
      minWidth: {
        "0": "0",
        "1/4": "25%",
        "1/3": "30%",
        "2/5": "40%",
        "1/2": "50%",
        "3/4": "75%",
        "4/5": "80%",
        full: "100%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],

  daisyui: {
    styled: false,
    themes: false,
  },
};
