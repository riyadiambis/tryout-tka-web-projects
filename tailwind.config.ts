import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './public/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FFFDF4',
          soft: '#F6F4EB',
        },
        grid: '#D9E6F2',
        ink: {
          DEFAULT: '#1B3A5C',
          soft: '#5B7793',
        },
        card: '#FFFFFF',
        line: '#C8D8E8',
        stabilo: {
          DEFAULT: '#FFD84D',
          soft: '#FFF6D1',
        },
        correct: {
          DEFAULT: '#1F9254',
          bg: '#E4F6EA',
        },
        wrong: {
          DEFAULT: '#D9482F',
          bg: '#FCEAE6',
        },
        badge: {
          orange: '#E8734A',
          blue: '#4A9BE8',
          purple: '#8B5FBF',
          green: '#2FA88B',
        },
      },
      fontFamily: {
        title: ['"Baloo 2"', 'sans-serif'],
        body: ['"Nunito"', 'sans-serif'],
      },
      boxShadow: {
        'solid-sm': '2px 2px 0px #1B3A5C',
        solid: '4px 4px 0px #1B3A5C',
        'solid-lg': '6px 6px 0px #1B3A5C',
        line: '3px 3px 0px #C8D8E8',
      },
      borderRadius: {
        card: '16px',
        badge: '12px',
        chip: '8px',
      },
      maxWidth: {
        mobile: '460px',
        desktop: '760px',
        beranda: '1200px',
        admin: '1100px',
        cbt: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
