export const hexToRgba = (hex: string, alpha = 1) => {
	// Remove the # if present
	const cleanedHex = hex.replace("#", "");

	let r: number;
	let g: number;
	let b: number;

	if (cleanedHex.length === 3) {
		r = Number.parseInt(cleanedHex[0] + cleanedHex[0], 16);
		g = Number.parseInt(cleanedHex[1] + cleanedHex[1], 16);
		b = Number.parseInt(cleanedHex[2] + cleanedHex[2], 16);
	} else {
		r = Number.parseInt(cleanedHex.substring(0, 2), 16);
		g = Number.parseInt(cleanedHex.substring(2, 4), 16);
		b = Number.parseInt(cleanedHex.substring(4, 6), 16);
	}

	// Return rgba string without spaces after commas
	return `rgba(${r},${g},${b},${alpha})`;
};

// Format rgba for Tailwind CSS (with underscores)
export const formatRgbaForTailwind = (hex: string, alpha = 1) => {
	const rgba = hexToRgba(hex, alpha);
	return rgba.replace(
		/rgba$$(\d+),(\d+),(\d+),([0-9.]+)$$/,
		"rgba($1,_$2,_$3,_$4)",
	);
};
