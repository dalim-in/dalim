import type { GradientStop } from "@/src/hooks/use-gradient-stops";
// @ts-nocheck
import { formatRgbaForTailwind } from "@/src/lib/color";

interface CodeGeneratorProps {
	bgColor: string;
	patternType: string;
	gridLineColor: string;
	gridSizeX: number;
	gridSizeY: number;
	dotColor: string;
	dotSize: number;
	lineGridColor: string;
	lineGridSizeX: number;
	lineGridSizeY: number;
	dotGridColor: string;
	dotGridSize: number;
	useMask: boolean;
	customMaskPosition: boolean;
	maskType: string;
	maskPositionX: number;
	maskPositionY: number;
	maskWidth: number;
	maskHeight: number;
	maskOpacity: number;
	maskFade: number;
	useGradient: boolean;
	gradientType: string;
	gradientStops: GradientStop[];
	gradientSizeX: number;
	gradientSizeY: number;
	gradientPositionX: number;
	gradientPositionY: number;
	linearGradientAngle: number;
	tailwindVersion?: "v3" | "v4";
	repeatingLinearColor?: string;
	repeatingLinearAngle?: number;
	repeatingLinearSize?: number;
}

export function getMaskCode({
	useMask,
	customMaskPosition,
	maskType,
	maskPositionX,
	maskPositionY,

	maskWidth,
	maskHeight,
	maskOpacity,
	maskFade,
	tailwindVersion = "v3",
}: Partial<CodeGeneratorProps>) {
	if (!useMask) return "";

	let maskPosition = "50%_50%";
	let maskShape = "ellipse";
	let maskSize = `${maskWidth}%_${maskHeight}%`;

	if (customMaskPosition) {
		maskPosition = `${maskPositionX}%_${maskPositionY}%`;
	} else {
		switch (maskType) {
			case "top":
				maskPosition = "50%_0%";
				break;
			case "bottom":
				maskPosition = "50%_100%";
				break;
			case "left":
				maskPosition = "0%_50%";
				break;
			case "right":
				maskPosition = "100%_50%";
				break;
			case "topLeft":
				maskPosition = "0%_0%";
				break;
			case "topRight":
				maskPosition = "100%_0%";
				break;
			case "bottomLeft":
				maskPosition = "0%_100%";
				break;
			case "bottomRight":
				maskPosition = "100%_100%";
				break;
			case "center":
				maskPosition = "50%_50%";
				break;
			case "circle":
				maskShape = "circle";
				maskSize = `${maskWidth}%`;
				break;
		}
	}

	if (tailwindVersion === "v3") {
		// V3 format for mask-image
		return `[mask-image:radial-gradient(${maskShape}_${maskSize}_at_${maskPosition},#000_${maskOpacity}%,transparent_${maskFade}%)]`;
	}
	// V4 format for mask-image
	return `mask-radial-[${maskShape}_${maskSize}_at_${maskPosition}] mask-from-black mask-from-${maskOpacity}% mask-to-transparent mask-to-${maskFade}%`;
}

