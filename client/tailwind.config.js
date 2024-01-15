/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors:{
        red:'#F5385D'
      }
    },
  },
  plugins: [require("daisyui")],
  prefix:'tw-',
  important:true,
  corePlugins:{
    preflight:false
  },
  daisyui:{
    themes:[
      "corporate"
    ]
  }
}

