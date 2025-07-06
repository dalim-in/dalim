/* eslint-disable @typescript-eslint/no-unused-vars */
 
'use client'

import { Button } from '@dalim/core/ui/button'
import { ScrollArea, ScrollBar } from '@dalim/core/ui/scroll-area'
import { useMediaQuery } from '@/src/hooks/use-media-query'
import { cn } from '@dalim/core/lib/utils'
import type { ControlSections, EnvPreset, GradientType, LightType, PointerEventsOption, ShaderGradientSettings } from '@/src/types/shader-gradient'
import { ShaderGradientCanvas } from '@shadergradient/react'
import { ShaderGradient } from '@shadergradient/react'
import { type JSX, Suspense, useState } from 'react'
import { ControlPanel } from './control-panel'
import { CopyCode } from './copy-code'
import { ExampleGradients } from './example-gradients'

const defaultSettings: ShaderGradientSettings = {
    animate: 'on',
    type: 'waterPlane',
    wireframe: false,
    shader: 'defaults',
    uTime: 8,
    uSpeed: 0.3,
    uStrength: 1.5,
    uDensity: 1.5,
    uFrequency: 0,
    uAmplitude: 0,
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    rotationX: 50,
    rotationY: 0,
    rotationZ: -60,
    color1: '#242880',
    color2: '#8d7dca',
    color3: '#212121',
    reflection: 0.1,
    cAzimuthAngle: 180,
    cPolarAngle: 80,
    cDistance: 2.8,
    cameraZoom: 9.1,
    lightType: '3d',
    brightness: 1,
    envPreset: 'city',
    grain: 'on',
    toggleAxis: false,
    zoomOut: false,
    hoverState: '',
    enableTransition: false,
    pointerEvents: 'none',
    pixelDensity: 1,
    fovEnabled: false, // Default to disabled
    fov: 100,
}

const gradientTypes: GradientType[] = ['waterPlane', 'plane', 'sphere']

const envPresets: EnvPreset[] = ['city', 'dawn', 'lobby']
const lightTypes: LightType[] = ['3d', 'env']
const pointerEventsOptions: PointerEventsOption[] = ['none', 'auto']

// All controls organized by sections
const allControls: ControlSections = {
    basic: {
        title: 'Basic Settings',
        controls: {
            type: {
                type: 'buttonGroup', // Changed from "select" to "buttonGroup"
                options: gradientTypes,
            },
            // shader: {
            //   type: "buttonGroup", // Changed from "select" to "buttonGroup"
            //   options: shaderTypes,
            // },
            animate: {
                type: 'toggle',
                options: ['on', 'off'],
            },
            color1: {
                type: 'color',
            },
            color2: {
                type: 'color',
            },
            color3: {
                type: 'color',
            },
            // Canvas properties
            lazyLoad: {
                type: 'toggle',
            },
            fovEnabled: {
                type: 'toggle',
            },
            fov: {
                type: 'slider',
                min: 10,
                max: 300,
                step: 1,
            },
            pixelDensity: {
                type: 'slider',
                min: 1,
                max: 9,
                step: 1,
            },
            pointerEvents: {
                type: 'buttonGroup',
                options: pointerEventsOptions,
            },
        },
    },
    effects: {
        title: 'Effects & Animation',
        controls: {
            grain: {
                type: 'toggle',
                options: ['on', 'off'],
            },
            uTime: {
                type: 'slider',
                min: 0,
                max: 20,
                step: 0.1,
            },
            uSpeed: {
                type: 'slider',
                min: 0,
                max: 2,
                step: 0.01,
            },
            uStrength: {
                type: 'slider',
                min: 0,
                max: 5,
                step: 0.1,
            },
            uDensity: {
                type: 'slider',
                min: 0,
                max: 5,
                step: 0.1,
            },
            uFrequency: {
                type: 'slider',
                min: 0,
                max: 5,
                step: 0.1,
            },
            uAmplitude: {
                type: 'slider',
                min: 0,
                max: 5,
                step: 0.1,
            },
            reflection: {
                type: 'slider',
                min: 0,
                max: 1,
                step: 0.01,
            },
            brightness: {
                type: 'slider',
                min: 0,
                max: 2,
                step: 0.1,
            },
            lightType: {
                type: 'buttonGroup', // Changed from "select" to "buttonGroup"
                options: lightTypes,
            },
            envPreset: {
                type: 'buttonGroup', // Changed from "select" to "buttonGroup"
                options: envPresets,
            },
        },
    },
    position: {
        title: 'Position & Rotation',
        controls: {
            positionX: {
                type: 'slider',
                min: -10,
                max: 10,
                step: 0.1,
            },
            positionY: {
                type: 'slider',
                min: -10,
                max: 10,
                step: 0.1,
            },
            positionZ: {
                type: 'slider',
                min: -10,
                max: 10,
                step: 0.1,
            },
            rotationX: {
                type: 'slider',
                min: -180,
                max: 180,
                step: 1,
            },
            rotationY: {
                type: 'slider',
                min: -180,
                max: 180,
                step: 1,
            },
            rotationZ: {
                type: 'slider',
                min: -180,
                max: 180,
                step: 1,
            },
        },
    },
    camera: {
        title: 'Camera Settings',
        controls: {
            cAzimuthAngle: {
                type: 'slider',
                min: 0,
                max: 360,
                step: 1,
            },
            cPolarAngle: {
                type: 'slider',
                min: 0,
                max: 180,
                step: 1,
            },
            cDistance: {
                type: 'slider',
                min: 0.1,
                max: 10,
                step: 0.1,
            },
            // cameraZoom: {
            //   type: "slider",
            //   min: 0.1,
            //   max: 20,
            //   step: 0.1,
            // },
        },
    },
}

