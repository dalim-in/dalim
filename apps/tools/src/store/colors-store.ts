import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ColorState {
	favorites: string[];
	addFavorite: (color: string) => void;
	removeFavorite: (color: string) => void;
	isFavorite: (color: string) => boolean;
}

export const useColorStore = create<ColorState>()(
	persist(
		(set, get) => ({
			favorites: [],
			addFavorite: (color: string) => {
				const { favorites } = get();
				if (!favorites.includes(color)) {
					set({ favorites: [...favorites, color] });
				}
			},
			removeFavorite: (color: string) => {
				const { favorites } = get();
				set({ favorites: favorites.filter((c) => c !== color) });
			},
			isFavorite: (color: string) => {
				return get().favorites.includes(color);
			},
		}),
		{
			name: "color-favorites-storage",
		},
	),
);
