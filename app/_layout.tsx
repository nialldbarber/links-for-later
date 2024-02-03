import { StackNavigator } from "@/components/stack";
import {
	PlusJakartaSans_400Regular,
	PlusJakartaSans_500Medium,
	PlusJakartaSans_600SemiBold,
	PlusJakartaSans_700Bold,
	PlusJakartaSans_800ExtraBold,
	useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";

import "../global.css";

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		PlusJakartaSans_400Regular,
		PlusJakartaSans_500Medium,
		PlusJakartaSans_600SemiBold,
		PlusJakartaSans_700Bold,
		PlusJakartaSans_800ExtraBold,
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return <StackNavigator />;
}
