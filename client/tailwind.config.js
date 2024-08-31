/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },

      colors: {
        'primary-green': '#00712D',
        'secondary-green': '#D5ED9F',
        'primary-orange': '#FF9100',
        neutral: '#FFFBE6',
      },

      animation: {
        loading: 'loading .5s ease-in-out forwards',
        scaling: 'scaling 3s ease-in-out infinite',
        animateBtn: 'animateBtn 3s ease-in-out infinite',
        bounce: 'bounce 0.5s linear',
      },
      keyframes: {
        loading: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },

        scaling: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        animateBtn: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scaleX(1.05)' },
        },
        bounce: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(0, 0) scale(0.5)' },
          '70%': { transform: 'translate(0, 0) scale(0.85)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
