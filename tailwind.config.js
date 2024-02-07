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
			"gray-100": "rgb(243 244 246)",
			"gray-800": "rgb(31 41 55)",
			"gray-400": "rgb(156 163 175)",
			white: "#fff",
			primary: "#FF906D",
			danger: "#EF4444",
			slate: "gb(148 163 184)",
		},
		extend: {},
	},
	plugins: [],
};
