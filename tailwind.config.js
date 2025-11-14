/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slow-float': {
          '0%, 100%': { transform: 'translateY(15px) scale(.5)' },
          '50%': { transform: 'translateY(-10px) scale(1.5)' },
        },
        blob: {
          '0%, 100%': {
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            transform: 'translate(0px, 0px) scale(1)',
          },
          '25%': {
            borderRadius: '50% 60% 70% 40% / 50% 60% 30% 60%',
            transform: 'translate(10px, -10px) scale(1.05)',
          },
          '50%': {
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            transform: 'translate(-5px, 5px) scale(0.95)',
          },
          '75%': {
            borderRadius: '40% 70% 50% 60% / 40% 50% 60% 70%',
            transform: 'translate(-10px, 10px) scale(1.1)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(20px)' },
          '50%': { transform: 'translateY(-20px)' }, 
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        float: 'float 4.25s ease-in-out infinite',

        'fade-in': 'fade-in 1s ease-out forwards',

        'slow-float': 'slow-float 25s ease-in-out infinite', 

        blob: 'blob 10s ease-in-out infinite alternate',
        'float-blob': 'blob 10s ease-in-out infinite alternate, float 5.25s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}