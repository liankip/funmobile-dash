const path = require('path');
const colors = require('tailwindcss/colors');

module.exports = {
	purge: {
		enabled: true,
		content: [
			'./public/index.html',
			'./dist/index.html',
			'./src/**/*.html',
			'./src/**/*.vue',
			path.resolve(__dirname, './node_modules/litepie-datepicker/**/*.js')
		]
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				'litepie-primary': colors.lightBlue, // color system for light mode
				'litepie-secondary': colors.coolGray // color system for dark mode
			}
		},
	},
	variants: {
		extend: {
			cursor: ['disabled'],
			textOpacity: ['disabled'],
			textColor: ['disabled'],
			opacity: ['active'],
		},
	},
	plugins: [],
}
