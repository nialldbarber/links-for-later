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
		</Stack>
	);
}
