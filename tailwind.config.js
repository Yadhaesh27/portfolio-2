/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: { extend: {
    colors: { aurora: { violet: '#9a86ff', blue: '#55b9ff', mint: '#91efe2' } },
    fontFamily: { sans: ['DM Sans', 'sans-serif'], display: ['Space Grotesk', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
    maxWidth: { shell: '1240px' },
  } },
  plugins: [],
};
