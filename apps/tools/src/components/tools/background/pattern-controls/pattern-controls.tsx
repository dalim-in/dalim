"use client";

import { Label } from "@dalim/core/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@dalim/core/ui/select";
import { DotGridControls } from "./dot-grid-controls";
import { DotsControls } from "./dots-controls";
import { GridControls } from "./grid-controls";
import { LineGridControls } from "./line-grid-controls";
import { RepeatingLinearControls } from "./repeating-linear-controls";
interface PatternControlsProps {
	patternType: string;
	setPatternType: (type: string) => void;
	gridLineColor: string;
	setGridLineColor: (color: string) => void;
	gridSizeX: number;
	setGridSizeX: (size: number) => void;
	gridSizeY: number;
	setGridSizeY: (size: number) => void;
	dotColor: string;
	setDotColor: (color: string) => void;
	dotSize: number;
	setDotSize: (size: number) => void;
	lineGridColor: string;
	setLineGridColor: (color: string) => void;
	lineGridSizeX: number;
	setLineGridSizeX: (size: number) => void;
	lineGridSizeY: number;
	setLineGridSizeY: (size: number) => void;
	dotGridColor: string;
	setDotGridColor: (color: string) => void;
	dotGridSize: number;
	setDotGridSize: (size: number) => void;
	bgColor: string;
	repeatingLinearColor: string;
	setRepeatingLinearColor: (color: string) => void;
	repeatingLinearAngle: number;
	setRepeatingLinearAngle: (angle: number) => void;
	repeatingLinearSize: number;
	setRepeatingLinearSize: (size: number) => void;
}

export function PatternControls({
	patternType,
	setPatternType,
	gridLineColor,
	setGridLineColor,
	gridSizeX,
	setGridSizeX,
	gridSizeY,
	setGridSizeY,
	dotColor,
	setDotColor,
	dotSize,
	setDotSize,
	lineGridColor,
	setLineGridColor,
	lineGridSizeX,
	setLineGridSizeX,
	lineGridSizeY,
	setLineGridSizeY,
	dotGridColor,
	setDotGridColor,
	dotGridSize,
	setDotGridSize,
	repeatingLinearColor,
	setRepeatingLinearColor,
	repeatingLinearAngle,
	setRepeatingLinearAngle,
	repeatingLinearSize,
	setRepeatingLinearSize,
}: PatternControlsProps) {
	const renderPatternControls = () => {
		switch (patternType) {
			case "grid":
				return (
					<GridControls
						gridLineColor={gridLineColor}
						setGridLineColor={setGridLineColor}
						gridSizeX={gridSizeX}
						setGridSizeX={setGridSizeX}
						gridSizeY={gridSizeY}
						setGridSizeY={setGridSizeY}
					/>
				);
			case "dots":
				return (
					<DotsControls
						dotColor={dotColor}
						setDotColor={setDotColor}
						dotSize={dotSize}
						setDotSize={setDotSize}
					/>
				);
			case "lineGrid":
				return (
					<LineGridControls
						lineGridColor={lineGridColor}
						setLineGridColor={setLineGridColor}
						lineGridSizeX={lineGridSizeX}
						setLineGridSizeX={setLineGridSizeX}
						lineGridSizeY={lineGridSizeY}
						setLineGridSizeY={setLineGridSizeY}
					/>
				);
			case "dotGrid":
				return (
					<DotGridControls
						dotGridColor={dotGridColor}
						setDotGridColor={setDotGridColor}
						dotGridSize={dotGridSize}
						setDotGridSize={setDotGridSize}
					/>
				);
			case "repeatingLinear":
				return (
					<RepeatingLinearControls
						repeatingLinearColor={repeatingLinearColor}
						setRepeatingLinearColor={setRepeatingLinearColor}
						repeatingLinearAngle={repeatingLinearAngle}
						setRepeatingLinearAngle={setRepeatingLinearAngle}
						repeatingLinearSize={repeatingLinearSize}
						setRepeatingLinearSize={setRepeatingLinearSize}
					/>
				);
			case "none":
				return (
					<div className="text-muted-foreground italic">
						No pattern selected. You can still use the gradient and mask
						effects.
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="patternType">Pattern Type</Label>
				<Select value={patternType} onValueChange={setPatternType}>
					<SelectTrigger id="patternType">
						<SelectValue placeholder="Select pattern type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="grid">Grid Lines</SelectItem>
						<SelectItem value="dots">Dots</SelectItem>
						<SelectItem value="lineGrid">Line Grid (rem)</SelectItem>
						<SelectItem value="dotGrid">Dot Grid</SelectItem>
						<SelectItem value="repeatingLinear">Repeating Linear</SelectItem>
						<SelectItem value="none">None</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{renderPatternControls()}
		</div>
	);
}
