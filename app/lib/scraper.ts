import { api } from "@/lib/api";
import { parse } from "node-html-parser";

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
		throw new Error("Failed to fetch website");
	}
}
