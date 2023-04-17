/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primaryRed: 'rgb(var(--accent-red))',
				primaryBlue: 'rgb(var(--accent-blue))',
				primaryWhite: 'rgb(var(--primary-white))',
				primaryGrey: 'rgb(var(--primary-grey))'
			},
		},
	},
	plugins: []
};
