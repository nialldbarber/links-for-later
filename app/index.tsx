import { Gradient } from "@/components/gradient";
import Modal from "@/components/modal";
import { Row } from "@/components/row";
import { Pressable } from "@/core/pressable";
import { Container } from "@/design-system/components/container";
import { useLinksStore } from "@/store/links";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { BlurView } from "expo-blur";
import { AddCircle } from "iconsax-react-native";
import { useCallback, useMemo, useRef } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function App() {
	const insets = useSafeAreaInsets();
	const { links } = useLinksStore();
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => ["38%", "38%"], []);
	const invokePresentModal = useCallback(() => {
		bottomSheetRef.current?.present();
	}, []);
	const invokeDismissModal = useCallback(() => {
		bottomSheetRef.current?.dismiss();
	}, []);

	const isLinksEmpty = links.length === 0;

	return (
		<>
			<Gradient />
			<Container>
				<View className="flex-1 pt-5 pb-12" style={{ top: insets.top }}>
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
				<Pressable onPress={invokePresentModal}>
					<AddCircle size={65} variant="Bold" color="#FF906D" />
				</Pressable>
			</View>
			<BottomSheetModal
				ref={bottomSheetRef}
				index={1}
				snapPoints={snapPoints}
				backgroundStyle={{ backgroundColor: "transparent" }}
				handleHeight={50}
			>
				<BlurView intensity={85} className="flex-1 z-30">
					<Modal dismissModal={invokeDismissModal} />
				</BlurView>
			</BottomSheetModal>
		</>
	);
}
