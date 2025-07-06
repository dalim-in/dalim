// Define the preset type
export interface IPreset {
	id: string;
	name: string;
	category: "pattern" | "gradient" | "combination";
	thumbnail: string;
	config: {
		patternType: string;
		bgColor: string;
		gridLineColor?: string;
		gridSizeX?: number;
		gridSizeY?: number;
		dotColor?: string;
		dotSize?: number;
		lineGridColor?: string;
		lineGridSizeX?: number;
		lineGridSizeY?: number;
		dotGridColor?: string;
		dotGridSize?: number;
		useGradient: boolean;
		gradientType?: string;
		gradientStops?: Array<{ color: string; alpha: number; position: number }>;
		gradientSizeX?: number;
		gradientSizeY?: number;
		gradientPositionX?: number;
		gradientPositionY?: number;
		linearGradientAngle?: number;
		useMask?: boolean;
		maskType?: string;
		maskOpacity?: number;
		maskFade?: number;
		maskWidth?: number;
		maskHeight?: number;
		customMaskPosition?: boolean;
		maskPositionX?: number;
		maskPositionY?: number;
		repeatingLinearColor?: string;
		repeatingLinearAngle?: number;
		repeatingLinearSize?: number;
	};
}

// Create preset examples
export const presets: IPreset[] = [
	// Pattern presets
	{
		id: "grid-dark",
		name: "Dark Grid",
		category: "pattern",
		thumbnail: "grid-dark",
		config: {
			patternType: "grid",
			bgColor: "#0f172a",
			gridLineColor: "#4f4f4f2e",
			gridSizeX: 14,
			gridSizeY: 24,
			useGradient: false,
		},
	},
	{
		id: "grid-light",
		name: "Light Grid",
		category: "pattern",
		thumbnail: "grid-light",
		config: {
			patternType: "grid",
			bgColor: "#f8fafc",
			gridLineColor: "#0000001a",
			gridSizeX: 20,
			gridSizeY: 20,
			useGradient: false,
		},
	},
	{
		id: "dots-dark",
		name: "Dark Dots",
		category: "pattern",
		thumbnail: "dots-dark",
		config: {
			patternType: "dots",
			bgColor: "#0f172a",
			dotColor: "#ffffff33",
			dotSize: 20,
			useGradient: false,
		},
	},
	{
		id: "dots-light",
		name: "Light Dots",
		category: "pattern",
		thumbnail: "dots-light",
		config: {
			patternType: "dots",
			bgColor: "#f8fafc",
			dotColor: "#0000001a",
			dotSize: 16,
			useGradient: false,
		},
	},
	{
		id: "line-grid-dark",
		name: "Dark Line Grid",
		category: "pattern",
		thumbnail: "line-grid-dark",
		config: {
			patternType: "lineGrid",
			bgColor: "#0f172a",
			lineGridColor: "#ffffff33",
			lineGridSizeX: 6,
			lineGridSizeY: 4,
			useGradient: false,
		},
	},
	{
		id: "dot-grid-light",
		name: "Light Dot Grid",
		category: "pattern",
		thumbnail: "dot-grid-light",
		config: {
			patternType: "dotGrid",
			bgColor: "#f8fafc",
			dotGridColor: "#0000001a",
			dotGridSize: 16,
			useGradient: false,
		},
	},
	{
		id: "diagonal-stripes",
		name: "Diagonal Stripes",
		category: "pattern",
		thumbnail: "diagonal-stripes",
		config: {
			patternType: "repeatingLinear",
			bgColor: "#0f172a",
			repeatingLinearColor: "#ffffff33",
			repeatingLinearAngle: 45,
			repeatingLinearSize: 8,
			useGradient: false,
		},
	},
	// Gradient presets
	{
		id: "purple-radial",
		name: "Purple Radial",
		category: "gradient",
		thumbnail: "purple-radial",
		config: {
			patternType: "none",
			bgColor: "#0f172a",
			useGradient: true,
			gradientType: "radial",
			gradientStops: [
				{ color: "#ffffff", alpha: 0, position: 40 },
				{ color: "#6633ee", alpha: 1, position: 100 },
			],
			gradientSizeX: 125,
			gradientSizeY: 125,
			gradientPositionX: 50,
			gradientPositionY: 10,
		},
	},
	{
		id: "blue-linear",
		name: "Blue Linear",
		category: "gradient",
		thumbnail: "blue-linear",
		config: {
			patternType: "none",
			bgColor: "#0f172a",
			useGradient: true,
			gradientType: "linear",
			gradientStops: [
				{ color: "#3b82f6", alpha: 1, position: 0 },
				{ color: "#1e3a8a", alpha: 1, position: 100 },
			],
			linearGradientAngle: 135,
		},
	},
	{
		id: "sunset-linear",
		name: "Sunset",
		category: "gradient",
		thumbnail: "sunset-linear",
		config: {
			patternType: "none",
			bgColor: "#0f172a",
			useGradient: true,
			gradientType: "linear",
			gradientStops: [
				{ color: "#f97316", alpha: 1, position: 0 },
				{ color: "#db2777", alpha: 1, position: 50 },
				{ color: "#6366f1", alpha: 1, position: 100 },
			],
			linearGradientAngle: 45,
		},
	},
	{
		id: "elliptical-green",
		name: "Elliptical Green",
		category: "gradient",
		thumbnail: "elliptical-green",
		config: {
			patternType: "none",
			bgColor: "#0f172a",
			useGradient: true,
			gradientType: "radial",
			gradientStops: [
				{ color: "#22c55e", alpha: 0.8, position: 40 },
				{ color: "#064e3b", alpha: 1, position: 100 },
			],
			gradientSizeX: 150,
			gradientSizeY: 80,
			gradientPositionX: 50,
			gradientPositionY: 50,
		},
	},

	// Combination presets
	{
		id: "grid-with-gradient",
		name: "Grid + Gradient",
		category: "combination",
		thumbnail: "grid-with-gradient",
		config: {
			patternType: "grid",
			bgColor: "#0f172a",
			gridLineColor: "#ffffff1a",
			gridSizeX: 20,
			gridSizeY: 20,
			useGradient: true,
			gradientType: "radial",
			gradientStops: [
				{ color: "#6366f1", alpha: 0.3, position: 40 },
				{ color: "#0f172a", alpha: 1, position: 100 },
			],
			gradientSizeX: 125,
			gradientSizeY: 125,
			gradientPositionX: 50,
			gradientPositionY: 10,
		},
	},
	{
		id: "dots-with-mask",
		name: "Dots + Mask",
		category: "combination",
		thumbnail: "dots-with-mask",
		config: {
			patternType: "dots",
			bgColor: "#0f172a",
			dotColor: "#ffffff33",
			dotSize: 20,
			useGradient: false,
			useMask: true,
			maskType: "circle",
			maskOpacity: 70,
			maskFade: 110,
			maskWidth: 80,
			maskHeight: 50,
		},
	},
	{
		id: "grid-gradient-mask",
		name: "Grid + Gradient + Mask",
		category: "combination",
		thumbnail: "grid-gradient-mask",
		config: {
			patternType: "grid",
			bgColor: "#0f172a",
			gridLineColor: "#ffffff1a",
			gridSizeX: 20,
			gridSizeY: 20,
			useGradient: true,
			gradientType: "radial",
			gradientStops: [
				{ color: "#6366f1", alpha: 0.3, position: 40 },
				{ color: "#0f172a", alpha: 1, position: 100 },
			],
			gradientSizeX: 125,
			gradientSizeY: 125,
			gradientPositionX: 50,
			gradientPositionY: 10,
			useMask: true,
			maskType: "top",
			maskOpacity: 70,
			maskFade: 110,
			maskWidth: 80,
			maskHeight: 50,
		},
	},
	// Additional combination presets
	{
		id: "dots-with-linear-gradient",
		name: "Dots + Linear Gradient",
		category: "combination",
		thumbnail: "dots-with-linear-gradient",
		config: {
			patternType: "dots",
			bgColor: "#0f172a",
			dotColor: "#ffffff33",
			dotSize: 16,
			useGradient: true,
			gradientType: "linear",
			gradientStops: [
				{ color: "#3b82f6", alpha: 0.7, position: 0 },
				{ color: "#8b5cf6", alpha: 0.7, position: 100 },
			],
			linearGradientAngle: 135,
		},
	},
	{
		id: "line-grid-with-mask",
		name: "Line Grid + Mask",
		category: "combination",
		thumbnail: "line-grid-with-mask",
		config: {
			patternType: "lineGrid",
			bgColor: "#0f172a",
			lineGridColor: "#ffffff33",
			lineGridSizeX: 6,
			lineGridSizeY: 4,
			useGradient: false,
			useMask: true,
			maskType: "bottomRight",
			maskOpacity: 70,
			maskFade: 110,
			maskWidth: 80,
			maskHeight: 50,
		},
	},
	{
		id: "dot-grid-with-gradient",
		name: "Dot Grid + Gradient",
		category: "combination",
		thumbnail: "dot-grid-with-gradient",
		config: {
			patternType: "dotGrid",
			bgColor: "#0f172a",
			dotGridColor: "#ffffff33",
			dotGridSize: 16,
			useGradient: true,
			gradientType: "radial",
			gradientStops: [
				{ color: "#ec4899", alpha: 0.5, position: 40 },
				{ color: "#0f172a", alpha: 1, position: 100 },
			],
			gradientSizeX: 125,
			gradientSizeY: 125,
			gradientPositionX: 50,
			gradientPositionY: 50,
		},
	},
	{
		id: "light-grid-with-gradient",
		name: "Light Grid + Gradient",
		category: "combination",
		thumbnail: "light-grid-with-gradient",
		config: {
			patternType: "grid",
			bgColor: "#f8fafc",
			gridLineColor: "#0000001a",
			gridSizeX: 20,
			gridSizeY: 20,
			useGradient: true,
			gradientType: "radial",
			gradientStops: [
				{ color: "#f97316", alpha: 0.3, position: 40 },
				{ color: "#f8fafc", alpha: 1, position: 100 },
			],
			gradientSizeX: 125,
			gradientSizeY: 125,
			gradientPositionX: 50,
			gradientPositionY: 10,
		},
	},
	{
		id: "light-dots-with-mask",
		name: "Light Dots + Mask",
		category: "combination",
		thumbnail: "light-dots-with-mask",
		config: {
			patternType: "dots",
			bgColor: "#f8fafc",
			dotColor: "#0000001a",
			dotSize: 16,
			useGradient: false,
			useMask: true,
			maskType: "circle",
			maskOpacity: 70,
			maskFade: 110,
			maskWidth: 80,
			maskHeight: 50,
		},
	},
	{
		id: "sunset-grid-mask",
		name: "Sunset Grid + Mask",
		category: "combination",
		thumbnail: "sunset-grid-mask",
		config: {
			patternType: "grid",
			bgColor: "#0f172a",
			gridLineColor: "#ffffff1a",
			gridSizeX: 20,
			gridSizeY: 20,
			useGradient: true,
			gradientType: "linear",
			gradientStops: [
				{ color: "#f97316", alpha: 0.7, position: 0 },
				{ color: "#db2777", alpha: 0.7, position: 50 },
				{ color: "#6366f1", alpha: 0.7, position: 100 },
			],
			linearGradientAngle: 45,
			useMask: true,
			maskType: "bottom",
			maskOpacity: 70,
			maskFade: 110,
			maskWidth: 100,
			maskHeight: 50,
		},
	},
	{
		id: "triple-dots-gradient-mask",
		name: "Dots + Gradient + Mask",
		category: "combination",
		thumbnail: "triple-dots-gradient-mask",
		config: {
			patternType: "dots",
			bgColor: "#0f172a",
			dotColor: "#ffffff33",
			dotSize: 20,
			useGradient: true,
			gradientType: "radial",
			gradientStops: [
				{ color: "#22c55e", alpha: 0.5, position: 40 },
				{ color: "#0f172a", alpha: 1, position: 100 },
			],
			gradientSizeX: 125,
			gradientSizeY: 125,
			gradientPositionX: 50,
			gradientPositionY: 50,
			useMask: true,
			maskType: "topLeft",
			maskOpacity: 70,
			maskFade: 110,
			maskWidth: 80,
			maskHeight: 50,
		},
	},
	{
		id: "custom-position-mask",
		name: "Custom Position Mask",
		category: "combination",
		thumbnail: "custom-position-mask",
		config: {
			patternType: "grid",
			bgColor: "#0f172a",
			gridLineColor: "#ffffff1a",
			gridSizeX: 20,
			gridSizeY: 20,
			useGradient: true,
			gradientType: "radial",
			gradientStops: [
				{ color: "#6366f1", alpha: 0.3, position: 40 },
				{ color: "#0f172a", alpha: 1, position: 100 },
			],
			gradientSizeX: 125,
			gradientSizeY: 125,
			gradientPositionX: 50,
			gradientPositionY: 10,
			useMask: true,
			customMaskPosition: true,
			maskPositionX: 75,
			maskPositionY: 25,
			maskOpacity: 70,
			maskFade: 110,
			maskWidth: 80,
			maskHeight: 50,
		},
	},
	{
		id: "asymmetric-gradient",
		name: "Asymmetric Gradient",
		category: "combination",
		thumbnail: "asymmetric-gradient",
		config: {
			patternType: "dotGrid",
			bgColor: "#0f172a",
			dotGridColor: "#ffffff33",
			dotGridSize: 16,
			useGradient: true,
			gradientType: "radial",
			gradientStops: [
				{ color: "#f43f5e", alpha: 0.5, position: 40 },
				{ color: "#0f172a", alpha: 1, position: 100 },
			],
			gradientSizeX: 150,
			gradientSizeY: 80,
			gradientPositionX: 25,
			gradientPositionY: 75,
		},
	},
	{
		id: "multi-color-linear",
		name: "Multi-Color Linear",
		category: "combination",
		thumbnail: "multi-color-linear",
		config: {
			patternType: "lineGrid",
			bgColor: "#0f172a",
			lineGridColor: "#ffffff1a",
			lineGridSizeX: 6,
			lineGridSizeY: 4,
			useGradient: true,
			gradientType: "linear",
			gradientStops: [
				{ color: "#06b6d4", alpha: 0.7, position: 0 },
				{ color: "#8b5cf6", alpha: 0.7, position: 50 },
				{ color: "#ec4899", alpha: 0.7, position: 100 },
			],
			linearGradientAngle: 225,
		},
	},
];
