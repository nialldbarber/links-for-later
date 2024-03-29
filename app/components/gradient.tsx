import { LinearGradient } from "expo-linear-gradient";
import { useWindowDimensions } from "react-native";

export function Gradient() {
	const { width, height } = useWindowDimensions();
	return (
		<LinearGradient
			colors={["rgba(173, 216, 230, 0.4)", "rgba(255, 165, 0, 0.3)"]}
			style={{
				flex: 1,
				position: "absolute",
				left: 0,
				right: 0,
				bottom: 0,
				top: 0,
				width,
				height,
			}}
		/>
	);
}
