import { Stack } from "expo-router/stack";

export function StackNavigator() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="modal"
				options={{
					headerShown: false,
					presentation: "modal",
				}}
			/>
		</Stack>
	);
}
