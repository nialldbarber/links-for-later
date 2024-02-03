/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		fontFamily: {
			display: ["PlusJakartaSans_800ExtraBold"],
			body: ["PlusJakartaSans_600SemiBold"],
		},
		extend: {},
	},
	plugins: [],
};
