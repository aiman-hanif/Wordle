/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Game status colors
        'correct': '#2D9D5C',
        'present': '#FFC600',
        'absent': '#C3BAAA',

        // East Asian theme
        'east-asian-primary': '#e63946',
        'east-asian-secondary': '#f1faee',
        'east-asian-accent': '#a8dadc',
        'east-asian-text': '#1d3557',
        'east-asian-background': '#f8f9fa',

        // South Asian theme
        'south-asian-primary': '#ff9f1c',
        'south-asian-secondary': '#ffbf69',
        'south-asian-accent': '#2ec4b6',
        'south-asian-text': '#293241',
        'south-asian-background': '#fdfffc',

        // Middle Eastern theme
        'middle-eastern-primary': '#4a5759',
        'middle-eastern-secondary': '#b8dbd9',
        'middle-eastern-accent': '#f4b942',
        'middle-eastern-text': '#333333',
        'middle-eastern-background': '#f7f7f2',

        // African theme
        'african-primary': '#bb5a3a',
        'african-secondary': '#e2c044',
        'african-accent': '#0d8b70',
        'african-text': '#222222',
        'african-background': '#f9f3e6',

        // European theme
        'european-primary': '#003d5b',
        'european-secondary': '#4c8577',
        'european-accent': '#d1495b',
        'european-text': '#222222',
        'european-background': '#f8f9fa',

        // Latin American theme
        'latin-american-primary': '#f94144',
        'latin-american-secondary': '#f3722c',
        'latin-american-accent': '#90be6d',
        'latin-american-text': '#212529',
        'latin-american-background': '#f8f8f8',

        // Pacific theme
        'pacific-primary': '#168aad',
        'pacific-secondary': '#52b69a',
        'pacific-accent': '#d9ed92',
        'pacific-text': '#212529',
        'pacific-background': '#f0f7f4',

        // Default theme
        'default-primary': '#457B9D',
        'default-secondary': '#A8DADC',
        'default-accent': '#e97451',
        'default-text': '#1D3557',
        'default-background': '#F1FAEE'
      },
      size: {
        'tile-md': '3rem'
      },
      fontSize: {
        'md': '40px'
      }
    }
  },
  plugins: [],
}