import {
	type ClipPathShape,
	INITIAL_CLIP_PATHS,
} from "@/components/view/clip-path/data";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Update the store interface to use an array instead of a Record
interface ClipPathStore {
	// Only store edited and custom shapes, not predefined ones
	editedShapes: ClipPathShape[];
	customShapes: ClipPathShape[];
	selectedShapeId: string;
	customPath: string;
	customName: string;
	customClassName: string;

	// Actions
	setSelectedShapeId: (id: string) => void;
	addCustomShape: (path: string, name: string, className?: string) => void;
	addEditedShape: (
		originalId: string,
		newPath: string,
		className?: string,
	) => void;
	deleteShape: (id: string) => void;
	setCustomPath: (path: string) => void;
	setCustomName: (name: string) => void;
	setCustomClassName: (className: string) => void;

	// Helper function to get all shapes (predefined + edited + custom)
	getAllShapes: () => ClipPathShape[];
}

// Create the store with array-based implementation
export const useClipPathStore = create<ClipPathStore>()(
	persist(
		(set, get) => ({
			editedShapes: [],
			customShapes: [],
			selectedShapeId: INITIAL_CLIP_PATHS[0].id,
			customPath: "",
			customName: "Custom Shape",
			customClassName: "",

			// Helper function to get all shapes
			getAllShapes: () => {
				const { editedShapes, customShapes } = get();
				return [...INITIAL_CLIP_PATHS, ...editedShapes, ...customShapes];
			},

			setSelectedShapeId: (id) => set({ selectedShapeId: id }),

			addCustomShape: (path, name, className) => {
				const newId = `custom-${Date.now()}`;
				const newShape: ClipPathShape = {
					id: newId,
					name: name || "Custom Shape",
					path: path,
					isCustom: true,
					className: className || "",
				};

				set((state) => ({
					customShapes: [...state.customShapes, newShape],
					selectedShapeId: newId,
					customPath: "",
					customName: "Custom Shape",
					customClassName: "",
				}));
			},

			addEditedShape: (originalId, newPath, className) => {
				// Find the original shape from all shapes
				const allShapes = get().getAllShapes();
				const originalShape = allShapes.find(
					(shape) => shape.id === originalId,
				);

				if (!originalShape) return;

				// If it's a predefined shape, create an edited version
				if (!originalShape.isEdited && !originalShape.isCustom) {
					const editedId = `edited-${originalId}-${Date.now()}`;
					const editedShape: ClipPathShape = {
						id: editedId,
						name: `${originalShape.name} (Edited)`,
						path: newPath,
						isEdited: true,
						originalShape: originalId,
						className: className || originalShape.className || "",
					};

					set((state) => ({
						editedShapes: [...state.editedShapes, editedShape],
						selectedShapeId: editedId,
					}));
				} else if (originalShape.isEdited) {
					// Update an existing edited shape
					set((state) => ({
						editedShapes: state.editedShapes.map((shape) =>
							shape.id === originalId
								? {
										...shape,
										path: newPath,
										className:
											className !== undefined ? className : shape.className,
									}
								: shape,
						),
					}));
				} else if (originalShape.isCustom) {
					// Update an existing custom shape
					set((state) => ({
						customShapes: state.customShapes.map((shape) =>
							shape.id === originalId
								? {
										...shape,
										path: newPath,
										className:
											className !== undefined ? className : shape.className,
									}
								: shape,
						),
					}));
				}
			},

			deleteShape: (id) => {
				const { editedShapes, customShapes, selectedShapeId } = get();
				const allShapes = get().getAllShapes();

				// Find the shape to delete
				const shapeToDelete = allShapes.find((shape) => shape.id === id);

				// Don't allow deleting predefined shapes
				if (
					!shapeToDelete ||
					(!shapeToDelete.isEdited && !shapeToDelete.isCustom)
				) {
					return;
				}

				// Determine if it's an edited or custom shape and update the appropriate array
				if (shapeToDelete.isEdited) {
					const newEditedShapes = editedShapes.filter(
						(shape) => shape.id !== id,
					);
					set({ editedShapes: newEditedShapes });
				} else if (shapeToDelete.isCustom) {
					const newCustomShapes = customShapes.filter(
						(shape) => shape.id !== id,
					);
					set({ customShapes: newCustomShapes });
				}

				// If the deleted shape was selected, select the first available shape
				if (selectedShapeId === id) {
					const newAllShapes = [
						...INITIAL_CLIP_PATHS,
						...editedShapes.filter((s) => s.id !== id),
						...customShapes.filter((s) => s.id !== id),
					];
					set({ selectedShapeId: newAllShapes[0].id });
				}
			},

			setCustomPath: (path) => set({ customPath: path }),
			setCustomName: (name) => set({ customName: name }),
			setCustomClassName: (className) => set({ customClassName: className }),
		}),
		{
			name: "clip-path-storage",
			partialize: (state) => ({
				// Only persist edited and custom shapes, not predefined ones
				editedShapes: state.editedShapes,
				customShapes: state.customShapes,
				selectedShapeId: state.selectedShapeId,
				customPath: state.customPath,
				customName: state.customName,
				customClassName: state.customClassName,
			}),
		},
	),
);