export function getPatternCode({
	patternType,
	gridLineColor,
	gridSizeX,
	gridSizeY,
	dotColor,
	dotSize,
	lineGridColor,
	lineGridSizeX,
	lineGridSizeY,
	dotGridColor,
	dotGridSize,
	bgColor,
	tailwindVersion = "v3",
	repeatingLinearColor,
	repeatingLinearAngle,
	repeatingLinearSize,
}: Partial<CodeGeneratorProps>) {
	let patternCode = "";

	if (tailwindVersion === "v3") {
		// V3 format
		switch (patternType) {
			case "grid":
				patternCode = `bg-[linear-gradient(to_right,${gridLineColor}_1px,transparent_1px),linear-gradient(to_bottom,${gridLineColor}_1px,transparent_1px)] bg-[size:${gridSizeX}px_${gridSizeY}px]`;
				break;
			case "dots":
				patternCode = `bg-[radial-gradient(${dotColor}_1px,${bgColor}_1px)] bg-[size:${dotSize}px_${dotSize}px]`;
				break;
			case "lineGrid":
				patternCode = `bg-[linear-gradient(to_right,${lineGridColor}_1px,transparent_1px),linear-gradient(to_bottom,${lineGridColor}_1px,transparent_1px)] bg-[size:${lineGridSizeX}rem_${lineGridSizeY}rem]`;
				break;
			case "dotGrid":
				patternCode = `bg-[radial-gradient(${dotGridColor}_1px,transparent_1px)] [background-size:${dotGridSize}px_${dotGridSize}px]`;
				break;
			case "repeatingLinear":
				patternCode = `bg-[repeating-linear-gradient(${repeatingLinearAngle}deg,${repeatingLinearColor}_0px_1px,transparent_1px_${repeatingLinearSize}px)]`;
				break;
			case "none":
				patternCode = "";
				break;
		}
	} else {
		// V4 format
		switch (patternType) {
			case "grid":
				patternCode = `bg-grid-[${gridSizeX}px_${gridSizeY}px] grid-line-[${gridLineColor}]`;
				break;
			case "dots":
				patternCode = `bg-dots-[${dotSize}px] dots-[${dotColor}] dots-bg-[${bgColor}]`;
				break;
			case "lineGrid":
				patternCode = `bg-grid-[${lineGridSizeX}rem_${lineGridSizeY}rem] grid-line-[${lineGridColor}]`;
				break;
			case "dotGrid":
				patternCode = `bg-dots-[${dotGridSize}px] dots-[${dotGridColor}]`;
				break;
			case "none":
				patternCode = "";
				break;
		}
	}

	return patternCode;
}

export function getGradientCode({
	useGradient,
	gradientType,
	gradientStops,
	gradientSizeX,
	gradientSizeY,
	gradientPositionX,
	gradientPositionY,
	linearGradientAngle,
	tailwindVersion = "v3",
}: Partial<CodeGeneratorProps>) {
	if (!useGradient) return "";

	if (tailwindVersion === "v3") {
		if (gradientType === "radial") {
			if (!gradientStops || gradientStops.length < 2) {
				return "";
			}
			// For radial gradient with two colors
			const color1 = formatRgbaForTailwind(
				gradientStops[0].color,
				gradientStops[0].alpha,
			);
			const color2 = formatRgbaForTailwind(
				gradientStops[gradientStops.length - 1].color,
				gradientStops[gradientStops.length - 1].alpha,
			);

			return `bg-[radial-gradient(${gradientSizeX}%_${gradientSizeY}%_at_${gradientPositionX}%_${gradientPositionY}%,${color1}_${gradientStops[0].position}%,${color2}_${gradientStops[gradientStops.length - 1].position}%)]`;
		}
		if (!gradientStops || gradientStops.length < 2) {
			return "";
		}
		// For linear gradient with multiple stops
		const colorStops = gradientStops
			.map((stop) => {
				const rgba = formatRgbaForTailwind(stop.color, stop.alpha);
				return `${rgba}${stop.position !== 0 && stop.position !== 100 ? `_${stop.position}%` : ""}`;
			})
			.join(",_");

		return `bg-[linear-gradient(${linearGradientAngle}deg,_${colorStops})]`;
	}
	// V4 format
	if (gradientType === "radial") {
		if (!gradientStops || gradientStops.length < 2) {
			return "";
		}
		const color1 = formatRgbaForTailwind(
			gradientStops[0].color,
			gradientStops[0].alpha,
		);
		const color2 = formatRgbaForTailwind(
			gradientStops[gradientStops.length - 1].color,
			gradientStops[gradientStops.length - 1].alpha,
		);

		return `bg-radial-[at_${gradientPositionX}%_${gradientPositionY}%] from-[${color1}] from-${gradientStops[0].position}% to-[${color2}] to-${gradientStops[gradientStops.length - 1].position}%`;
	}
	if (!gradientStops || gradientStops.length <= 3) {
		const directions = ["from", "via", "to"];
		let result = `bg-linear-${linearGradientAngle} `;

		if (!gradientStops) return "";

		gradientStops.forEach((stop, index) => {
			if (index < 3) {
				const rgba = formatRgbaForTailwind(stop.color, stop.alpha);
				result += `${directions[index]}-[${rgba}]${stop.position !== 0 && stop.position !== 100 ? ` ${directions[index]}-${stop.position}%` : ""} `;
			}
		});
		return result.trim();
	}

	const colorStops = gradientStops
		.map((stop) => {
			const rgba = formatRgbaForTailwind(stop.color, stop.alpha);
			return `${rgba}${stop.position !== 0 && stop.position !== 100 ? `_${stop.position}%` : ""}`;
		})
		.join(",_");

	return `bg-linear-[${linearGradientAngle}deg,_${colorStops}]`;
}

