"use client";
 
import { AnimateSvg } from "./animate-svg";
import { cn } from "@dalim/core/lib/utils"; 
import { useTheme } from "next-themes";
import { useQueryState } from "nuqs";
import { useState } from "react"; 
import { examplesSvgPath } from "./data";

interface ExamplePathsProps {
	onSelectPath: (path: string) => void;
	// onEditPath: (path: string, viewBox: string) => void
	setActivePresets: (presets: string) => void;
	activePresets: string | null;
}

export function ExamplePaths({
	onSelectPath,
	setActivePresets,
	activePresets,
}: ExamplePathsProps) {
	const { theme } = useTheme();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_exampleViewBox, setExampleViewBox] = useQueryState("viewBox", {
		defaultValue: "0 0 250 100",
	});
	const [animationKeys] = useState<Record<number, number>>(
		{},
	);
	 
	  

	return (
		<div className="grid mb-10 grid-cols-1 gap-2 sm:grid-cols-2">
			{examplesSvgPath.map((example, index) => (
				<div
					key={index}
					className="group relative rounded-xl border bg-card p-1"
				>
					<div
						className={cn(
							"relative h-24 w-full cursor-pointer rounded-xl p-4",
							activePresets === example.id && "bg-card",
						)}
						onClick={() => {
							onSelectPath(example.path);
							setExampleViewBox(example.viewBox);
							setActivePresets(example.id);
						}}
						onKeyDown={(e) => {
							e.preventDefault();
							onSelectPath(example.path);
							setExampleViewBox(example.viewBox);
							setActivePresets(example.id);
						}}
					>
						<AnimateSvg
							key={animationKeys[index] || 0}
							width="80"
							height="80"
							viewBox={example.viewBox}
							className="h-full w-full"
							path={example.path}
							strokeColor={theme === "light" ? "#000000" : "#ffffff"}
							strokeWidth={3}
							strokeLinecap="round"
							animationDuration={1.5}
							animationDelay={0}
							animationBounce={0.3}
							reverseAnimation={false}
						/>
						<p className="absolute bottom-0 text-xs left-0 w-full p-1 text-center">
							{example.name}
						</p>
					</div>

					 
				</div>
			))}
		</div>
	);
}