export function ShaderGradientGenerator(): JSX.Element {
    const isMobile = useMediaQuery('(max-width:1024px)')

    const [settings, setSettings] = useState<ShaderGradientSettings>(defaultSettings)
    const [selectedExample, setSelectedExample] = useState<string>('')
    const updateSettings = (newSettings: Partial<ShaderGradientSettings>): void => {
        setSettings((prev) => ({ ...prev, ...newSettings }))
    }

    return (
        <>
            {isMobile && <p className="text-primary/60 pb-2 text-center">Please use a desktop/laptop to view the Editor.</p>}

            <div
                className="relative mt-3 flex -mx-6 px-3"
                id="editor">
                <ScrollArea className=" w-full gap-2 h-full md:w-72">
                    <div className="grid gap-2 h-32 w-full">
                        {ExampleGradients.map((example, _index) => (
                            <Button
                                key={example?.id}
                                variant="outline"
                                onClick={() => {
                                    setSelectedExample(example.id)
                                    setSettings(example?.settings)
                                }}
                                className={cn('relative h-full w-full shrink-0 cursor-pointer overflow-hidden rounded-md p-2', selectedExample === example.id ? 'bg-main border' : 'layeroutline')}>
                                <div
                                    className="relative h-full w-full overflow-hidden rounded-md"
                                    style={{
                                        background: `linear-gradient(135deg, ${example.settings.color1}, ${example.settings.color2}, ${example.settings.color3})`,
                                    }}>
                                    {example?.settings?.grain === 'on' && <div className="absolute left-0 top-0 h-full w-full bg-[url('/noise.gif')] opacity-10" />}
                                </div>
                            </Button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>

                <div className="relative h-[83vh] w-full px-3">
                    <div className=" relative h-full w-full rounded-xl border ">
                        <CopyCode settings={settings} />
                        <Suspense>
                            <ShaderGradientCanvas
                                key={settings.fovEnabled ? settings.fov : 'defaultFOV'}
                                className="rounded-lg"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                lazyLoad={settings.lazyLoad}
                                {...(settings.fovEnabled ? { fov: settings.fov } : {})}
                                pixelDensity={settings.pixelDensity}
                                pointerEvents={settings.pointerEvents}>
                                <ShaderGradient
                                    animate={settings.animate}
                                    type={settings.type}
                                    wireframe={settings.wireframe}
                                    shader={settings.shader}
                                    uTime={settings.uTime}
                                    uSpeed={settings.uSpeed}
                                    uStrength={settings.uStrength}
                                    uDensity={settings.uDensity}
                                    uFrequency={settings.uFrequency}
                                    uAmplitude={settings.uAmplitude}
                                    positionX={settings.positionX}
                                    positionY={settings.positionY}
                                    positionZ={settings.positionZ}
                                    rotationX={settings.rotationX}
                                    rotationY={settings.rotationY}
                                    rotationZ={settings.rotationZ}
                                    color1={settings.color1}
                                    color2={settings.color2}
                                    color3={settings.color3}
                                    reflection={settings.reflection}
                                    cAzimuthAngle={settings.cAzimuthAngle}
                                    cPolarAngle={settings.cPolarAngle}
                                    cDistance={settings.cDistance}
                                    cameraZoom={settings.cameraZoom}
                                    lightType={settings.lightType}
                                    brightness={settings.brightness}
                                    envPreset={settings.envPreset}
                                    grain={settings.grain}
                                    toggleAxis={settings.toggleAxis}
                                    zoomOut={settings.zoomOut}
                                    hoverState={settings.hoverState}
                                    enableTransition={settings.enableTransition}
                                />
                            </ShaderGradientCanvas>
                        </Suspense>
                    </div>
                </div>
                {!isMobile && (
                    <div className={'relative h-[85vh] mb-6 w-full md:w-72'}>
                        <ScrollArea className="h-full pr-2 ">
                            <ControlPanel
                                settings={settings}
                                updateSettings={updateSettings}
                                sections={allControls}
                                sectionClassNames={{
                                    basic: ' ',
                                    effects: ' ',
                                    position: ' ',
                                    camera: ' ',
                                }}
                            />
                        </ScrollArea>
                    </div>
                )}
            </div>
        </>
    )
}
