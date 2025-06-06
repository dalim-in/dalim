"use client"

import type { ExportOptions } from "dalim-icons"

export class IconExportService {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor() {
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")!
  }

  async exportIcon(
    iconElement: HTMLElement,
    options: ExportOptions,
  ): Promise<{ blob?: Blob; code?: string; url?: string; filename?: string }> {
    try {
      switch (options.format) {
        case "svg":
          return await this.exportSVG(iconElement, options)
        case "png":
          return await this.exportPNG(iconElement, options)
        case "jpg":
          return await this.exportJPG(iconElement, options)
        case "webp":
          return await this.exportWebP(iconElement, options)
        case "react":
          return await this.exportReactCode(iconElement, options)
        case "gif":
          return await this.exportGIF(iconElement, options)
        case "mp4":
          return await this.exportMP4(iconElement, options)
        case "webm":
          return await this.exportWebM(iconElement, options)
        case "png-sequence":
          return await this.exportPNGSequence(iconElement, options)
        case "react-animated":
          return await this.exportReactAnimatedCode(iconElement, options)
        default:
          throw new Error(`Unsupported format: ${options.format}`)
      }
    } catch (error) {
      console.error("Export failed:", error)
      throw error
    }
  }

  private async exportSVG(iconElement: HTMLElement, options: ExportOptions) {
    const svgElement = iconElement.querySelector("svg")
    if (!svgElement) throw new Error("No SVG found in icon element")

    // Clone the SVG to avoid modifying the original
    const svgClone = svgElement.cloneNode(true) as SVGElement
    
    // Set the size
    svgClone.setAttribute("width", options.size.toString())
    svgClone.setAttribute("height", options.size.toString())
    
    // Ensure viewBox is set
    if (!svgClone.getAttribute("viewBox")) {
      svgClone.setAttribute("viewBox", "0 0 24 24")
    }

    // Add background if not transparent
    if (options.backgroundColor && !options.transparent) {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
      rect.setAttribute("width", "100%")
      rect.setAttribute("height", "100%")
      rect.setAttribute("fill", options.backgroundColor)
      svgClone.insertBefore(rect, svgClone.firstChild)
    }

    // Serialize the SVG
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgClone)
    
    // Create a proper SVG with XML declaration
    const fullSvgString = `<?xml version="1.0" encoding="UTF-8"?>\n${svgString}`
    
    const blob = new Blob([fullSvgString], { type: "image/svg+xml;charset=utf-8" })
    
