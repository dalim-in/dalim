 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
 //@ts-nocheck
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CustomLine = {
	id: string;
	path: string;
	strokeColor: string;
	strokeWidth: number;
	strokeLinecap: "butt" | "round" | "square";
};

export type ControlPoint = {
	x1: number;
	y1: number;
	x2?: number;
	y2?: number;
};

type Line = {
	id: string;
	points: { x: number; y: number }[];
	controlPoints: { [key: number]: ControlPoint };
	strokeColor: string;
	strokeWidth: number;
	strokeLinecap: "butt" | "round" | "square";
};

type SvgStore = {
	customLines: CustomLine[];
	selectedLineId: string | null;
	addLine: (line: Omit<Line, "id">) => void;
	updateLine: (id: string, line: Partial<Omit<Line, "id">>) => void;
	deleteLine: (id: string) => void;
	selectLine: (id: string) => void;
	addPointToLine: (id: string, point: { x: number; y: number }) => void;
	updatePointInLine: (
		id: string,
		index: number,
		point: { x: number; y: number },
	) => void;
	deletePointFromLine: (id: string, index: number) => void;
	addControlPoint: (
		id: string,
		index: number,
		controlPoint: ControlPoint,
	) => void;
	updateControlPoint: (
		id: string,
		index: number,
		controlPoint: Partial<ControlPoint>,
	) => void;
	deleteControlPoint: (id: string, index: number) => void;
	addCustomLine: (
		path: string,
		strokeColor: string,
		strokeWidth: number,
		strokeLinecap: "butt" | "round" | "square",
	) => void;
	removeCustomLine: (id: string) => void;
	clearCustomLines: () => void;
	generatePathData: (id: string) => string;
};

export const useSvgStore = create<SvgStore>()(
	persist(
		(set, get) => ({
			customLines: [],
			selectedLineId: null,

			addLine: (line) =>
				set((state) => ({
					customLines: [
						...state.customLines,
						{
							id: crypto.randomUUID(),
							points: line.points,
							controlPoints: line.controlPoints,
							strokeColor: line.strokeColor,
							strokeWidth: line.strokeWidth,
							strokeLinecap: line.strokeLinecap,
						},
					],
				})),

			updateLine: (id, line) =>
				set((state) => ({
					customLines: state.customLines.map((l) =>
						l.id === id ? { ...l, ...line } : l,
					),
				})),

			deleteLine: (id) =>
				set((state) => ({
					customLines: state.customLines.filter((line) => line.id !== id),
					selectedLineId:
						state.selectedLineId === id ? null : state.selectedLineId,
				})),

			selectLine: (id) => set({ selectedLineId: id }),

			addPointToLine: (id, point) =>
				set((state) => ({
					customLines: state.customLines.map((line) =>
						line.id === id
							? { ...line, points: [...line.points, point] }
							: line,
					),
				})),

			updatePointInLine: (id, index, point) =>
				set((state) => ({
					customLines: state.customLines.map((line) =>
						line.id === id
							? {
									...line,
									points: line.points.map((p, i) =>
										i === index ? { ...p, ...point } : p,
									),
								}
							: line,
					),
				})),

			deletePointFromLine: (id, index) =>
				set((state) => ({
					customLines: state.customLines.map((line) =>
						line.id === id
							? {
									...line,
									points: line.points.filter((_, i) => i !== index),
								}
							: line,
					),
				})),

			addControlPoint: (id, index, controlPoint) =>
				set((state) => ({
					customLines: state.customLines.map((line) =>
						line.id === id
							? {
									...line,
									controlPoints: {
										...line.controlPoints,
										[index]: controlPoint,
									},
								}
							: line,
					),
				})),

			updateControlPoint: (id, index, controlPoint) =>
				set((state) => ({
					customLines: state.customLines.map((line) =>
						line.id === id
							? {
									...line,
									controlPoints: {
										...line.controlPoints,
										[index]: { ...line.controlPoints[index], ...controlPoint },
									},
								}
							: line,
					),
				})),

			deleteControlPoint: (id, index) =>
				set((state) => ({
					customLines: state.customLines.map((line) =>
						line.id === id
							? {
									...line,
									controlPoints: { ...line.controlPoints, [index]: undefined },
								}
							: line,
					),
				})),

			addCustomLine: (path, strokeColor, strokeWidth, strokeLinecap) =>
				set((state) => ({
					customLines: [
						...state.customLines,
						{
							id: crypto.randomUUID(),
							path,
							strokeColor,
							strokeWidth,
							strokeLinecap,
						},
					],
				})),

			removeCustomLine: (id) =>
				set((state) => ({
					customLines: state.customLines.filter((line) => line.id !== id),
				})),

			clearCustomLines: () => set({ customLines: [] }),

			generatePathData: (id) => {
				const line = get().customLines.find((line) => line.id === id);
				if (!line) return "";

				let pathData = "";
				if (line.points.length === 0) return pathData;

				pathData += `M ${line.points[0].x} ${line.points[0].y}`;

				for (let i = 1; i < line.points.length; i++) {
					const point = line.points[i];
					const controlPoint = line.controlPoints[i - 1];

					if (controlPoint) {
						if (
							controlPoint.x2 !== undefined &&
							controlPoint.y2 !== undefined
						) {
							// Cubic bezier curve
							pathData += ` C ${controlPoint.x1} ${controlPoint.y1}, ${controlPoint.x2} ${controlPoint.y2}, ${point.x} ${point.y}`;
						} else {
							// Quadratic bezier curve
							pathData += ` Q ${controlPoint.x1} ${controlPoint.y1}, ${point.x} ${point.y}`;
						}
					} else {
						// Straight line
						pathData += ` L ${point.x} ${point.y}`;
					}
				}

				return pathData;
			},
		}),
		{
			name: "svg-custom-lines",
		},
	),
);
