/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#fa8200',
          orangeDark: '#f96502',
          blue: '#1b75ff',
          blueHover: '#155bcd',
          dark: '#333333',
          gray: '#f5f5f5',
          light: '#ffffff'
        },
        primary: '#333333',
        secondary: '#fa8200',
        background: '#ffffff',
        surface: '#f5f5f5',
      },
      fontFamily: {
        headline: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        label: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '1rem',
        full: '9999px', // strict pill
      },
      boxShadow: {
        'header': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 10px 30px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(180deg, rgba(251,160,0,1) 0%, rgba(249,99,0,1) 100%)',
        'orange-gradient-hover': 'linear-gradient(180deg, rgba(252,191,0,1) 0%, rgba(248,69,0,1) 100%)',
      }
    },
  },
  plugins: [],
};
