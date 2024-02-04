import { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";

export function Container({ children }: PropsWithChildren) {
	return (
		<View className="flex-1 items-center justify-center bg-white px-3 pb-3">
			<ScrollView
				contentInsetAdjustmentBehavior="always"
				showsVerticalScrollIndicator={false}
			>
				{children}
			</ScrollView>
		</View>
	);
}