    return { 
      blob, 
      filename: "icon.svg"
    }
  }

  private async exportPNG(iconElement: HTMLElement, options: ExportOptions) {
    return await this.rasterizeIcon(iconElement, options, "image/png", "png")
  }

  private async exportJPG(iconElement: HTMLElement, options: ExportOptions) {
    return await this.rasterizeIcon(iconElement, options, "image/jpeg", "jpg")
  }

  private async exportWebP(iconElement: HTMLElement, options: ExportOptions) {
    return await this.rasterizeIcon(iconElement, options, "image/webp", "webp")
  }

  private async rasterizeIcon(
    iconElement: HTMLElement, 
    options: ExportOptions, 
    mimeType: string, 
    extension: string
  ) {
    const svgElement = iconElement.querySelector("svg")
    if (!svgElement) throw new Error("No SVG found in icon element")

    // Clone and prepare SVG
    const svgClone = svgElement.cloneNode(true) as SVGElement
    svgClone.setAttribute("width", options.size.toString())
    svgClone.setAttribute("height", options.size.toString())
    
    // Ensure viewBox is set
    if (!svgClone.getAttribute("viewBox")) {
      svgClone.setAttribute("viewBox", "0 0 24 24")
    }

    // Add background if not transparent and not PNG
    if (options.backgroundColor && (!options.transparent || mimeType === "image/jpeg")) {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
      rect.setAttribute("width", "100%")
      rect.setAttribute("height", "100%")
      rect.setAttribute("fill", options.backgroundColor || "#ffffff")
      svgClone.insertBefore(rect, svgClone.firstChild)
    }

    // Convert SVG to string
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgClone)
    const svgDataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`

    return new Promise<{ blob: Blob; filename: string }>((resolve, reject) => {
      const img = new Image()
      
      img.onload = () => {
        try {
          // Set canvas size
          this.canvas.width = options.size
          this.canvas.height = options.size

          // Clear canvas
          this.ctx.clearRect(0, 0, options.size, options.size)

          // Set background for JPEG (which doesn't support transparency)
          if (mimeType === "image/jpeg" || (!options.transparent && options.backgroundColor)) {
            this.ctx.fillStyle = options.backgroundColor || "#ffffff"
            this.ctx.fillRect(0, 0, options.size, options.size)
          }

          // Draw the image
          this.ctx.drawImage(img, 0, 0, options.size, options.size)

          // Convert to blob
          this.canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve({ 
                  blob, 
                  filename: `icon.${extension}`
                })
              } else {
                reject(new Error("Failed to create blob"))
              }
            },
            mimeType,
            options.quality || 0.9,
          )
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => {
        reject(new Error("Failed to load SVG image"))
      }

      // Set the image source
      img.src = svgDataUrl
    })
  }

  private async exportReactCode(iconElement: HTMLElement, options: ExportOptions) {
    const svgElement = iconElement.querySelector("svg")
    if (!svgElement) throw new Error("No SVG found in icon element")

    // Get the SVG content
    const svgClone = svgElement.cloneNode(true) as SVGElement
    const innerHTML = svgClone.innerHTML

    // Clean up the SVG content for React
    const cleanedInnerHTML = innerHTML
      .replace(/stroke-width/g, "strokeWidth")
      .replace(/stroke-linecap/g, "strokeLinecap")
      .replace(/stroke-linejoin/g, "strokeLinejoin")
      .replace(/stroke-dasharray/g, "strokeDasharray")
      .replace(/fill-rule/g, "fillRule")
      .replace(/clip-rule/g, "clipRule")

    const componentName = "CustomIcon"
    const reactCode = `import React from 'react';

interface ${componentName}Props {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ${componentName}: React.FC<${componentName}Props> = ({ 
  size = ${options.size}, 
  color = "currentColor",
  strokeWidth = 1.5,
  className,
  style,
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color}
    strokeWidth={strokeWidth}
    className={className}
    style={style}
    {...props}
  >
    ${cleanedInnerHTML}
  </svg>
);

export default ${componentName};`

    return { 
      code: reactCode,
      filename: "CustomIcon.tsx"
    }
  }

  private async exportGIF(iconElement: HTMLElement, options: ExportOptions) {
    // For now, we'll create a simple animated GIF placeholder
    // In a real implementation, you'd use a library like gif.js
    const message = `// GIF export requires additional libraries
// You can use libraries like gif.js to create animated GIFs
// This would capture animation frames and encode them as GIF

// Example implementation:
// import GIF from 'gif.js';
// const gif = new GIF({
//   workers: 2,
//   quality: 10,
//   width: ${options.size},
//   height: ${options.size}
// });
// 
// // Capture frames during animation
// // gif.addFrame(canvas, {delay: 100});
// 
// gif.render();`

