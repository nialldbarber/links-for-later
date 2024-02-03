import { zustandStorage } from "@/store/middleware";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type Link = {
	id: string;
	title: string;
	url: string;
	createdAt: Date;
};

type LinksState = {
	links: Array<Link>;
};

type LinksAction = {
	setAddLink: (link: Link) => void;
	setRemoveLink: (id: string) => void;
};

export const useLinksStore = create(
	persist(
		immer<LinksState & LinksAction>((set) => ({
			links: [],
			setAddLink: (link: Link) => {
				set((state) => {
					state.links.push(link);
				});
			},
			setRemoveLink: (id: string) => {
				set((state) => {
					state.links = state.links.filter((link: Link) => link.id !== id);
				});
			},
		})),
		{
			name: "links_state",
			storage: createJSONStorage(() => zustandStorage),
		},
	),
);
