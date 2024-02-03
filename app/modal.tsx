import { getSiteTitle } from "@/lib/scraper";
import { useEffect, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useLinksStore } from "./store/links";

export default function Modal() {
	const [title, setTitle] = useState("");
	const [link, setLink] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const ref = useRef<TextInput | null>(null);
	const { setAddLink } = useLinksStore();

	async function invokeFetchLink() {
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

	useEffect(() => {
		ref.current?.focus();
	}, []);

	useEffect(() => {
		if (title?.length > 1) {
			const createdAt = new Date();
			setAddLink({
				id: String(Math.random() * 1000),
				title,
				url: link,
				createdAt,
			});
		}
	}, [title, link]);

	return (
		<View className="m-5">
			<Text className="font-display text-3xl pl-2 mb-7 mt-3">
				Add a new link
			</Text>
			<View>
				<Text className="font-body pl-2 pb-2">Title:</Text>
				<TextInput
					ref={ref}
					value={title}
					onChangeText={(text) => setTitle(text)}
					className="bg-white p-5 rounded-xl"
				/>
			</View>
			<View>
				<Text className="font-body pl-2 pb-2 mt-7">Link:</Text>
				<TextInput
					value={link}
					onChangeText={(text) => setLink(text)}
					className="bg-white p-5 rounded-xl"
				/>
			</View>
			<Pressable
				className="p-5 rounded-xl bg-slate-300"
				onPress={invokeFetchLink}
			>
				<Text className="font-body">
					{isLoading ? "Loading..." : "Add Link"}
				</Text>
			</Pressable>
			<Text className="font-display">{isLoading ? "Loading..." : title}</Text>
		</View>
	);
}
