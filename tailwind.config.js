/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ffb4aa',
          container: '#e50914',
          fixed: '#ffdad5',
          'fixed-dim': '#ffb4aa',
        },
        surface: {
          DEFAULT: '#131313',
          dim: '#131313',
          bright: '#393939',
          container: '#1f1f1f',
          'container-lowest': '#0e0e0e',
          'container-low': '#1b1b1b',
          'container-high': '#2a2a2a',
          'container-highest': '#353535',
          variant: '#353535',
        },
        outline: {
          DEFAULT: '#af8782',
          variant: '#5e3f3b',
        },
        'netflix-red': '#e50914',
        'netflix-black': '#141414',
        'netflix-dark': '#0f0f0f',
      },
      borderRadius: {
        'netflix': '0.75rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