export function getLinearGradientCode({
	gradientStops,
	linearGradientAngle,
}: Pick<CodeGeneratorProps, "gradientStops" | "linearGradientAngle">) {
	const colorStopsV3 = gradientStops
		.map((stop) => {
			const rgba = formatRgbaForTailwind(stop.color, stop.alpha);
			return `${rgba}${stop.position !== 0 && stop.position !== 100 ? `_${stop.position}%` : ""}`;
		})
		.join(",_");

	const v3Format = `bg-[linear-gradient(${linearGradientAngle}deg,_${colorStopsV3})]`;

	let v4Format = "";

	if (gradientStops.length <= 3) {
		const directions = ["from", "via", "to"];
		v4Format = `bg-linear-${linearGradientAngle} `;

		gradientStops.forEach((stop, index) => {
			if (index < 3) {
				const rgba = formatRgbaForTailwind(stop.color, stop.alpha);
				v4Format += `${directions[index]}-[${rgba}]${stop.position !== 0 && stop.position !== 100 ? ` ${directions[index]}-${stop.position}%` : ""} `;
			}
		});
		v4Format = v4Format.trim();
	} else {
		v4Format = `bg-linear-[${linearGradientAngle}deg,_${colorStopsV3}]`;
	}

	return { v3Format, v4Format };
}

export function getRadialGradientCode({
	gradientStops,
	gradientSizeX,
	gradientSizeY,
	gradientPositionX,
	gradientPositionY,
}: Pick<
	CodeGeneratorProps,
	| "gradientStops"
	| "gradientSizeX"
	| "gradientSizeY"
	| "gradientPositionX"
	| "gradientPositionY"
>) {
	const color1 = formatRgbaForTailwind(
		gradientStops[0].color,
		gradientStops[0].alpha,
	);
	const color2 = formatRgbaForTailwind(
		gradientStops[gradientStops.length - 1].color,
		gradientStops[gradientStops.length - 1].alpha,
	);

	// V3 format
	const v3Format = `bg-[radial-gradient(${gradientSizeX}%_${gradientSizeY}%_at_${gradientPositionX}%_${gradientPositionY}%,${color1}_${gradientStops[0].position}%,${color2}_${gradientStops[gradientStops.length - 1].position}%)]`;

	// V4 format
	const v4Format = `bg-radial-[${gradientSizeX}%_${gradientSizeY}%_at_${gradientPositionX}%_${gradientPositionY}%] from-[${color1}] from-${gradientStops[0].position}% to-[${color2}] to-${gradientStops[gradientStops.length - 1].position}%`;

	return { v3Format, v4Format };
}

export function getFullCode(props: CodeGeneratorProps) {
	const patternProps = { ...props, tailwindVersion: "v3" };
	const maskCode = getMaskCode(props);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	const patternCode = getPatternCode(patternProps);
	const gradientCode = getGradientCode(props);

	let result = `<div className="relative h-full w-full bg-[${props.bgColor}]">`;

	if (patternCode) {
		result += `\n  <div className="absolute bottom-0 left-0 right-0 top-0 ${patternCode} ${maskCode}"></div>`;
	}

	if (props.useGradient) {
		result += `\n  <div className="absolute bottom-0 left-0 right-0 top-0 ${gradientCode}"></div>`;
	}

	result += "\n</div>";

	return result;
}
