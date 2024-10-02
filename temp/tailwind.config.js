import konstaConfig from 'konsta/config';

export default konstaConfig({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      ios: 'Barlow, -apple-system, SF Pro Text, SF UI Text, system-ui, Helvetica Neue, Helvetica, Arial, sans-serif',
      material: 'Barlow, Roboto, system-ui, Noto, Helvetica, Arial, sans-serif',
    },
  },
  konsta: {
    colors: {
      primary: '#007aff',
      'brand-white': '#ffffff',
      'brand-grey': '#333333',
      'brand-red': '#ff0000',
      'brand-green': '#5cb85c',
    },
  },
});
