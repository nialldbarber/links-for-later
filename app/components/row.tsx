import { Pressable } from "@/core/pressable";
import { calculateTimeSinceAdded } from "@/lib/dates";
import { useLinksStore, type Link } from "@/store/links";
import * as Linking from "expo-linking";
import { Trash } from "iconsax-react-native";
import { useMemo } from "react";
import { Dimensions, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");
const X_THRESHOLD = -width * 0.3;

export function Row({ id, title, url, createdAt }: Link) {
	const translateX = useSharedValue(0);
	const contextX = useSharedValue(0);
	const rowItem = useSharedValue(90);
	const marginBottom = useSharedValue(40);
	const trashOpacity = useSharedValue(1);
	const isSwiping = useSharedValue(false);

	const { setRemoveLink } = useLinksStore();

	const timeSinceLinkAdded = useMemo(() => {
		const dateObject = new Date(createdAt);
		const timeSince = calculateTimeSinceAdded(dateObject);
		return timeSince;
	}, [createdAt]);

	const onDragToDelete = Gesture.Pan()
		.maxPointers(1)
		.failOffsetY([-10, 10])
		.activeOffsetX([-10, 10])
		.onStart((event) => {
			contextX.value = translateX.value;
			isSwiping.value = false;
		})
		.onChange((event) => {
			translateX.value = event.translationX + contextX.value;
			if (Math.abs(event.translationX) > 10) {
				isSwiping.value = true;
			}
		})
		.onEnd((event) => {
			const isRowDismissed = translateX.value < X_THRESHOLD;
			if (isRowDismissed) {
				translateX.value = withTiming(-width, undefined, (isFinished) => {
					if (isFinished) {
						runOnJS(setRemoveLink)(id);
					}
				});
				rowItem.value = withTiming(0);
				marginBottom.value = withTiming(0);
				trashOpacity.value = withTiming(0);
			} else {
				translateX.value = withSpring(0, { damping: 15, stiffness: 100 });
				contextX.value = 0;
			}
			isSwiping.value = false;
		});

	const nativeGesture = Gesture.Native();
	const composeGestures = Gesture.Simultaneous(onDragToDelete, nativeGesture);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: translateX.value,
			},
		],
	}));

	const iconAnimatedStyle = useAnimatedStyle(() => {
		const opacity = withTiming(translateX.value < X_THRESHOLD ? 1 : 0);
		return { opacity };
	});

	const containerAnimatedStyle = useAnimatedStyle(() => ({
		height: rowItem.value,
		marginBottom: marginBottom.value,
		opacity: trashOpacity.value,
	}));

	return (
		<Animated.View
			className="relative w-full mt-5"
			style={containerAnimatedStyle}
		>
			<GestureDetector gesture={composeGestures}>
				<Animated.View style={animatedStyle}>
					<View className="bg-gray-800 p-2 rounded-full absolute -top-5 right-4 z-20">
						<Text className="font-display text-white text-sm">
							{timeSinceLinkAdded} ago
						</Text>
					</View>
					<Pressable
						onPress={() => {
							if (!isSwiping.value) {
								Linking.openURL(url);
							} else {
								isSwiping.value = false;
							}
						}}
					>
						<View className="bg-gray-100 min-h-[90px] rounded-lg p-5 flex-row">
							<Text
								className="font-body text-lg"
								numberOfLines={2}
								ellipsizeMode="tail"
							>
								{title}
							</Text>
						</View>
					</Pressable>
				</Animated.View>
			</GestureDetector>
			<Animated.View
				style={iconAnimatedStyle}
				className="absolute top-7 right-5 flex items-center justify-center -z-10"
			>
				<Trash variant="Bold" color="#FE6D6C" size={30} />
			</Animated.View>
		</Animated.View>
	);
}
