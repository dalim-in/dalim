"use client";

import { Button } from "@dalim/core/ui/button";
import { Label } from "@dalim/core/ui/label"; 
import { Slider } from "@dalim/core/ui/slider";
import { ColorPickerPopover } from "../color-pickers/color-picker-popover";

interface RepeatingLinearControlsProps {
	repeatingLinearColor: string;
	setRepeatingLinearColor: (color: string) => void;
	repeatingLinearAngle: number;
	setRepeatingLinearAngle: (angle: number) => void;
	repeatingLinearSize: number;
	setRepeatingLinearSize: (size: number) => void;
}

export function RepeatingLinearControls({
	repeatingLinearColor,
	setRepeatingLinearColor,
	repeatingLinearAngle,
	setRepeatingLinearAngle,
	repeatingLinearSize,
	setRepeatingLinearSize,
}: RepeatingLinearControlsProps) {
	return (
		<div className="space-y-4">
			<ColorPickerPopover
				color={repeatingLinearColor}
				onChange={setRepeatingLinearColor}
				label="Line Color"
			/>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<Label>Angle: {repeatingLinearAngle}°</Label>
					<div className="relative h-10 w-10 rounded-full border">
						<div
							className="absolute top-[50%] left-[50%] h-5 w-1 origin-bottom bg-foreground"
							style={{
								transform: `translateX(-50%) translateY(-100%) rotate(${repeatingLinearAngle}deg)`,
							}}
						/>
					</div>
				</div>
				<Slider
					value={[repeatingLinearAngle]}
					min={0}
					max={360}
					step={15}
					onValueChange={(value) => setRepeatingLinearAngle(value[0])}
				/>
				<div className="mt-2 grid grid-cols-4 gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setRepeatingLinearAngle(0)}
					>
						0° →
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setRepeatingLinearAngle(45)}
					>
						45° ↗
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setRepeatingLinearAngle(90)}
					>
						90° ↑
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setRepeatingLinearAngle(135)}
					>
						135° ↖
					</Button>
				</div>
			</div>

			<div className="space-y-3">
				<Label className="inline-block">
					Line Spacing: {repeatingLinearSize}px
				</Label>
				<Slider
					value={[repeatingLinearSize]}
					min={4}
					max={32}
					step={1}
					onValueChange={(value) => setRepeatingLinearSize(value[0])}
				/>
			</div>
		</div>
	);
}
