"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/src/lib/utils";
import { GripVertical } from "lucide-react";

export const CustomSlider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, defaultValue, min = 0, max = 100, ...props }, ref) => {
	const isRangeSlider =
		(value && value.length > 1) || (defaultValue && defaultValue.length > 1);

	return (
		<SliderPrimitive.Root
			ref={ref}
			className={cn(
				"relative flex w-full touch-none select-none items-center overflow-hidden rounded-sm",
				className,
			)}
			value={value}
			defaultValue={defaultValue}
			min={min}
			max={max}
			{...props}
		>
			<SliderPrimitive.Track className="relative h-6 w-full grow overflow-hidden bg-[linear-gradient(to_right,#e2e2e22c_1px,transparent_1px),linear-gradient(to_bottom,#9c9c9c2c_1px,transparent_1px)] bg-[size:4px_4px] bg-card-bg dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]">
				<SliderPrimitive.Range className="absolute h-full bg-primary" />
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb className="grid h-6 w-3 cursor-grab place-content-center rounded-r-sm bg-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary active:cursor-grabbing">
				<GripVertical size={16} className="px-0.5 text-primary-foreground" />
			</SliderPrimitive.Thumb>
			{isRangeSlider && (
				<SliderPrimitive.Thumb className="block h-6 w-2 border bg-main shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white" />
			)}
		</SliderPrimitive.Root>
	);
});

CustomSlider.displayName = SliderPrimitive.Root.displayName;
