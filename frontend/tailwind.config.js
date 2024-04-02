/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      'cs-white': '#ffffff',
      'cs-primary': '#0A4D7E',
      'cs-secondary': '#1672B6',
      'cs-grey': '#3a3a3a',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