    const blob = new Blob([message], { type: "text/plain" })
    return { 
      blob,
      filename: "gif-export-info.txt"
    }
  }

  private async exportMP4(iconElement: HTMLElement, options: ExportOptions) {
    const message = `// MP4 export requires MediaRecorder API or video encoding libraries
// This would capture the animation as video frames

// Example implementation using MediaRecorder:
// const stream = canvas.captureStream(${options.fps || 30});
// const recorder = new MediaRecorder(stream, {
//   mimeType: 'video/webm;codecs=vp9'
// });
// 
// recorder.start();
// // Record for duration: ${options.duration}ms
// setTimeout(() => recorder.stop(), ${options.duration});`

    const blob = new Blob([message], { type: "text/plain" })
    return { 
      blob,
      filename: "mp4-export-info.txt"
    }
  }

  private async exportWebM(iconElement: HTMLElement, options: ExportOptions) {
    const message = `// WebM export using MediaRecorder API
// This would capture the canvas animation as WebM video

const canvas = document.createElement('canvas');
canvas.width = ${options.size};
canvas.height = ${options.size};

const stream = canvas.captureStream(${options.fps || 30});
const recorder = new MediaRecorder(stream, {
  mimeType: 'video/webm;codecs=vp9'
});

const chunks = [];
recorder.ondataavailable = (e) => chunks.push(e.data);
recorder.onstop = () => {
  const blob = new Blob(chunks, { type: 'video/webm' });
  // Download blob
};

recorder.start();
// Animate icon for ${options.duration}ms
setTimeout(() => recorder.stop(), ${options.duration});`

    const blob = new Blob([message], { type: "text/plain" })
    return { 
      blob,
      filename: "webm-export-info.txt"
    }
  }

  private async exportPNGSequence(iconElement: HTMLElement, options: ExportOptions) {
    const message = `// PNG Sequence export would capture individual frames
// Each frame would be exported as a separate PNG file
// Then packaged into a ZIP file

// Frame settings:
// Duration: ${options.duration}ms
// FPS: ${options.fps}
// Total frames: ${Math.floor(((options.duration || 2000) / 1000) * (options.fps || 30))}
// Size: ${options.size}x${options.size}px

// Implementation would use JSZip to create ZIP file:
// import JSZip from 'jszip';
// const zip = new JSZip();
// 
// for (let frame = 0; frame < totalFrames; frame++) {
//   const canvas = captureFrame(frame);
//   const blob = await canvasToBlob(canvas);
//   zip.file(\`frame_\${frame.toString().padStart(4, '0')}.png\`, blob);
// }
// 
// const zipBlob = await zip.generateAsync({type: 'blob'});`

    const blob = new Blob([message], { type: "text/plain" })
    return { 
      blob,
      filename: "png-sequence-info.txt"
    }
  }

  private async exportReactAnimatedCode(iconElement: HTMLElement, options: ExportOptions) {
    const svgElement = iconElement.querySelector("svg")
    if (!svgElement) throw new Error("No SVG found in icon element")

    const svgClone = svgElement.cloneNode(true) as SVGElement
    const innerHTML = svgClone.innerHTML

    const cleanedInnerHTML = innerHTML
      .replace(/stroke-width/g, "strokeWidth")
      .replace(/stroke-linecap/g, "strokeLinecap")
      .replace(/stroke-linejoin/g, "strokeLinejoin")
      .replace(/stroke-dasharray/g, "strokeDasharray")
      .replace(/fill-rule/g, "fillRule")
      .replace(/clip-rule/g, "clipRule")

    const componentName = "AnimatedIcon"
    const reactCode = `import React from 'react';
import { motion } from 'framer-motion';

interface ${componentName}Props {
  size?: number;
  color?: string;
  strokeWidth?: number;
  animation?: boolean;
  loop?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const pathVariants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: ${(options.duration || 2000) / 1000},
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const ${componentName}: React.FC<${componentName}Props> = ({ 
  size = ${options.size}, 
  color = "currentColor",
  strokeWidth = 1.5,
  animation = true,
  loop = true,
  className,
  style,
  ...props 
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color}
    strokeWidth={strokeWidth}
    className={className}
    style={style}
    initial="normal"
    animate={animation ? "animate" : "normal"}
    {...props}
  >
    ${cleanedInnerHTML.replace(/<path/g, '<motion.path\n      variants={pathVariants}')}
  </motion.svg>
);

export default ${componentName};`

    return { 
      code: reactCode,
      filename: "AnimatedIcon.tsx"
    }
  }
}


export const exportService = new IconExportService()
