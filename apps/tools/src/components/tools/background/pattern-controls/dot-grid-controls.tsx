"use client";

import { Label } from "@dalim/core/ui/label";
import { Slider } from "@dalim/core/ui/slider";
import { ColorPickerPopover } from "../color-pickers/color-picker-popover";

interface DotGridControlsProps {
	dotGridColor: string;
	setDotGridColor: (color: string) => void;
	dotGridSize: number;
	setDotGridSize: (size: number) => void;
}

export function DotGridControls({
	dotGridColor,
	setDotGridColor,
	dotGridSize,
	setDotGridSize,
}: DotGridControlsProps) {
	return (
		<div className="space-y-4">
			<ColorPickerPopover
				color={dotGridColor}
				onChange={setDotGridColor}
				label="Dot Color"
			/>
			<div className="space-y-2">
				<Label>Dot Size: {dotGridSize}px</Label>
				<Slider
					value={[dotGridSize]}
					min={5}
					max={50}
					step={1}
					onValueChange={(value) => setDotGridSize(value[0])}
				/>
			</div>
		</div>
	);
}
