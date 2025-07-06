/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
// Exact types from the ShaderGradient library
export type GradientType = "plane" | "sphere" | "waterPlane";
export type AnimateOption = "on" | "off";
export type LightType = "3d" | "env";
export type EnvPreset = "city" | "dawn" | "lobby";
export type GrainOption = "on" | "off";

// Base mesh properties
export interface MeshProps {
	type?: GradientType;
	animate?: AnimateOption;
	uTime?: number;
	uSpeed?: number;
	uStrength?: number;
	uDensity?: number;
	uFrequency?: number;
	uAmplitude?: number;
	positionX?: number;
	positionY?: number;
	positionZ?: number;
	rotationX?: number;
	rotationY?: number;
	rotationZ?: number;
	color1?: string;
	color2?: string;
	color3?: string;
	reflection?: number;
	wireframe?: boolean;
	shader?: string;
	rotSpringOption?: any;
	posSpringOption?: any;
}

// Full ShaderGradient properties
export interface ShaderGradientSettings extends MeshProps {
	control?: "query" | "props";
	isFigmaPlugin?: boolean;
	smoothTime?: number;
	cAzimuthAngle?: number;
	cPolarAngle?: number;
	cDistance?: number;
	cameraZoom?: number;
	lightType?: LightType;
	brightness?: number;
	envPreset?: EnvPreset;
	grain?: GrainOption;
	grainBlending?: number;
	zoomOut?: boolean;
	toggleAxis?: boolean;
	hoverState?: string;
	enableTransition?: boolean;
	urlString?: string;
	fovEnabled?: boolean;
	lazyLoad?: boolean;
	fov?: number;
	pixelDensity?: number;
	pointerEvents?: PointerEventsOption;
}

// Canvas properties
export interface ShaderGradientCanvasProps {
	children: React.ReactNode;
	style?: React.CSSProperties;
	pixelDensity?: number;
	fov?: number;
	pointerEvents?: "none" | "auto";
	className?: string;
	envBasePath?: string;
	lazyLoad?: boolean;
	format?: string;
}

// Add pointerEvents type
export type PointerEventsOption = "none" | "auto";

// Control types for the control panel
export type ControlType =
	| "slider"
	| "toggle"
	| "select"
	| "color"
	| "buttonGroup";

// Base interface for all control configurations
export interface BaseControlConfig {
	type: ControlType;
}

// Specific control configurations
export interface SliderControlConfig extends BaseControlConfig {
	type: "slider";
	min: number;
	max: number;
	step: number;
}

export interface ToggleControlConfig extends BaseControlConfig {
	type: "toggle";
	options?: [string, string]; // For string toggles like "on"/"off"
}

export interface SelectControlConfig extends BaseControlConfig {
	type: "select";
	options: string[];
}

export interface ButtonGroupControlConfig extends BaseControlConfig {
	type: "buttonGroup";
	options: string[];
}

export interface ColorControlConfig extends BaseControlConfig {
	type: "color";
}

// Union type for all possible control configurations
export type ControlConfig =
	| SliderControlConfig
	| ToggleControlConfig
	| SelectControlConfig
	| ButtonGroupControlConfig
	| ColorControlConfig;

// Type for a section of controls
export interface ControlSection {
	title: string;
	controls: Record<string, ControlConfig>;
}

// Type for all control sections
export type ControlSections = Record<string, ControlSection>;
