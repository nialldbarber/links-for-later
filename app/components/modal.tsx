import { Pressable } from "@/core/pressable";
import { getSiteTitle } from "@/lib/scraper";
import { cn } from "@/lib/styles";
import { useLinksStore } from "@/store/links";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { z } from "zod";

type Props = {
	dismissModal: () => void;
};

export const NewLinkSchema = z.object({
	title: z.string(),
	link: z.string().min(1),
});
export type NewLink = z.infer<typeof NewLinkSchema>;

export default function Modal({ dismissModal }: Props) {
	const {
		control,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<NewLink>({
		resolver: zodResolver(NewLinkSchema),
	});

	const { setAddLink } = useLinksStore();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const ref = useRef<TextInput | null>(null);

	const titleIsFilled = getValues("title")?.length;

	async function invokeFetchLink() {
		if (titleIsFilled) return;
		if (!getValues("link")) {
			setIsError(true);
		}
		try {
			setIsLoading(true);
			const fetchedTitle = await getSiteTitle(getValues("link"));
			setValue("title", fetchedTitle as string);
		} catch (error) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	}

	function addLinkToList({ title, link }: { title: string; link: string }) {
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

	return (
		<View className="z-40 p-5 mt-5">
			<View className="self-center">
				<Text className="text-danger font-display">
					{isError ? "Sorry! - try again" : ""}
				</Text>
			</View>
			<View className="my-3">
				<Controller
					control={control}
					render={({ field: { onChange, value } }) => (
						<BottomSheetTextInput
							value={value}
							onChangeText={(text) => onChange(text)}
							className="bg-white px-5 rounded-full shadow-sm"
							style={{ width: "100%", height: 50 }}
							placeholder="Add a custom title..."
						/>
					)}
					name="title"
				/>
			</View>
			<View className="my-3">
				<Controller
					control={control}
					render={({ field: { onChange, value } }) => (
						<BottomSheetTextInput
							value={value}
							onChangeText={(text) => onChange(text)}
							className="bg-white px-5 rounded-full shadow-sm h-16"
							placeholder="Link to website..."
						/>
					)}
					name="link"
				/>
			</View>
			<View className="flex-row items-center justify-center">
				<Pressable
					className={cn(
						"mt-5 p-5 mr-3 rounded-full shadow-sm",
						titleIsFilled ? "bg-gray-100" : "bg-primary",
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
					className="mt-5 ml-3 p-5 rounded-full bg-primary shadow-sm"
					onPress={handleSubmit(addLinkToList)}
				>
					<Text className="font-display text-center text-lg text-white">
						Add Link to list
					</Text>
				</Pressable>
			</View>
		</View>
	);
}
