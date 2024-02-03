import { parse } from "node-html-parser";
import { api } from "./fetch";

export async function getSiteTitle(url: string) {
	try {
		const data = await api.get(url).text();
		const root = parse(data);
		const title = root.querySelector("title")?.text;
		if (title?.length === 0) {
			throw new Error("Title not found");
		}
		return title;
	} catch (error) {
		console.log(error);
	}
}
