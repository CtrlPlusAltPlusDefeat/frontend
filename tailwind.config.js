/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontSize: {
			sm: '0.7rem',
			base: '1rem',
			xl: '1.25rem',
			'2xl': '1.563rem',
			'3xl': '1.953rem',
			'4xl': '2.441rem',
			'5xl': '3.052rem'
		},
		extend: {
			colors: {
				primaryRed: 'rgb(var(--accent-red))',
				primaryBlue: 'rgb(var(--accent-blue))',
				primaryWhite: 'rgb(var(--primary-white))',
				primaryGrey: 'rgb(var(--primary-grey))'
			}
		}
	},
	plugins: []
};
