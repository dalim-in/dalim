"use client";

import { useEffect, useRef, useState } from "react";

export type GradientStop = {
	color: string;
	alpha: number;
	position: number;
};

export function useGradientStops(
	initialStops: GradientStop[] = [
		{ color: "#ffffff", alpha: 0, position: 10 },
		{ color: "#6633ee", alpha: 1, position: 100 },
	],
) {
	const [gradientStops, setGradientStops] =
		useState<GradientStop[]>(initialStops);
	const [dragIndex, setDragIndex] = useState<number | null>(null);
	const gradientBarRef = useRef<HTMLDivElement>(null);

	// Handle mouse move for dragging color stops
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (dragIndex === null || !gradientBarRef.current) return;

			const rect = gradientBarRef.current.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const width = rect.width;

			// Calculate position as percentage (0-100)
			let newPosition = Math.round((x / width) * 100);
			newPosition = Math.max(0, Math.min(100, newPosition));

			// Update the position
			const newStops = [...gradientStops];
			newStops[dragIndex] = { ...newStops[dragIndex], position: newPosition };

			// Sort the stops to maintain order
			newStops.sort((a, b) => a.position - b.position);

			// Find the new index of our dragged stop after sorting
			const newDragIndex = newStops.findIndex(
				(stop) => stop === newStops[dragIndex],
			);
			if (newDragIndex !== dragIndex) {
				setDragIndex(newDragIndex);
			}

			setGradientStops(newStops);
		};

		const handleMouseUp = () => {
			setDragIndex(null);
		};

		if (dragIndex !== null) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [dragIndex, gradientStops]);

	// Function to add a new color stop
	const addColorStop = () => {
		if (gradientStops.length >= 10) return; // Limit to 10 stops

		// Find middle position between last two stops
		const lastPosition = gradientStops[gradientStops.length - 1].position;
		const secondLastPosition =
			gradientStops[gradientStops.length - 2]?.position || 0;
		const newPosition = Math.min(
			Math.floor((lastPosition + secondLastPosition) / 2) + 10,
			99,
		);

		// Add new stop before the last one
		const newStops = [...gradientStops];
		newStops.splice(gradientStops.length - 1, 0, {
			color: "#4433cc", // Default to a purple color
			alpha: 0.7,
			position: newPosition,
		});

		setGradientStops(newStops);
	};

	// Function to remove a color stop
	const removeColorStop = (index: number) => {
		if (gradientStops.length <= 2) return; // Keep at least 2 stops
		const newStops = gradientStops.filter((_, i) => i !== index);

		// Ensure we maintain the full range from 0% to 100%
		newStops.sort((a, b) => a.position - b.position);
		newStops[0].position = 0;
		newStops[newStops.length - 1].position = 100;

		setGradientStops(newStops);
	};

	// Function to update a color stop
	const updateColorStop = (index: number, updates: Partial<GradientStop>) => {
		const newStops = [...gradientStops];
		newStops[index] = { ...newStops[index], ...updates };
		setGradientStops(newStops);
	};

	return {
		gradientStops,
		setGradientStops,
		dragIndex,
		setDragIndex,
		gradientBarRef,
		addColorStop,
		removeColorStop,
		updateColorStop,
	};
}
