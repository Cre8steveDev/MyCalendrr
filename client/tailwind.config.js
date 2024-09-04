/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      cursor: {
        custom: 'url(/cursor.png), auto',
        secondary: 'url(/cursor-secondary.png), auto',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary-green': '#00712D',
        'secondary-green': '#D5ED9F',
        'primary-orange': '#FF9100',
        neutral: '#FFFBE6',

        // Shadcn Configurations Begins
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },

      // Shadcn Configurations Above ends

      animation: {
        loading: 'loading .5s ease-in-out forwards',
        scaling: 'scaling 3s ease-in-out infinite',
        animateBtn: 'animateBtn 3s ease-in-out infinite',
        bounce: 'bounce 0.5s linear',
      },
      keyframes: {
        loading: {
          '0%': {
            width: '0%',
          },
          '100%': {
            width: '100%',
          },
        },
        scaling: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.2)',
          },
        },
        animateBtn: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scaleX(1.05)',
          },
        },
        bounce: {
          '0%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '50%': {
            transform: 'translate(0, 0) scale(0.5)',
          },
          '70%': {
            transform: 'translate(0, 0) scale(0.85)',
          },
          '100%': {
            transform: 'translate(0, 0) scale(1)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
