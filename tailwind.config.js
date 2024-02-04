/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		fontFamily: {
			display: ["PlusJakartaSans_800ExtraBold"],
			body: ["PlusJakartaSans_600SemiBold"],
		},
		colors: {
			primary: "#FF906D",
			danger: "#EF4444",
		},
		extend: {},
	},
	plugins: [],
};
