"use client";

import { Button } from "@dalim/core/ui/button";
import { Input } from "@dalim/core/ui/input";
import { Label } from "@dalim/core/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@dalim/core/ui/popover"; 
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@dalim/core/ui/select";
import { Slider } from "@dalim/core/ui/slider";
import { Switch } from "@dalim/core/ui/switch";
import type {
	ControlConfig,
	ControlSections,
	ShaderGradientSettings,
} from "@/src/types/shader-gradient";
import type { JSX } from "react";
import { HexColorPicker } from "react-colorful";

interface ControlPanelProps {
	settings: ShaderGradientSettings;
	updateSettings: (newSettings: Partial<ShaderGradientSettings>) => void;
	sections: ControlSections;
	sectionClassNames?: Record<string, string>;
}

export function ControlPanel({
	settings,
	updateSettings,
	sections,
	sectionClassNames = {},
}: ControlPanelProps): JSX.Element {
	// Special component for color controls in a row
	const renderColorControls = () => {
		return (
			<div className="mb-4 space-y-2">
				<Label>Colors</Label>
				<div className="grid grid-cols-3 gap-4">
					{["color1", "color2", "color3"].map((colorKey) => {
						const value = settings[
							colorKey as keyof ShaderGradientSettings
						] as string;
						return (
							<div key={colorKey} className="flex flex-col items-center gap-2">
								<Popover>
									<PopoverTrigger asChild>
										<button
											type="button"
											className="h-10 w-full rounded border"
											style={{ backgroundColor: value }}
											aria-label={`Pick ${colorKey}`}
										/>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="center">
										<HexColorPicker
											color={value}
											onChange={(color) =>
												updateSettings({
													[colorKey]: color,
												} as Partial<ShaderGradientSettings>)
											}
										/>
									</PopoverContent>
								</Popover>
								<Input
									value={value}
									onChange={(e) =>
										updateSettings({
											[colorKey]: e.target.value,
										} as Partial<ShaderGradientSettings>)
									}
									className="h-8 font-mono text-xs"
								/>
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	const renderControl = (
		key: string,
		config: ControlConfig,
	): JSX.Element | null => {
		// Skip color controls as they're handled separately
		if (key === "color1" || key === "color2" || key === "color3") {
			return null;
		}
		// Skip the FOV slider if FOV is not enabled
		if (key === "fov" && !settings.fovEnabled) {
			return null;
		}
		const value = settings[key as keyof ShaderGradientSettings];

		switch (config.type) {
			case "buttonGroup": {
				const buttonConfig = config as {
					type: "buttonGroup";
					options: string[];
				};
				return (
					<div className="mb-4 space-y-2" key={key}>
						<Label htmlFor={key}>{formatLabel(key)}</Label>
						<div className="grid grid-cols-3 gap-2">
							{buttonConfig.options.map((option) => (
								<Button
									key={option}
									size="sm"
									variant={value === option ? "default" : "outline"}
									onClick={() =>
										updateSettings({
											[key]: option,
										} as Partial<ShaderGradientSettings>)
									}
									className="w-full border-0"
								>
									{option}
								</Button>
							))}
						</div>
					</div>
				);
			}

			case "slider": {
				const sliderConfig = config as {
					type: "slider";
					min: number;
					max: number;
					step: number;
				};
				return (
					<div className="mb-4 space-y-2" key={key}>
						<div className="flex justify-between">
							<Label htmlFor={key}>{formatLabel(key)}</Label>
							<span className="text-muted-foreground text-sm">
								{value as number}
							</span>
						</div>
						<Slider
							id={key}
							min={sliderConfig.min}
							max={sliderConfig.max}
							step={sliderConfig.step}
							value={[value as number]}
							onValueChange={(vals) =>
								updateSettings({
									[key]: vals[0],
								} as Partial<ShaderGradientSettings>)
							}
						/>
					</div>
				);
			}

			case "toggle": {
				const toggleConfig = config as {
					type: "toggle";
					options?: [string, string];
				};
				if (toggleConfig.options) {
					// For on/off string toggles
					const isOn = value === "on";
					return (
						<div className="mb-4 flex items-center justify-between" key={key}>
							<Label htmlFor={key}>{formatLabel(key)}</Label>
							<Switch
								id={key}
								checked={isOn}
								onCheckedChange={(checked) =>
									updateSettings({
										[key]: checked ? "on" : "off",
									} as Partial<ShaderGradientSettings>)
								}
							/>
						</div>
					);
				}
				// For boolean toggles
				return (
					<div className="mb-4 flex items-center justify-between" key={key}>
						<Label htmlFor={key}>{formatLabel(key)}</Label>
						<Switch
							id={key}
							checked={value as boolean}
							onCheckedChange={(checked) =>
								updateSettings({
									[key]: checked,
								} as Partial<ShaderGradientSettings>)
							}
						/>
					</div>
				);
			}

			case "select": {
				const selectConfig = config as { type: "select"; options: string[] };
				return (
					<div className="mb-4 space-y-2" key={key}>
						<Label htmlFor={key}>{formatLabel(key)}</Label>
						<Select
							value={value as string}
							onValueChange={(val) =>
								updateSettings({
									[key]: val,
								} as Partial<ShaderGradientSettings>)
							}
						>
							<SelectTrigger>
								<SelectValue placeholder={`Select ${formatLabel(key)}`} />
							</SelectTrigger>
							<SelectContent>
								{selectConfig.options.map((option) => (
									<SelectItem key={option} value={option}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				);
			}

			case "color": {
				return (
					<div className="mb-4 space-y-2" key={key}>
						<Label htmlFor={key}>{formatLabel(key)}</Label>
						<div className="flex gap-2">
							<Popover>
								<PopoverTrigger asChild>
									<button
										type="button"
										className="h-10 w-10 rounded border"
										style={{ backgroundColor: value as string }}
										aria-label={`Pick color for ${formatLabel(key)}`}
									/>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<HexColorPicker
										color={value as string}
										onChange={(color) =>
											updateSettings({
												[key]: color,
											} as Partial<ShaderGradientSettings>)
										}
									/>
								</PopoverContent>
							</Popover>
							<Input
								id={key}
								value={value as string}
								onChange={(e) =>
									updateSettings({
										[key]: e.target.value,
									} as Partial<ShaderGradientSettings>)
								}
								className="font-mono"
							/>
						</div>
					</div>
				);
			}

			default:
				return null;
		}
	};

	const formatLabel = (key: string): string => {
		// Convert camelCase to Title Case with spaces
		return key
			.replace(/([A-Z])/g, " $1")
			.replace(/^./, (str) => str.toUpperCase());
	};

	return (
		<div className="space-y-6">
			{Object.entries(sections).map(([sectionKey, section]) => {
				const hasColorControls =
					sectionKey === "basic" &&
					Object.keys(section.controls).some((key) =>
						["color1", "color2", "color3"].includes(key),
					);

				return (
					<div key={sectionKey} className={sectionClassNames[sectionKey] || ""}>
						<h2 className="mb-4 border-b pb-2 font-semibold text-lg">
							{section.title}
						</h2>
						<div className="space-y-2">
							{/* Render color controls in a row if this is the basic section */}
							{hasColorControls && renderColorControls()}

							{/* Render all other controls */}
							{Object.entries(section.controls).map(([key, config]) =>
								renderControl(key, config),
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
