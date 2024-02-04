import { calculateTimeSinceAdded } from "@/lib/dates";
import type { Link } from "@/store/links";
import * as Linking from "expo-linking";
import { useMemo } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

type Props = Pick<Link, "title" | "url" | "createdAt">;

const { width } = Dimensions.get("screen");

export function Row({ title, url, createdAt }: Props) {
	const timeSinceLinkAdded = useMemo(() => {
		const dateObject = new Date(createdAt);
		const timeSince = calculateTimeSinceAdded(dateObject);
		return timeSince;
	}, [createdAt]);

	return (
		<Pressable onPress={() => Linking.openURL(url)}>
			<View className="bg-gray-800 p-2 rounded-full">
				<Text className="font-display text-white text-sm">
					{timeSinceLinkAdded} ago
				</Text>
			</View>
			<View className="bg-gray-100 rounded-lg mb-2 p-4 flex-row justify-between items-start">
				<View>
					<Text className="font-body text-lg">{title}</Text>
				</View>
			</View>
		</Pressable>
	);
}
