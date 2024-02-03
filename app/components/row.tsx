import { calculateTimeSinceAdded } from "@/lib/dates";
import type { Link } from "@/store/links";
import * as Linking from "expo-linking";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

type Props = Pick<Link, "title" | "url" | "createdAt">;

export function Row({ title, url, createdAt }: Props) {
	const timeSinceLinkAdded = useMemo(() => {
		const dateObject = new Date(createdAt);
		const timeSince = calculateTimeSinceAdded(dateObject);
		return timeSince;
	}, [createdAt]);

	return (
		<Pressable onPress={() => Linking.openURL(url)}>
			<View className="bg-gray-100 rounded-lg my-2 p-4">
				<Text className="font-body text-lg">{title}</Text>
				<Text className="font-body">age: {timeSinceLinkAdded}</Text>
			</View>
		</Pressable>
	);
}
