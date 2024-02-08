import { iconColor } from "@/constants/colors";
import { usePreferencesStore } from "@/store/preferences";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { Stack } from "expo-router/stack";
import { Setting2 } from "iconsax-react-native";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function StackNavigator() {
	const insets = useSafeAreaInsets();
	const { hapticFeedback, setHapticFeedback } = usePreferencesStore();

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					header: () => (
						<View style={{ top: insets.top, backgroundColor: "white" }}>
							<View className="pt-5 pb-5 self-center">
								<Text className="text-4xl font-display">Your links</Text>
							</View>
							<View className="absolute right-3 top-3">
								<Link
									href="/settings"
									onPress={() => hapticFeedback && Haptics.impactAsync()}
								>
									<Setting2 size={40} color={iconColor} variant="Bold" />
								</Link>
							</View>
						</View>
					),
				}}
			/>
			<Stack.Screen
				name="settings"
				options={{
					headerShown: false,
					presentation: "modal",
				}}
			/>
		</Stack>
	);
}
