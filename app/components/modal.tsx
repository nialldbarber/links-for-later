import { getSiteTitle } from "@/lib/scraper";
import { cn } from "@/lib/styles";
import { useLinksStore } from "@/store/links";
import { useEffect, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type Props = {
	dismissModal: () => void;
};

export default function Modal({ dismissModal }: Props) {
	const { setAddLink } = useLinksStore();
	const [title, setTitle] = useState("");
	const [link, setLink] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const ref = useRef<TextInput | null>(null);

	const titleIsFilled = title.length;

	async function invokeFetchLink() {
		if (titleIsFilled) return;
		if (!link) {
			setIsError(true);
		}
		try {
			setIsLoading(true);
			const fetchedTitle = await getSiteTitle(link);
			setTitle(fetchedTitle);
		} catch (error) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}

	function addLinkToList() {
		if (title?.length === 0 || link.length === 0) {
			setIsError(true);
			return;
		}

		if (title?.length > 1 && link.length > 1) {
			const createdAt = new Date();
			setAddLink({
				id: String(Math.random() * 1000),
				title,
				url: link,
				createdAt,
			});
			dismissModal();
		}
	}

	useEffect(() => {
		ref.current?.focus();
	}, []);

	return (
		<View className="z-40 p-5 mt-5">
			<Text>{isError ? "ERROR" : ""}</Text>
			<View className="my-3">
				<TextInput
					ref={ref}
					value={title}
					onChangeText={(text) => setTitle(text)}
					className="bg-white text-lg flex items-center px-5 rounded-xl shadow-sm"
					style={{ width: "100%", height: 50 }}
					placeholder="Add a custom title..."
					multiline={false}
					numberOfLines={1}
				/>
			</View>
			<View className="my-3">
				<TextInput
					value={link}
					onChangeText={(text) => setLink(text)}
					className="flex items-center bg-white text-lg px-5 rounded-xl shadow-sm"
					style={{ width: "100%", height: 50 }}
					placeholder="Link to website..."
					multiline={false}
					numberOfLines={1}
				/>
			</View>
			<View className="flex-row items-center justify-center">
				<Pressable
					className={cn(
						"mt-5 p-5 mr-3 rounded-full shadow-sm",
						titleIsFilled ? "bg-gray-100" : "bg-gray-800",
					)}
					onPress={invokeFetchLink}
				>
					<Text
						className={cn(
							"font-display text-center text-lg",
							titleIsFilled ? "text-gray-400" : "text-white",
						)}
					>
						{isLoading ? "Loading..." : "Generate title"}
					</Text>
				</Pressable>
				<Pressable
					className="mt-5 ml-3 p-5 rounded-full bg-gray-800 shadow-sm"
					onPress={addLinkToList}
				>
					<Text className="font-display text-center text-lg text-white">
						Add Link to list
					</Text>
				</Pressable>
			</View>
		</View>
	);
}
