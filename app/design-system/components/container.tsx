import { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";

export function Container({ children }: PropsWithChildren) {
	return (
		<View className="flex-1 px-5 pb-3">
			<ScrollView
				contentInsetAdjustmentBehavior="always"
				showsVerticalScrollIndicator={false}
			>
				{children}
			</ScrollView>
		</View>
	);
}
