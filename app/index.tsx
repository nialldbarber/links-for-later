import Modal from "@/components/modal";
import { Row } from "@/components/row";
import { Container } from "@/design-system/components/container";
import { useLinksStore } from "@/store/links";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { AddCircle } from "iconsax-react-native";
import { useCallback, useMemo, useRef } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

const { width, height } = Dimensions.get("screen");

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

	const isLinksEmpty = links.length === 0;

	return (
		<BottomSheetModalProvider>
			<LinearGradient
				colors={["rgba(173, 216, 230, 0.4)", "rgba(255, 165, 0, 0.3)"]}
				style={{
					flex: 1,
					position: "absolute",
					left: 0,
					right: 0,
					bottom: 0,
					top: 0,
					width,
					height,
				}}
			/>
			<Container>
				<View className="pt-5 pb-8 self-center">
					<Text className="text-4xl font-display">Your links</Text>
				</View>
				<View className="flex-1">
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
		</BottomSheetModalProvider>
	);
}
