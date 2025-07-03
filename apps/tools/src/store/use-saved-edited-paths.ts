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

type SavedEditedPathsStore = {
	savedEditedPaths: SavedPath[];
	addEditedPath: (name: string, path: string, viewBox: string) => string;
	updateEditedPath: (
		id: string,
		updates: Partial<Omit<SavedPath, "id" | "createdAt">>,
	) => void;
	deleteEditedPath: (id: string) => void;
	clearAllEditedPaths: () => void;
	getEditedPathById: (id: string) => SavedPath | undefined;
};

export const useSavedEditedPathsStore = create<SavedEditedPathsStore>()(
	persist(
		(set, get) => ({
			savedEditedPaths: [],

			addEditedPath: (name, path, viewBox) => {
				const id = `path-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

				set((state) => ({
					savedEditedPaths: [
						...state.savedEditedPaths,
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

			updateEditedPath: (id, updates) =>
				set((state) => ({
					savedEditedPaths: state.savedEditedPaths.map((path) =>
						path.id === id
							? {
									...path,
									...updates,
									updatedAt: Date.now(),
								}
							: path,
					),
				})),

			deleteEditedPath: (id) =>
				set((state) => ({
					savedEditedPaths: state.savedEditedPaths.filter(
						(path) => path.id !== id,
					),
				})),

			clearAllEditedPaths: () => set({ savedEditedPaths: [] }),

			getEditedPathById: (id) => {
				return get().savedEditedPaths.find((path) => path.id === id);
			},
		}),
		{
			name: "svg-saved-edited-paths",
		},
	),
);
