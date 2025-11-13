/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Hydrex.fi color scheme - matching the dark theme
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        background: {
          DEFAULT: '#0A0E27',
          secondary: '#111827',
          tertiary: '#1F2937',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
        border: {
          DEFAULT: '#374151',
          light: '#4B5563',
        },
      },
    },
  },
  plugins: [],
}

