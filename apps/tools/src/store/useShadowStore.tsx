import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ShadowLayer {
	offsetX: number;
	offsetY: number;
	blur: number;
	spread: number;
	color: string;
	opacity: number;
	isInner?: boolean;
	isVisible?: boolean;
}

export interface SavedShadow {
	id: string;
	name: string;
	tailwind: string;
	css: string;
	darkTailwind?: string;
	darkCss?: string;
	layers: ShadowLayer[];
	darkLayers?: ShadowLayer[];
	isCustom: boolean;
	dateCreated: number;
	dateModified: number;
}

interface ShadowState {
	savedShadows: SavedShadow[];
	favorites: string[]; // Array of shadow IDs
	addShadow: (
		shadow: Omit<SavedShadow, "id" | "dateCreated" | "dateModified">,
	) => string;
	updateShadow: (id: string, shadow: Partial<SavedShadow>) => void;
	deleteShadow: (id: string) => void;
	toggleFavorite: (id: string) => void;
	isFavorite: (id: string) => boolean;
}

export const useShadowStore = create<ShadowState>()(
	persist(
		(set, get) => ({
			savedShadows: [],
			favorites: [],

			addShadow: (shadow) => {
				const id = `shadow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
				const now = Date.now();

				const newShadow: SavedShadow = {
					...shadow,
					id,
					dateCreated: now,
					dateModified: now,
				};

				set((state) => ({
					savedShadows: [...state.savedShadows, newShadow],
				}));

				return id;
			},

			updateShadow: (id, shadowUpdates) => {
				set((state) => ({
					savedShadows: state.savedShadows.map((shadow) =>
						shadow.id === id
							? { ...shadow, ...shadowUpdates, dateModified: Date.now() }
							: shadow,
					),
				}));
			},

			deleteShadow: (id) => {
				set((state) => ({
					savedShadows: state.savedShadows.filter((shadow) => shadow.id !== id),
					favorites: state.favorites.filter((favId) => favId !== id),
				}));
			},

			toggleFavorite: (id) => {
				set((state) => {
					const isFavorited = state.favorites.includes(id);
					return {
						favorites: isFavorited
							? state.favorites.filter((favId) => favId !== id)
							: [...state.favorites, id],
					};
				});
			},

			isFavorite: (id) => {
				return get().favorites.includes(id);
			},
		}),
		{
			name: "shadow-storage",
		},
	),
);
