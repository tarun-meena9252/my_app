/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2872FB",
        actionable: "#FF9C01",
        secondary: {
          DEFAULT: "#FFEC3D",
          100: "#FFEC3D",
          200: "#FFEC3D",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        kbold: ["KantumruyPro-Bold", "sans-serif"],
        kbolditalic: ["KantumruyPro-BoldItalic", "sans-serif"],
        kextralight: ["KantumruyPro-ExtraLight", "sans-serif"],
        kextralightitalic: ["KantumruyPro-ExtraLightItalic", "sans-serif"],
        kitalic: ["KantumruyPro-Italic", "sans-serif"],
        klight: ["KantumruyPro-Light", "sans-serif"],
        klightitalic: ["KantumruyPro-LightItalic", "sans-serif"],
        kmedium: ["KantumruyPro-Medium", "sans-serif"],
        kmediumitalic: ["KantumruyPro-MediumItalic", "sans-serif"],
        kregular: ["KantumruyPro-Regular", "sans-serif"],
        ksemibold: ["KantumruyPro-SemiBold", "sans-serif"],
        ksemibolditalic: ["KantumruyPro-SemiBoldItalic", "sans-serif"],
        kthin: ["KantumruyPro-Thin", "sans-serif"],
        kthinitalic: ["KantumruyPro-ThinItalic", "sans-serif"],
        spacemono: ["SpaceMono-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
}