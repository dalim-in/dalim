"use client";

import { Label } from "@dalim/core/ui/label"; 
import { Slider } from "@dalim/core/ui/slider";
import { ColorPickerPopover } from "../color-pickers/color-picker-popover";

interface DotsControlsProps {
	dotColor: string;
	setDotColor: (color: string) => void;
	dotSize: number;
	setDotSize: (size: number) => void;
}

export function DotsControls({
	dotColor,
	setDotColor,
	dotSize,
	setDotSize,
}: DotsControlsProps) {
	return (
		<div className="space-y-4">
			<ColorPickerPopover
				color={dotColor.replace(/33$/, "")}
				onChange={(color) => {
					const baseColor = color.replace(/33$/, "");
					setDotColor(`${baseColor}33`);
				}}
				label="Dot Color"
			/>
			<div className="space-y-2">
				<Label>Dot Size: {dotSize}px</Label>
				<Slider
					value={[dotSize]}
					min={5}
					max={50}
					step={1}
					onValueChange={(value) => setDotSize(value[0])}
				/>
			</div>
		</div>
	);
}
