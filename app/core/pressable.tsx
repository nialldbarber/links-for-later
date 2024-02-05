import { usePreferencesStore } from "@/store/preferences";
import * as Haptics from "expo-haptics";
import type {
	GestureResponderEvent,
	PressableProps as NativePressableProps,
} from "react-native";
import { Pressable as NativePressable } from "react-native";

export interface PressableProps extends NativePressableProps {
	/**
	 * Function to be called when the Pressable
	 * is pressed added optionally here from
	 * `PressableProps`, to make the parameters
	 * optional if we want to just trigger
	 * a haptic and no onPress event
	 */
	onPress?: null | ((event?: GestureResponderEvent) => void) | undefined;
	/**
	 * Use this when the Pressable doesn't
	 * fire a function, but still requires
	 * feedback
	 */
	forceHaptic?: boolean;
}

export function Pressable({
	onPress,
	forceHaptic = false,
	children,
	...rest
}: PressableProps) {
	const { hapticFeedback } = usePreferencesStore();

	function handleOnPress() {
		// are haptics disabled globally?
		if (hapticFeedback === false) {
			if (onPress === null || onPress === undefined) {
				return;
			}
			onPress();
			return;
		}
		// is the element button-like w/o an event?
		if (forceHaptic) {
			Haptics.impactAsync();
			return;
		}

		// standard button with an event
		if (onPress === null || onPress === undefined) return;
		Haptics.impactAsync();
		onPress();
	}

	return (
		<NativePressable onPress={handleOnPress} {...rest} accessible>
			{children}
		</NativePressable>
	);
}
