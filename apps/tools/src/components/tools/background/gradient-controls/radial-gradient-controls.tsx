"use client";
 
import { Label } from "@dalim/core/ui/label"; 
import { Slider } from "@dalim/core/ui/slider";
import type { GradientStop } from "@/src/hooks/use-gradient-stops"; 
import type { RefObject } from "react";
import { RgbaPickerPopover } from "../color-pickers/rgba-picker-popover";

interface RadialGradientControlsProps {
	gradientStops: GradientStop[];
	updateColorStop: (index: number, updates: Partial<GradientStop>) => void;
	gradientSizeX: number;
	setGradientSizeX: (size: number) => void;
	gradientSizeY: number;
	setGradientSizeY: (size: number) => void;
	gradientPositionX: number;
	setGradientPositionX: (position: number) => void;
	gradientPositionY: number;
	setGradientPositionY: (position: number) => void;
	gradientBarRef: RefObject<HTMLDivElement>;
}

export function RadialGradientControls({
	gradientStops,
	updateColorStop,
	gradientSizeX,
	setGradientSizeX,
	gradientSizeY,
	setGradientSizeY,
	gradientPositionX,
	setGradientPositionX,
	gradientPositionY,
	setGradientPositionY,
}: RadialGradientControlsProps) {
	return (
		<>
			<p className="mb-4 text-muted-foreground text-sm">
				The gradient uses RGBA colors. Set Alpha to 0 for the first color to
				make it transparent.
			</p>

			<div className="mb-6 space-y-4">
				<div className="space-y-2">
					<RgbaPickerPopover
						color={gradientStops[0].color}
						alpha={gradientStops[0].alpha}
						onColorChange={(color) => updateColorStop(0, { color })}
						onAlphaChange={(alpha) => updateColorStop(0, { alpha })}
						label="Inner Color"
					/>

					<div className="space-y-2 ">
						<Label>Position: {gradientStops[0].position}%</Label>
						<Slider
							value={[gradientStops[0].position]}
							min={0}
							max={90}
							step={5}
							onValueChange={(value) =>
								updateColorStop(0, { position: value[0] })
							}
						/>
					</div>
				</div>

				<div className="space-y-2">
					<RgbaPickerPopover
						color={gradientStops[gradientStops.length - 1].color}
						alpha={gradientStops[gradientStops.length - 1].alpha}
						onColorChange={(color) =>
							updateColorStop(gradientStops.length - 1, { color })
						}
						onAlphaChange={(alpha) =>
							updateColorStop(gradientStops.length - 1, { alpha })
						}
						label="Outer Color"
					/>

					<div className="space-y-2 ">
						<Label>
							Position: {gradientStops[gradientStops.length - 1].position}%
						</Label>
						<Slider
							value={[gradientStops[gradientStops.length - 1].position]}
							min={gradientStops[0].position + 10}
							max={100}
							step={5}
							onValueChange={(value) =>
								updateColorStop(gradientStops.length - 1, {
									position: value[0],
								})
							}
						/>
					</div>
				</div>
			</div>

			<div className="space-y-2">
				<Label>Position X: {gradientPositionX}%</Label>
				<Slider
					value={[gradientPositionX]}
					min={0}
					max={100}
					step={5}
					onValueChange={(value) => setGradientPositionX(value[0])}
				/>
			</div>

			<div className="space-y-2">
				<Label>Position Y: {gradientPositionY}%</Label>
				<Slider
					value={[gradientPositionY]}
					min={0}
					max={100}
					step={5}
					onValueChange={(value) => setGradientPositionY(value[0])}
				/>
			</div>

			<div className="space-y-2">
				<Label>Radius X: {gradientSizeX}%</Label>
				<Slider
					value={[gradientSizeX]}
					min={50}
					max={200}
					step={5}
					onValueChange={(value) => setGradientSizeX(value[0])}
				/>
			</div>

			<div className="space-y-2">
				<Label>Radius Y: {gradientSizeY}%</Label>
				<Slider
					value={[gradientSizeY]}
					min={50}
					max={200}
					step={5}
					onValueChange={(value) => setGradientSizeY(value[0])}
				/>
			</div>
		</>
	);
}
