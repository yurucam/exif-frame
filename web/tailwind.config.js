import konstaConfig from 'konsta/config';

export default konstaConfig({
	content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			ios: 'Roboto',
			material: 'Roboto',
		},
	},
});
