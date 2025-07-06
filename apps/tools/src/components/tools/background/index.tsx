"use client";

import { useState } from "react";

import { ScrollArea } from "@dalim/core/ui/scroll-area"; 
import { useMediaQuery } from "@/src/hooks/use-media-query";
import { useGradientStops } from "@/src/hooks/use-gradient-stops"; 
import { CodeDisplay } from "./code-output/code-display";
import { getFullCode } from "./code-output/code-generator";
import { ColorPickerPopover } from "./color-pickers/color-picker-popover";
import { GradientControls } from "./gradient-controls/gradient-controls";
import { MaskControls } from "./mask-controls/mask-controls";
import { PatternControls } from "./pattern-controls/pattern-controls";
import { type IPreset } from "./preset/data";
import { PresetGallery } from "./preset/preset-gallery";
import { BackgroundPreview } from "./preview/background-preview";

export default function BackgroundPatternGenerator() {
	const isMobile = useMediaQuery("(max-width:1024px)"); 
	const [patternType, setPatternType] = useState("grid");
	const [bgColor, setBgColor] = useState("#000000");

	const [gridLineColor, setGridLineColor] = useState("#4f4f4f2e");
	const [gridSizeX, setGridSizeX] = useState(14);
	const [gridSizeY, setGridSizeY] = useState(24);

	const [dotColor, setDotColor] = useState("#ffffff33");
	const [dotSize, setDotSize] = useState(20);

	const [lineGridColor, setLineGridColor] = useState("#f0f0f0");
	const [lineGridSizeX, setLineGridSizeX] = useState(6);
	const [lineGridSizeY, setLineGridSizeY] = useState(4);

	const [dotGridColor, setDotGridColor] = useState("#e5e7eb");
	const [dotGridSize, setDotGridSize] = useState(16);

	// Repeating linear gradient settings
	const [repeatingLinearColor, setRepeatingLinearColor] = useState("#0a81fc");
	const [repeatingLinearAngle, setRepeatingLinearAngle] = useState(45);
	const [repeatingLinearSize, setRepeatingLinearSize] = useState(8);

	const [useGradient, setUseGradient] = useState(false);
	const [gradientType, setGradientType] = useState("radial");

	const {
		gradientStops,
		setGradientStops,
		dragIndex,
		setDragIndex,
		gradientBarRef,
		addColorStop,
		removeColorStop,
		updateColorStop,
	} = useGradientStops();

	const [gradientSizeX, setGradientSizeX] = useState(125);
	const [gradientSizeY, setGradientSizeY] = useState(125);
	const [activePresetId, setActivePresetId] = useState<string | undefined>(
		undefined,
	);

	const [gradientPositionX, setGradientPositionX] = useState(30);
	const [gradientPositionY, setGradientPositionY] = useState(10);

	const [linearGradientAngle, setLinearGradientAngle] = useState(90);

	const [useMask, setUseMask] = useState(false);
	const [maskType, setMaskType] = useState("top");
	const [maskOpacity, setMaskOpacity] = useState(70);
	const [maskFade, setMaskFade] = useState(110);
	const [maskWidth, setMaskWidth] = useState(80);
	const [maskHeight, setMaskHeight] = useState(50);
	const [customMaskPosition, setCustomMaskPosition] = useState(false);
	const [maskPositionX, setMaskPositionX] = useState(95);
	const [maskPositionY, setMaskPositionY] = useState(13);

	// Handle preset selection
	const handleSelectPreset = (preset: IPreset) => {
		setActivePresetId(preset.id);
		const config = preset.config;

		setPatternType(config.patternType);
		setBgColor(config.bgColor);

		if (
			config.patternType === "grid" &&
			config.gridLineColor &&
			config.gridSizeX &&
			config.gridSizeY
		) {
			setGridLineColor(config.gridLineColor);
			setGridSizeX(config.gridSizeX);
			setGridSizeY(config.gridSizeY);
		}

		if (config.patternType === "dots" && config.dotColor && config.dotSize) {
			setDotColor(config.dotColor);
			setDotSize(config.dotSize);
		}

		if (
			config.patternType === "lineGrid" &&
			config.lineGridColor &&
			config.lineGridSizeX &&
			config.lineGridSizeY
		) {
			setLineGridColor(config.lineGridColor);
			setLineGridSizeX(config.lineGridSizeX);
			setLineGridSizeY(config.lineGridSizeY);
		}

		if (
			config.patternType === "dotGrid" &&
			config.dotGridColor &&
			config.dotGridSize
		) {
			setDotGridColor(config.dotGridColor);
			setDotGridSize(config.dotGridSize);
		}

		if (
			config.patternType === "repeatingLinear" &&
			config.repeatingLinearColor &&
			config.repeatingLinearAngle !== undefined &&
			config.repeatingLinearSize !== undefined
		) {
			setRepeatingLinearColor(config.repeatingLinearColor);
			setRepeatingLinearAngle(config.repeatingLinearAngle);
			setRepeatingLinearSize(config.repeatingLinearSize);
		}

		// Update gradient settings
		setUseGradient(config.useGradient);
		if (config.useGradient && config.gradientType) {
			setGradientType(config.gradientType);

			if (config.gradientStops) {
				setGradientStops(config.gradientStops);
			}

			if (
				config.gradientType === "radial" &&
				config.gradientSizeX &&
				config.gradientSizeY &&
				config.gradientPositionX !== undefined &&
				config.gradientPositionY !== undefined
			) {
				setGradientSizeX(config.gradientSizeX);
				setGradientSizeY(config.gradientSizeY);
				setGradientPositionX(config.gradientPositionX);
				setGradientPositionY(config.gradientPositionY);
			}

			if (
				config.gradientType === "linear" &&
				config.linearGradientAngle !== undefined
			) {
				setLinearGradientAngle(config.linearGradientAngle);
			}
		}

		// Update mask settings
		setUseMask(config.useMask || false);
		if (config.useMask) {
			if (config.maskType) setMaskType(config.maskType);
			if (config.maskOpacity !== undefined) setMaskOpacity(config.maskOpacity);
			if (config.maskFade !== undefined) setMaskFade(config.maskFade);
			if (config.maskWidth !== undefined) setMaskWidth(config.maskWidth);
			if (config.maskHeight !== undefined) setMaskHeight(config.maskHeight);
			setCustomMaskPosition(config.customMaskPosition || false);
			if (
				config.customMaskPosition &&
				config.maskPositionX !== undefined &&
				config.maskPositionY !== undefined
			) {
				setMaskPositionX(config.maskPositionX);
				setMaskPositionY(config.maskPositionY);
			}
		}
	};

	const generatedCode = getFullCode({
		bgColor,
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
		repeatingLinearColor,
		repeatingLinearAngle,
		repeatingLinearSize,
		useMask,
		customMaskPosition,
		maskType,
		maskPositionX,
		maskPositionY,
		maskWidth,
		maskHeight,
		maskOpacity,
		maskFade,
		useGradient,
		gradientType,
		gradientStops,
		gradientSizeX,
		gradientSizeY,
		gradientPositionX,
		gradientPositionY,
		linearGradientAngle,
	});

	return (
		<> 
			{isMobile && (
				<p className="py-2 text-center text-primary/60">
					Please use a desktop/laptop to view the Editor.
				</p>
			)}
			<div
				className="mt-3 -mx-6 px-3 h-full grid md:flex"
				id="editor"
			> 
				<div className="h-full grid md:flex w-full">
					<div className="w-full md:w-72">
						<PresetGallery
							onSelectPreset={handleSelectPreset}
							activePresetId={activePresetId}
						/>
					</div>
					<div className="w-full relative md:px-3 p-2 md:p-0 h-[85vh]">
						<BackgroundPreview
							bgColor={bgColor}
							patternType={patternType}
							gridLineColor={gridLineColor}
							gridSizeX={gridSizeX}
							gridSizeY={gridSizeY}
							dotColor={dotColor}
							dotSize={dotSize}
							lineGridColor={lineGridColor}
							lineGridSizeX={lineGridSizeX}
							lineGridSizeY={lineGridSizeY}
							dotGridColor={dotGridColor}
							dotGridSize={dotGridSize}
							repeatingLinearColor={repeatingLinearColor}
							repeatingLinearAngle={repeatingLinearAngle}
							repeatingLinearSize={repeatingLinearSize}
							useMask={useMask}
							customMaskPosition={customMaskPosition}
							maskType={maskType}
							maskPositionX={maskPositionX}
							maskPositionY={maskPositionY}
							maskWidth={maskWidth}
							maskHeight={maskHeight}
							maskOpacity={maskOpacity}
							maskFade={maskFade}
							useGradient={useGradient}
							gradientType={gradientType}
							gradientStops={gradientStops}
							gradientSizeX={gradientSizeX}
							gradientSizeY={gradientSizeY}
							gradientPositionX={gradientPositionX}
							gradientPositionY={gradientPositionY}
							linearGradientAngle={linearGradientAngle}
						/>
						<CodeDisplay
							code={generatedCode}
							useGradient={useGradient}
							gradientType={gradientType}
							gradientStops={gradientStops}
							linearGradientAngle={linearGradientAngle}
							gradientSizeX={gradientSizeX}
							gradientSizeY={gradientSizeY}
							gradientPositionX={gradientPositionX}
							gradientPositionY={gradientPositionY}
							bgColor={bgColor}
							patternType={patternType}
							gridLineColor={gridLineColor}
							gridSizeX={gridSizeX}
							gridSizeY={gridSizeY}
							dotColor={dotColor}
							dotSize={dotSize}
							lineGridColor={lineGridColor}
							lineGridSizeX={lineGridSizeX}
							lineGridSizeY={lineGridSizeY}
							dotGridColor={dotGridColor}
							dotGridSize={dotGridSize}
							useMask={useMask}
							customMaskPosition={customMaskPosition}
							maskType={maskType}
							maskPositionX={maskPositionX}
							maskPositionY={maskPositionY}
							maskWidth={maskWidth}
							maskHeight={maskHeight}
							maskOpacity={maskOpacity}
							repeatingLinearAngle={repeatingLinearAngle}
							repeatingLinearColor={repeatingLinearColor}
							repeatingLinearSize={repeatingLinearSize}
							maskFade={maskFade}
						/>
					</div>
				</div>
				 
					<ScrollArea className="w-full md:w-72 pr-2 h-[85vh] mb-6">
						<div className="space-y-3">
							<div className="space-y-2">
								<ColorPickerPopover
									color={bgColor}
									onChange={setBgColor}
									label="Background"
								/>
								<PatternControls
									patternType={patternType}
									setPatternType={setPatternType}
									gridLineColor={gridLineColor}
									setGridLineColor={setGridLineColor}
									gridSizeX={gridSizeX}
									setGridSizeX={setGridSizeX}
									gridSizeY={gridSizeY}
									setGridSizeY={setGridSizeY}
									dotColor={dotColor}
									setDotColor={setDotColor}
									dotSize={dotSize}
									setDotSize={setDotSize}
									lineGridColor={lineGridColor}
									setLineGridColor={setLineGridColor}
									lineGridSizeX={lineGridSizeX}
									setLineGridSizeX={setLineGridSizeX}
									lineGridSizeY={lineGridSizeY}
									setLineGridSizeY={setLineGridSizeY}
									dotGridColor={dotGridColor}
									setDotGridColor={setDotGridColor}
									dotGridSize={dotGridSize}
									setDotGridSize={setDotGridSize}
									repeatingLinearColor={repeatingLinearColor}
									setRepeatingLinearColor={setRepeatingLinearColor}
									repeatingLinearAngle={repeatingLinearAngle}
									setRepeatingLinearAngle={setRepeatingLinearAngle}
									repeatingLinearSize={repeatingLinearSize}
									setRepeatingLinearSize={setRepeatingLinearSize}
									bgColor={bgColor}
								/>
								<MaskControls
									useMask={useMask}
									setUseMask={setUseMask}
									customMaskPosition={customMaskPosition}
									setCustomMaskPosition={setCustomMaskPosition}
									maskType={maskType}
									setMaskType={setMaskType}
									maskPositionX={maskPositionX}
									setMaskPositionX={setMaskPositionX}
									maskPositionY={maskPositionY}
									setMaskPositionY={setMaskPositionY}
									maskWidth={maskWidth}
									setMaskWidth={setMaskWidth}
									maskHeight={maskHeight}
									setMaskHeight={setMaskHeight}
									maskOpacity={maskOpacity}
									setMaskOpacity={setMaskOpacity}
									maskFade={maskFade}
									setMaskFade={setMaskFade}
								/>
							</div>
							<div className="border-t mt-6">
								<GradientControls
									useGradient={useGradient}
									setUseGradient={setUseGradient}
									gradientType={gradientType}
									setGradientType={setGradientType}
									gradientStops={gradientStops}
									updateColorStop={updateColorStop}
									gradientSizeX={gradientSizeX}
									setGradientSizeX={setGradientSizeX}
									gradientSizeY={gradientSizeY}
									setGradientSizeY={setGradientSizeY}
									gradientPositionX={gradientPositionX}
									setGradientPositionX={setGradientPositionX}
									gradientPositionY={gradientPositionY}
									setGradientPositionY={setGradientPositionY}
									linearGradientAngle={linearGradientAngle}
									setLinearGradientAngle={setLinearGradientAngle}
									addColorStop={addColorStop}
									removeColorStop={removeColorStop}
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-expect-error
									gradientBarRef={gradientBarRef}
									setDragIndex={setDragIndex}
									dragIndex={dragIndex}
								/>
							</div>
							 
						</div>
					</ScrollArea>
				 
			</div>
		</>
	);
}
