"use client";
 
import { Label } from "@dalim/core/ui/label";
import { RadioGroup, RadioGroupItem } from "@dalim/core/ui/radio-group";
import { Switch } from "@dalim/core/ui/switch";
import type { GradientStop } from "@/src/hooks/use-gradient-stops"; 
import type { RefObject } from "react";
import { LinearGradientControls } from "./linear-gradient-controls";
import { RadialGradientControls } from "./radial-gradient-controls";

interface GradientControlsProps {
	useGradient: boolean;
	setUseGradient: (use: boolean) => void;
	gradientType: string;
	setGradientType: (type: string) => void;
	gradientStops: GradientStop[];
	updateColorStop: (index: number, updates: Partial<GradientStop>) => void;
	setGradientInnerRadius: (radius: number) => void;
	gradientSizeX: number;
	setGradientSizeX: (size: number) => void;
	gradientSizeY: number;
	setGradientSizeY: (size: number) => void;
	gradientPositionX: number;
	setGradientPositionX: (position: number) => void;
	gradientPositionY: number;
	setGradientPositionY: (position: number) => void;
	linearGradientAngle: number;
	setLinearGradientAngle: (angle: number) => void;
	addColorStop: () => void;
	removeColorStop: (index: number) => void;
	gradientBarRef: RefObject<HTMLDivElement>;
	setDragIndex: (index: number | null) => void;
	dragIndex: number | null;
}

export function GradientControls({
	useGradient,
	setUseGradient,
	gradientType,
	setGradientType,
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
	linearGradientAngle,
	setLinearGradientAngle,
	addColorStop,
	removeColorStop,
	gradientBarRef,
	setDragIndex,
	dragIndex,
}: GradientControlsProps) {
	return (
		<div className={"relative mt-4 space-y-3"}>
			{/* {!useGradient && (
        <div className="absolute h-20 w-full -bottom-5 left-0  bg-linear-to-t  from-background "></div>
      )} */}
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<Switch
						id="useGradient"
						checked={useGradient}
						onCheckedChange={setUseGradient}
					/>
					<Label htmlFor="useGradient">Use Gradient</Label>
				</div>
			</div>
			<div className="space-y-2">
				<Label>Gradient Type</Label>
				<RadioGroup
					value={gradientType}
					onValueChange={(value) =>
						setGradientType(value as "radial" | "linear")
					}
					className="flex space-x-4"
				>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="radial" id="radial" />
						<Label htmlFor="radial">Radial</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="linear" id="linear" />
						<Label htmlFor="linear">Linear</Label>
					</div>
				</RadioGroup>
			</div>

			{gradientType === "radial" ? (
				<RadialGradientControls
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
					gradientBarRef={gradientBarRef}
				/>
			) : (
				<LinearGradientControls
					linearGradientAngle={linearGradientAngle}
					setLinearGradientAngle={setLinearGradientAngle}
					gradientStops={gradientStops}
					addColorStop={addColorStop}
					removeColorStop={removeColorStop}
					updateColorStop={updateColorStop}
					gradientBarRef={gradientBarRef}
					setDragIndex={setDragIndex}
					dragIndex={dragIndex}
				/>
			)}
		</div>
	);
}
