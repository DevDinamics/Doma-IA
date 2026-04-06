/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'doma-bg': '#0a0a0f',
        'doma-purple': '#a100ff',
        'doma-blue': '#437ceb',
        'doma-violet': '#906ef7',
        'doma-white': '#ffffff',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'gilroy': ['Gilroy', 'sans-serif'],
      }
    },
  },
  plugins: [],
}