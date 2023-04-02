module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xs':'120px',


      'sm': '640px',
     

      'md': '768px',


      'lg': '1024px',
   

      'xl': '1280px',
   

      '2xl': '1536px',
  
    },
    extend: {
      scale: {
        '175': '1.75',
      }
    },
  },
  variants: {
    extend: {
      position: ['hover', 'focus'],

    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
