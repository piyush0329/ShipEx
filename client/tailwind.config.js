/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors:{
        red:'#F5385D',
        light:'#FDF0D1',
        lightGrey:'#EAEAEA',
        lightpink:'#FFE3E1'
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

