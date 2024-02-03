import { Row } from "@/components/row";
import { Container } from "@/design-system/components/container";
import { useLinksStore } from "@/store/links";
import { Link } from "expo-router";
import { AddCircle } from "iconsax-react-native";
import { Text, View } from "react-native";

export default function App() {
	const { links } = useLinksStore();

	console.log("links:", links);

	return (
		<>
			<Container>
				<View className="py-5">
					<Text className="text-4xl font-display">Your links</Text>
				</View>
				{links.map(({ id, title, url, createdAt }) => (
					<Row key={id} title={title} createdAt={createdAt} url={url} />
				))}
			</Container>
			<View className="absolute bottom-10 right-5">
				<Link href="/modal">
					<AddCircle size={65} variant="Bold" />
				</Link>
			</View>
		</>
	);
}
