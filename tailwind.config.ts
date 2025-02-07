import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background-color': '#08090A',
        'custom-cyan-01': '#CCEEF9',
        'custom-cyan-02': '#00A9E0',
        'custom-cyan-03': '#006089',
        'custom-cyan-04': '#1184E0',
        'custom-yellow-01': '#F6BD11',
        'custom-gray-01': '#28282C',
        'custom-gray-02': '#0C0E0F',
        'custom-gray-03': '#666666',
        'custom-green-01': '#08875D',
      },
      boxShadow: {
        'custom-shadow': '0px -2px 10px 0px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
