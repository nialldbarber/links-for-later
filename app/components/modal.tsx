import { iconColor } from "@/constants/colors";
import { Pressable } from "@/core/pressable";
import { getSiteTitle } from "@/lib/scraper";
import { cn } from "@/lib/styles";
import { useLinksStore } from "@/store/links";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlurView } from "expo-blur";
import { CloseCircle } from "iconsax-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { z } from "zod";

type Props = {
	dismissModal: () => void;
};

export const NewLinkSchema = z.object({
	title: z
		.string({ required_error: "Please add a title" })
		.min(2, "Must be at least 2 characters long"),
	link: z
		.string({ required_error: "Please add a link" })
		.min(2, "Link must be valid"),
});
export type NewLink = z.infer<typeof NewLinkSchema>;

export function Modal({ dismissModal }: Props) {
	const {
		control,
		handleSubmit,
		getValues,
		setValue,
		clearErrors,
		formState: { errors },
	} = useForm<NewLink>({
		resolver: zodResolver(NewLinkSchema),
	});
	const { setAddLink } = useLinksStore();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState("");
	const titleIsFilled = getValues("title")?.length;

	async function invokeFetchLink() {
		if (titleIsFilled) return;
		if (!getValues("link")) {
			setIsError("Please provide a link");
		}
		try {
			setIsLoading(true);
			const fetchedTitle = await getSiteTitle(getValues("link"));
			setValue("title", fetchedTitle as string);
			clearErrors("title");
			setIsError("");
		} catch (error) {
			setIsError("Couldn't find a title - enter your own");
		} finally {
			setIsLoading(false);
		}
	}

	function addLinkToList({ title, link }: { title: string; link: string }) {
		if (title?.length === 0 || link.length === 0) {
			setIsError("Please add a link and title");
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
		<>
			<BlurView
				intensity={80}
				className="inset-0 absolute -z-10 top-0 left-0 bottom-0 right-0 bt rounded-tr-[30px] rounded-tl-[30px] overflow-hidden"
			/>
			<Pressable className="absolute top-4 right-4" onPress={dismissModal}>
				<CloseCircle color={iconColor} variant="Bold" size={30} />
			</Pressable>
			<View className="z-40 p-5 mt-5">
				<View className="self-center">
					<Text className="text-danger font-display">
						{isError.length ? isError : ""}
					</Text>
				</View>
				<View className="my-3">
					<Controller
						control={control}
						render={({ field: { onChange, value } }) => (
							<TextInput
								value={value}
								onChangeText={(text) => onChange(text)}
								className="bg-white px-5 rounded-full shadow-sm"
								style={{ width: "100%", height: 50 }}
								placeholder="Add a custom title..."
							/>
						)}
						name="title"
						rules={{ required: true }}
					/>
					{isError === "" && (
						<View>
							{errors.title?.message && (
								<View className="self-center pt-3">
									<Text className="text-danger font-display">
										{errors.title?.message}
									</Text>
								</View>
							)}
						</View>
					)}
				</View>
				<View className="my-3">
					<Controller
						control={control}
						render={({ field: { onChange, value } }) => (
							<TextInput
								value={value}
								onChangeText={(text) => onChange(text)}
								className="bg-white px-5 rounded-full shadow-sm h-16"
								placeholder="Link to website..."
							/>
						)}
						name="link"
					/>
					{errors.link?.message && (
						<View className="self-center pt-3">
							<Text className="text-danger font-display">
								{errors.link?.message}
							</Text>
						</View>
					)}
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
		</>
	);
}
