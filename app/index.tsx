import { Gradient } from "@/components/gradient";
import { Modal as CustomModal } from "@/components/modal";
import { Row } from "@/components/row";
import { Pressable } from "@/core/pressable";
import { Container } from "@/design-system/components/container";
import { useLinksStore } from "@/store/links";
import { FlashList } from "@shopify/flash-list";
import { AddCircle } from "iconsax-react-native";
import { useState } from "react";
import {
	KeyboardAvoidingView,
	Modal,
	Platform,
	Text,
	View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function App() {
	const insets = useSafeAreaInsets();
	const { links } = useLinksStore();

	const [showModal, setShowModal] = useState(false);
	function handleModalVisibility(visible: boolean) {
		setShowModal(visible);
	}
	const isLinksEmpty = links.length === 0;

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Gradient />
			<Container>
				<View
					className="flex-1 pt-5 pb-12"
					style={{ top: insets.top, minHeight: 200 }}
				>
					<FlashList
						data={links}
						renderItem={({ item }) => (
							<Row
								key={item.id}
								id={item.id}
								title={item.title}
								createdAt={item.createdAt}
								url={item.url}
							/>
						)}
						keyExtractor={(item) => item.id}
						estimatedItemSize={20}
					/>
				</View>
			</Container>
			<View className="absolute bottom-10 right-5 items-center">
				{isLinksEmpty && (
					<>
						<View className="mb-4">
							<Text className="font-body">psssst</Text>
							<Text className="font-body">add links</Text>
							<Text className="font-body">here</Text>
						</View>
						<View>
							<Text className="text-6xl">👇</Text>
						</View>
					</>
				)}
				<Pressable onPress={() => handleModalVisibility(true)}>
					<AddCircle size={65} variant="Bold" color="#FF906D" />
				</Pressable>
			</View>
			<Modal
				animationType="slide"
				transparent
				visible={showModal}
				onRequestClose={() => handleModalVisibility(false)}
			>
				<KeyboardAvoidingView
					className="flex-1 justify-end"
					behavior={Platform.OS === "ios" ? "padding" : "height"}
				>
					<View className="flex-1 justify-end">
						<View className="p-5">
							<CustomModal dismissModal={() => handleModalVisibility(false)} />
						</View>
					</View>
				</KeyboardAvoidingView>
			</Modal>
		</GestureHandlerRootView>
	);
}
