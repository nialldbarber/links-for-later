import { Gradient } from "@/components/gradient";
import { Modal as CustomModal } from "@/components/modal";
import { Row } from "@/components/row";
import { iconColor } from "@/constants/colors";
import { hitSlop } from "@/constants/hitSlop";
import { Pressable } from "@/core/pressable";
import { Container } from "@/design-system/components/container";
import type { FitlerValue } from "@/store/links";
import { useLinksStore } from "@/store/links";
import { MenuView } from "@react-native-menu/menu";
import { FlashList } from "@shopify/flash-list";
import { AddCircle, ArrowRotateLeft, Filter } from "iconsax-react-native";
import { useMemo, useState } from "react";
import {
	KeyboardAvoidingView,
	Modal,
	Platform,
	Text,
	View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
	const { links, undoLink, setUndoLink, filterValue, setFilterValue } =
		useLinksStore();

	const [showModal, setShowModal] = useState(false);
	function handleModalVisibility(visible: boolean) {
		setShowModal(visible);
	}
	const isLinksEmpty = links.length === 0;

	const filteredLinks = useMemo(() => {
		return [...links].sort((a, b) => {
			const dateA = new Date(a.createdAt).getTime();
			const dateB = new Date(b.createdAt).getTime();
			return filterValue === "newest" ? dateB - dateA : dateA - dateB;
		});
	}, [links, filterValue]);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Gradient />
			<Container>
				<View className="pt-24 pb-28">
					<View className="flex-row h-13 pb-3 justify-between">
						<View>
							{undoLink.length ? (
								<Pressable onPress={setUndoLink}>
									<ArrowRotateLeft size={30} variant="Bold" color={iconColor} />
								</Pressable>
							) : null}
						</View>

						<View className="flex-row items-center justify-center">
							<MenuView
								style={{ alignSelf: "flex-end" }}
								title="Order by"
								onPressAction={({ nativeEvent }) => {
									setFilterValue(nativeEvent.event as FitlerValue);
								}}
								actions={[
									{ id: "newest", title: "Newest" },
									{ id: "oldest", title: "Oldest" },
								]}
							>
								<Filter size={30} variant="Bold" color={iconColor} />
							</MenuView>
						</View>
					</View>
					<View className="flex-1 min-h-[200px] pt-3">
						<FlashList
							data={filteredLinks}
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
				</View>
			</Container>
			<View className="absolute bottom-8 right-0 items-center">
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
				<Pressable
					onPress={() => handleModalVisibility(true)}
					className="p-5"
					hitSlop={hitSlop}
				>
					<AddCircle size={65} variant="Bold" color={iconColor} />
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
