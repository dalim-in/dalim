"use client";

import { Button } from "@dalim/core/ui/button";
import { Input } from "@dalim/core/ui/input";
import { Label } from "@dalim/core/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@dalim/core/ui/popover";
import { Slider } from "@dalim/core/ui/slider";
import { hexToRgba } from "@/src/lib/color";
import { HexColorPicker } from "react-colorful";

interface RgbaPickerPopoverProps {
	color: string;
	alpha: number;
	onColorChange: (color: string) => void;
	onAlphaChange: (alpha: number) => void;
	label: string;
	isLabel?: boolean;
}

export function RgbaPickerPopover({
	color,
	alpha,
	onColorChange,
	onAlphaChange,
	label,
	isLabel = true,
}: RgbaPickerPopoverProps) {
	return (
		<div className="flex items-center gap-2">
			{isLabel && <Label className="w-24">{label}</Label>}
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className="h-8 w-24 p-0"
						style={{ backgroundColor: hexToRgba(color, alpha) }}
					>
						<span className="sr-only">Pick a color</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-3">
					<HexColorPicker color={color} onChange={onColorChange} />
					<div className="mt-2">
						<Label>Alpha: {alpha.toFixed(2)}</Label>
						<Slider
							value={[alpha]}
							min={0}
							max={1}
							step={0.01}
							onValueChange={(value) => onAlphaChange(value[0])}
							className="mt-1"
						/>
					</div>
					<div className="mt-2 flex">
						<Input
							value={color}
							onChange={(e) => onColorChange(e.target.value)}
							className="h-8"
						/>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
