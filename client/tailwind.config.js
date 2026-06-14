/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        surface: '#0D0D0D',
        mist: 'rgba(255,255,255,0.65)',
        hairline: 'rgba(255,255,255,0.08)'
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'Geist', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        editorial: '0.18em',
        wide: '0.12em'
      },
      boxShadow: {
        luxury: '0 30px 120px rgba(0,0,0,0.55)'
      }
    }
  },
  plugins: []
};
