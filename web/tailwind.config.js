import konstaConfig from 'konsta/config';

export default konstaConfig({
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		fontFamily: {
			ios: 'Barlow',
			material: 'Barlow',
		},
	},
	konsta: {
		colors: {
			primary: '#007aff',
			'brand-grey': '#333333',
			'brand-red': '#ff0000',
			'brand-green': '#00ff00',
		},
	},
});
