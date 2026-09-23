/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          deep: '#07090E',
          DEFAULT: '#0B0F19',
          card: '#101726',
          hover: '#162035',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-subtle': 'rgba(255, 255, 255, 0.04)',
        },
        brand: {
          gold: '#C88A32',
          'gold-light': '#E5B158',
          'gold-glow': 'rgba(200, 138, 50, 0.18)',
          copper: '#B87333',
          navy: '#0D1527',
          graphite: '#1B2438',
          solar: '#F59E0B',
        },
        custom: {
          primary: 'var(--color-primary, #C88A32)',
          'primary-hover': 'var(--color-primary-hover, #B37625)',
          'primary-light': 'var(--color-primary-light, rgba(200, 138, 50, 0.12))',
          secondary: 'var(--color-secondary, #B87333)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.35)',
        'premium': '0 8px 30px rgba(0, 0, 0, 0.45)',
        'glow': '0 0 20px var(--color-primary-light, rgba(200, 138, 50, 0.2))',
      }
    },
  },
  plugins: [],
}
