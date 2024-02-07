import { Gradient } from "@/components/gradient";
import { Pressable } from "@/core/pressable";
import { usePreferencesStore } from "@/store/preferences";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { ArrowLeft } from "iconsax-react-native";
import { Switch, Text, View } from "react-native";
import { openComposer } from "react-native-email-link";

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

			{/* Notifications */}
			{/* <View className="m-5">
				<Text className="font-display pl-3">Notifications</Text>
				<View className="bg-gray-100 rounded-xl p-5 mt-3 flex-row justify-between items-center">
					<Text className="font-body">Enable notifications: </Text>
					<Switch
						value={hapticFeedback}
						onValueChange={() => setHapticFeedback(!hapticFeedback)}
					/>
				</View>
			</View> */}

			{/* Misc */}
			<View className="m-5">
				<Text className="font-display pl-3">Misc</Text>
				<Pressable
					className="bg-gray-100 rounded-xl p-5 mt-3 flex-row justify-between items-center"
					onPress={() => {
						openComposer({
							to: "nialldbarber@gmail.com",
							subject: "Links for later - feedback",
						});
					}}
				>
					<Text className="font-body">Give feedback</Text>
				</Pressable>
				<Pressable
					className="bg-gray-100 rounded-xl p-5 flex-row justify-between items-center border-t-[1px] border-t-slate"
					onPress={() => {
						openComposer({
							to: "nialldbarber@gmail.com",
							subject: "Links for later - report a problem",
						});
					}}
				>
					<Text className="font-body">Report a problem</Text>
				</Pressable>
				{/* <View className="bg-gray-100 rounded-xl p-5 flex-row justify-between items-center border-t-[1px] border-t-slate">
					<Text className="font-body">What's new in this release</Text>
				</View> */}
			</View>

			{/* Misc */}
			<View className="m-5 items-center justify-end">
				<Text className="font-body text-sm">Built with ❤️ by Niall Barber</Text>
				<Text className="font-body text-sm">Links For Later 1.0.3 (0)</Text>
			</View>
		</View>
	);
}
