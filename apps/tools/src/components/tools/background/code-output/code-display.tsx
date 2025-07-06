"use client";

import { Button } from "@dalim/core/ui/button";
import type { GradientStop } from "@/src/hooks/use-gradient-stops";
import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
	getFullCode,
	getLinearGradientCode,
	getMaskCode,
	getRadialGradientCode,
} from "./code-generator";

// Update the interface to include the gradientClicked prop
interface CodeDisplayProps {
	code: string;
	useGradient: boolean;
	gradientType: string;
	gradientStops: GradientStop[];
	linearGradientAngle: number;
	gradientSizeX: number;
	gradientSizeY: number;
	gradientPositionX: number;
	gradientPositionY: number;
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
	repeatingLinearColor: string;
	repeatingLinearAngle: number;
	repeatingLinearSize: number;
}

export function CodeDisplay({
	useGradient,
	gradientType,
	gradientStops,
	linearGradientAngle,
	gradientSizeX,
	gradientSizeY,
	gradientPositionX,
	gradientPositionY,
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
	useMask,
	customMaskPosition,
	maskType,
	maskPositionX,
	maskPositionY,
	maskWidth,
	maskHeight,
	maskOpacity,
	maskFade,
	repeatingLinearColor,
	repeatingLinearAngle,
	repeatingLinearSize,
}: CodeDisplayProps) {
	const [copied, setCopied] = useState<{ [key: string]: boolean }>({
		gradient: false,
		pattern: false,
		mask: false,
		full: false,
	});
	const [showV4, setShowV4] = useState(false);
	const [showCode, setShowCode] = useState(false);

	const copyToClipboard = (text: string, key: string) => {
		navigator.clipboard.writeText(text);
		setCopied({ ...copied, [key]: true });
		setTimeout(() => setCopied({ ...copied, [key]: false }), 2000);
	};

	// Generate Tailwind v3 and v4 gradient code
	let gradientCodeV3 = "";
	let gradientCodeV4 = "";

	if (useGradient) {
		if (gradientType === "linear") {
			const { v3Format, v4Format } = getLinearGradientCode({
				gradientStops,
				linearGradientAngle,
			});
			gradientCodeV3 = v3Format;
			gradientCodeV4 = v4Format;
		} else if (gradientType === "radial") {
			const { v3Format, v4Format } = getRadialGradientCode({
				gradientStops,
				gradientSizeX,
				gradientSizeY,
				gradientPositionX,
				gradientPositionY,
			});
			gradientCodeV3 = v3Format;
			gradientCodeV4 = v4Format;
		}
	}
	let patternCode = "";
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

	const maskCodeV3 = getMaskCode({
		useMask,
		customMaskPosition,
		maskType,
		maskPositionX,
		maskPositionY,
		maskWidth,
		maskHeight,
		maskOpacity,
		maskFade,
		tailwindVersion: "v3",
	});

	const maskCodeV4 = getMaskCode({
		useMask,
		customMaskPosition,
		maskType,
		maskPositionX,
		maskPositionY,
		maskWidth,
		maskHeight,
		maskOpacity,
		maskFade,
		tailwindVersion: "v4",
	});

	const fullCodeV3 = getFullCode({
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
		repeatingLinearAngle,
		repeatingLinearColor,
		repeatingLinearSize,
		tailwindVersion: "v3",
	});

	const fullCodeV4 = getFullCode({
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
		repeatingLinearAngle,
		repeatingLinearColor,
		repeatingLinearSize,
		tailwindVersion: "v4",
	});

	return (
		<>
			<Button
				variant="outline"
				size="sm"
				className="absolute top-2 right-4 z-[2]"
				onClick={() => setShowCode(!showCode)}
			>
				{showCode ? "Hide Code" : "Show Code"}
			</Button>
			<AnimatePresence mode="wait">
				{showCode && (
					<div
						className={
							"absolute  top-2 right-4 h-auto w-[40rem] rounded-lg bg-card p-4 dark:inset-shadow-[0_1px_rgb(255_255_255/0.15)]"
						}
					>
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
						>
							<div className="flex items-center justify-between pt-10 pb-4">
								<motion.h2
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="font-semibold text-xl"
								>
									Generated Code
								</motion.h2>
								<div className="flex items-center gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => setShowV4(!showV4)}
									>
										{showV4 ? "Show v3" : "Show v4"}
									</Button>
								</div>
							</div>

							{patternType !== "none" && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									transition={{ duration: 0.3 }}
									className="mb-4"
								>
									<div className="mb-2 flex items-center justify-between">
										<h3 className="font-medium text-sm">Pattern Code</h3>
										<Button
											variant="outline"
											size="sm"
											onClick={() => copyToClipboard(patternCode, "pattern")}
											className="flex items-center gap-1"
										>
											{copied.pattern ? (
												<>
													<Check className="h-4 w-4" />
													<span>Copied!</span>
												</>
											) : (
												<>
													<Copy className="h-4 w-4" />
													<span>Copy</span>
												</>
											)}
										</Button>
									</div>
									<pre className="overflow-x-auto rounded-lg bg-main p-3 text-sm">
										<code>{patternCode}</code>
									</pre>
								</motion.div>
							)}

							{/* Mask Code Section */}
							{useMask && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									transition={{ duration: 0.3, delay: 0.1 }}
									className="mb-4"
								>
									<div className="mb-2 flex items-center justify-between">
										<h3 className="font-medium text-sm">
											{showV4 ? "Tailwind CSS v4 Mask" : "Tailwind CSS v3 Mask"}
										</h3>
										<Button
											variant="outline"
											size="sm"
											onClick={() =>
												copyToClipboard(
													showV4 ? maskCodeV4 : maskCodeV3,
													"mask",
												)
											}
											className="flex items-center gap-1"
										>
											{copied.mask ? (
												<>
													<Check className="h-4 w-4" />
													<span>Copied!</span>
												</>
											) : (
												<>
													<Copy className="h-4 w-4" />
													<span>Copy</span>
												</>
											)}
										</Button>
									</div>
									<pre className="overflow-x-auto rounded-lg bg-main p-3 text-sm">
										<code>{showV4 ? maskCodeV4 : maskCodeV3}</code>
									</pre>
								</motion.div>
							)}

							{/* Gradient Code Section */}
							{useGradient && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									transition={{ duration: 0.3, delay: 0.2 }}
									className="mb-4"
								>
									<div className="mb-2 flex items-center justify-between">
										<h3 className="font-medium text-sm">
											{showV4
												? `Tailwind CSS v4 ${
														gradientType.charAt(0).toUpperCase() +
														gradientType.slice(1)
													} Gradient`
												: `Tailwind CSS v3 ${
														gradientType.charAt(0).toUpperCase() +
														gradientType.slice(1)
													} Gradient`}
										</h3>
										<Button
											variant="outline"
											size="sm"
											onClick={() =>
												copyToClipboard(
													showV4 ? gradientCodeV4 : gradientCodeV3,
													"gradient",
												)
											}
											className="flex items-center gap-1"
										>
											{copied.gradient ? (
												<>
													<Check className="h-4 w-4" />
													<span>Copied!</span>
												</>
											) : (
												<>
													<Copy className="h-4 w-4" />
													<span>Copy</span>
												</>
											)}
										</Button>
									</div>
									<pre className="overflow-x-auto rounded-lg bg-main p-3 text-sm">
										<code>{showV4 ? gradientCodeV4 : gradientCodeV3}</code>
									</pre>
								</motion.div>
							)}

							{/* Full Code Section */}
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								transition={{ duration: 0.3, delay: 0.3 }}
								className="mb-4"
							>
								<div className="mb-2 flex items-center justify-between">
									<h3 className="font-medium text-sm">Full Code</h3>
									<Button
										variant="outline"
										size="sm"
										onClick={() =>
											copyToClipboard(showV4 ? fullCodeV4 : fullCodeV3, "full")
										}
										className="flex items-center gap-1"
									>
										{copied.full ? (
											<>
												<Check className="h-4 w-4" />
												<span>Copied!</span>
											</>
										) : (
											<>
												<Copy className="h-4 w-4" />
												<span>Copy</span>
											</>
										)}
									</Button>
								</div>
								<pre className="overflow-x-auto rounded-lg bg-main p-4 text-sm">
									<code>{showV4 ? fullCodeV4 : fullCodeV3}</code>
								</pre>
							</motion.div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
}
