"use client";
import { Button } from "@dalim/core/ui/button";
import CopyToClipboard from "@/src/hooks/copy-to-clipboard";
import type { ShaderGradientSettings } from "@/src/types/shader-gradient"; 
import { AnimatePresence, motion } from "motion/react";
import { type JSX, useState } from "react";

interface CopyCodeProps {
	settings: ShaderGradientSettings;
}

export function CopyCode({ settings }: CopyCodeProps): JSX.Element {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_copied, _setCopied] = useState<boolean>(false);
	const [showCode, setShowCode] = useState(false);

	const generateCode = (): string => {
		return `<ShaderGradientCanvas
  style={{
    width: '100%',
    height: '100%',
  }}
  lazyLoad={${settings.lazyLoad}}
  ${settings.fovEnabled ? `\n  fov={${settings.fov}}` : ""}
  fov={${settings.fov}}
  pixelDensity={${settings.pixelDensity}}
  pointerEvents="${settings.pointerEvents}"
>
  <ShaderGradient
    animate="${settings.animate}"
    type="${settings.type}"
    wireframe={${settings.wireframe}}
    shader="${settings.shader}"
    uTime={${settings.uTime}}
    uSpeed={${settings.uSpeed}}
    uStrength={${settings.uStrength}}
    uDensity={${settings.uDensity}}
    uFrequency={${settings.uFrequency}}
    uAmplitude={${settings.uAmplitude}}
    positionX={${settings.positionX}}
    positionY={${settings.positionY}}
    positionZ={${settings.positionZ}}
    rotationX={${settings.rotationX}}
    rotationY={${settings.rotationY}}
    rotationZ={${settings.rotationZ}}
    color1="${settings.color1}"
    color2="${settings.color2}"
    color3="${settings.color3}"
    reflection={${settings.reflection}}

    // View (camera) props
    cAzimuthAngle={${settings.cAzimuthAngle}}
    cPolarAngle={${settings.cPolarAngle}}
    cDistance={${settings.cDistance}}
    cameraZoom={${settings.cameraZoom}}

    // Effect props
    lightType="${settings.lightType}"
    brightness={${settings.brightness}}
    envPreset="${settings.envPreset}"
    grain="${settings.grain}"

    // Tool props
    toggleAxis={${settings.toggleAxis}}
    zoomOut={${settings.zoomOut}}
    hoverState=""

    // Optional - if using transition features
    enableTransition={false}
  />
</ShaderGradientCanvas>`;
	};

	return (
		<>
			{!showCode && (
				<CopyToClipboard
					text={generateCode()}
					classname="right-32 top-5 h-10 w-10"
				/>
			)}
			<Button
				variant="outline"
				size="sm"
				className="absolute top-4 right-4 z-[3] h-11"
				onClick={() => setShowCode(!showCode)}
			>
				{showCode ? "Hide Code" : "Show Code"}
			</Button>
			<AnimatePresence mode="wait">
				{showCode && (
					<div
						className={
							"absolute inset-shadow-[0_1px_rgb(0_0_0/0.10)] top-4 right-4 z-[2] h-[95%] w-[44rem] rounded-lg bg-card-bg p-4 dark:inset-shadow-[0_1px_rgb(255_255_255/0.15)]"
						}
					>
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className="relative h-full space-y-2 overflow-auto"
						>
							<div className="relative mt-10 h-fit">
								<CopyToClipboard
									text={`pnpm add three @react-three/fiber @react-spring/three @shadergradient/react
pnpm add -D @types/three`}
								/>
								<pre className="h-full rounded-lg bg-main p-3 text-sm">
									<code>{`pnpm add three @react-three/fiber @react-spring/three @shadergradient/react
pnpm add -D @types/three`}</code>
								</pre>
							</div>
							<div className="relative h-full">
								<CopyToClipboard text={generateCode()} />
								<pre className="h-full rounded-lg bg-main p-3 text-sm">
									<code>{generateCode()}</code>
								</pre>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
}
