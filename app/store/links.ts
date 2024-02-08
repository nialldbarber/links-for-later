import { zustandStorage } from "@/store/middleware";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const FILTER_VALUE_MAP = {
	newest: "Newest",
	oldest: "Oldest",
} as const;

export type Link = {
	id: string;
	title: string;
	url: string;
	createdAt: Date;
};

export type FitlerValue = keyof typeof FILTER_VALUE_MAP;

type LinksState = {
	links: Array<Link>;
	undoLink: [Link] | [];
	filterValue: FitlerValue;
};

type LinksAction = {
	setAddLink: (link: Link) => void;
	setRemoveLink: (id: string) => void;
	setUndoLink: () => void;
	setFilterValue: (filter: FitlerValue) => void;
};

export const useLinksStore = create(
	persist(
		immer<LinksState & LinksAction>((set) => ({
			links: [],
			undoLink: [],
			filterValue: "newest",
			setAddLink: (link: Link) => {
				set((state) => {
					state.links.push(link);
				});
			},
			setRemoveLink: (id: string) => {
				set((state) => {
					// 1. if an item in `undoLinks` exists, remove it
					if (state?.undoLink?.length > 0) {
						state.undoLink = [];
					}
					// 2. add the link to `undoLink` array
					const index = state.links.findIndex((link) => link.id === id);
					const currentLink: Link = state.links[index];
					state.undoLink = [currentLink];
					// 3. remove link from `links` array
					state.links = state.links.filter((link: Link) => link.id !== id);
				});
			},
			setUndoLink: () => {
				// move the item in `undoLinks` to the top of `links`
				set((state) => {
					state.links.unshift(...state.undoLink);
					state.undoLink = [];
				});
			},
			setFilterValue: (filter: FitlerValue) => {
				set((state) => {
					state.filterValue = filter;
				});
			},
		})),
		{
			name: "links_state",
			storage: createJSONStorage(() => zustandStorage),
		},
	),
);
