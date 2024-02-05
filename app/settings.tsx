import { Gradient } from "@/components/gradient";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { ArrowLeft } from "iconsax-react-native";
import { Switch, Text, View } from "react-native";
import { usePreferencesStore } from "./store/preferences";

export default function Settings() {
	const { hapticFeedback, setHapticFeedback } = usePreferencesStore();

	return (
		<View>
			<Gradient />
			<View className="mb-6">
				<View className="pt-10 self-center">
					<Text className="text-4xl font-display">Settings</Text>
				</View>
				<View className="absolute left-5 top-10">
					<Link
						href="/"
						onPress={() => hapticFeedback && Haptics.impactAsync()}
					>
						<ArrowLeft size={35} variant="Bold" color="#FF906D" />
					</Link>
				</View>
			</View>

			{/* Haptics */}
			<View className="m-5">
				<Text className="font-display pl-3">Haptics</Text>
				<View className="bg-gray-100 rounded-xl p-5 mt-3 flex-row justify-between items-center">
					<Text className="font-body">Enable haptics: </Text>
					<Switch
						value={hapticFeedback}
						onValueChange={() => setHapticFeedback(!hapticFeedback)}
					/>
				</View>
			</View>
		</View>
	);
}
