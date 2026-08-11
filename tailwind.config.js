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
        pandur: {
          bg: '#0B0705',           // Deep espresso velvet
          card: '#160F0B',         // Dark chocolate card background
          accent: '#E58A38',       // Warm golden caramel pop
          accentDark: '#C86E20',   // Deep amber
          cream: '#F7F0E6',        // Vanilla cream text/highlights
          creamMuted: '#C2B5A5',   // Subtle secondary text
          border: '#281C15',       // Subdued warm divider
          berry: '#C94E34',        // Rich berry accent
          chocolate: '#1B110B',    // Dark cocoa
        },
      },
      fontFamily: {
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro"',
          '"Pluto Sans"',
          'Outfit',
          'sans-serif',
        ],
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro"',
          '"Pluto Sans"',
          'Poppins',
          'sans-serif',
        ],
      },
      maxWidth: {
        '8xl': '1440px',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
        '106': '1.06',
        '108': '1.08',
        '115': '1.15',
        '125': '1.25',
      },
      blur: {
        '4xl': '80px',
        '5xl': '120px',
        '6xl': '180px',
      },
      animation: {
        'marquee-left': 'marqueeLeft 35s linear infinite',
        'marquee-right': 'marqueeRight 35s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'cookie-spin': 'cookieSpin 20s linear infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        marqueeLeft: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(1.5deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        cookieSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(229, 138, 56, 0.2)' },
          '50%': { boxShadow: '0 0 60px rgba(229, 138, 56, 0.4)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      backgroundImage: {
        'pandur-radial': 'radial-gradient(ellipse at center, #1C0F09 0%, #0B0705 70%)',
        'accent-glow': 'radial-gradient(ellipse at center, rgba(229,138,56,0.2) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
