import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SavedPath = {
	id: string;
	name: string;
	path: string;
	viewBox: string;
	createdAt: number;
	updatedAt: number;
};

type SavedPathsStore = {
	savedPaths: SavedPath[];
	addPath: (name: string, path: string, viewBox: string) => string;
	updatePath: (
		id: string,
		updates: Partial<Omit<SavedPath, "id" | "createdAt">>,
	) => void;
	deletePath: (id: string) => void;
	clearAllPaths: () => void;
	getPathById: (id: string) => SavedPath | undefined;
};

export const useDrawPathsStore = create<SavedPathsStore>()(
	persist(
		(set, get) => ({
			savedPaths: [],

			addPath: (name, path, viewBox) => {
				const id = `path-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

				set((state) => ({
					savedPaths: [
						...state.savedPaths,
						{
							id,
							name,
							path,
							viewBox,
							createdAt: Date.now(),
							updatedAt: Date.now(),
						},
					],
				}));

				return id;
			},

			updatePath: (id, updates) =>
				set((state) => ({
					savedPaths: state.savedPaths.map((path) =>
						path.id === id
							? {
									...path,
									...updates,
									updatedAt: Date.now(),
								}
							: path,
					),
				})),

			deletePath: (id) =>
				set((state) => ({
					savedPaths: state.savedPaths.filter((path) => path.id !== id),
				})),

			clearAllPaths: () => set({ savedPaths: [] }),

			getPathById: (id) => {
				return get().savedPaths.find((path) => path.id === id);
			},
		}),
		{
			name: "svg-saved-paths",
		},
	),
);
