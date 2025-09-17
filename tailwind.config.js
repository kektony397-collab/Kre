
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'slate-950': '#070a11',
        'neon-cyan': '#00ffff',
        'neon-magenta': '#ff00ff',
        'neon-lime': '#39FF14',
      },
      fontFamily: {
        sans: ['"Orbitron"', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.7', boxShadow: '0 0 5px #00ffff, 0 0 10px #00ffff' },
          '50%': { opacity: '1', boxShadow: '0 0 15px #00ffff, 0 0 25px #00ffff' },
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
