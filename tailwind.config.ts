import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        restaurant: {
          dark: '#1a1410',
          cream: '#f5f1ed',
          gold: '#d4a574',
          accent: '#a0644e',
          brown: '#8b6f47',
          warm: '#6b5344',
          text: '#2c2c2c',
          light: '#fafaf8',
          primary: '#a0644e',
          'primary-dark': '#7d4f38',
          'primary-light': '#d4a082',
          secondary: '#8b6f47',
          'secondary-light': '#b8956a',
        }
      },
      fontFamily: {
        display: ['Amatic SC', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
export default config
