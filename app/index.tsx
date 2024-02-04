import Modal from "@/components/modal";
import { Row } from "@/components/row";
import { Container } from "@/design-system/components/container";
import { useLinksStore } from "@/store/links";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { AddCircle } from "iconsax-react-native";
import { useCallback, useMemo, useRef } from "react";
import { Pressable, Text, View } from "react-native";

export default function App() {
	const { links } = useLinksStore();

	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => ["38%", "38%"], []);
	const invokePresentModal = useCallback(() => {
		bottomSheetRef.current?.present();
	}, []);
	const invokeDismissModal = useCallback(() => {
		bottomSheetRef.current?.dismiss();
	}, []);

	return (
		<BottomSheetModalProvider>
			<Container>
				<View className="py-5">
					<Text className="text-4xl font-display">Your links</Text>
				</View>
				{links.map(({ id, title, url, createdAt }) => (
					<Row key={id} title={title} createdAt={createdAt} url={url} />
				))}
			</Container>
			<View className="absolute bottom-10 right-5">
				<Pressable onPress={invokePresentModal}>
					<AddCircle size={65} variant="Bold" />
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
		</BottomSheetModalProvider>
	);
}
