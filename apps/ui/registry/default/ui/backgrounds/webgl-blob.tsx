"use client"

import { useEffect, useRef } from "react"

const WebGLBlob = ({
  particles = 18,
  energy = 0.2,
  blobiness = 1.6,
  brightness = 1.1,
  offset = 30000.0,
  width = "100vw",
  height = "100vh",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", { alpha: true })
    if (!gl) {
      console.error("WebGL not supported")
      return
    }

    gl.clearColor(0, 0, 0, 0)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main(void) {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment shader with alpha
    const fragmentShaderSource = `
      #ifdef GL_ES
      precision mediump float;
      #endif

      uniform vec2 u_resolution;
      uniform float u_millis;
      uniform int u_particles;
      uniform float u_energy;
      uniform float u_blobiness;
      uniform float u_brightness;
      uniform float u_offset;

      float rand(vec2 co) {
        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main(void) {
        vec2 pixel = (gl_FragCoord.xy / u_resolution.x);
        float t = (u_millis + u_offset) * 0.001 * u_energy;
        float a = 0.0, b = 0.0, c = 0.0;
        vec2 particle;
        vec2 center = vec2(0.5, 0.5 * (u_resolution.y / u_resolution.x));
        float na, nb, nc, nd, d;
        float size = float(u_particles);
        float step = 1.0 / size;
        float n = step;

        for (int i = 0; i < 50; i++) {
          if (i >= u_particles) break;
          vec2 np = vec2(n, 0.0);
          na = rand(np * 1.1);
          nb = rand(np * 2.8);
          nc = rand(np * 0.7);
          nd = rand(np * 3.2);
          particle = center;
          particle.x += sin(t * na) * cos(t * nb) * 0.6;
          particle.y += cos(t * nc) * sin(t * nd) * 0.4;
          d = pow(1.2 * na / length(particle - pixel), u_blobiness);
          if (float(i) < size * 0.3333) {
            a += d;
          } else if (float(i) < size * 0.6666) {
            b += d;
          } else {
            c += d;
          }
          n += step;
        }

        vec3 col = vec3(a*c, b*c, a*b) * 0.0001 * u_brightness;
 
        float alpha = clamp(length(col) * 5.0, 0.0, 1.0);

        gl_FragColor = vec4(col, alpha);
      }
    `

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader))
        return null
      }
      return shader
    }

    const createProgram = (vs: WebGLShader, fs: WebGLShader) => {
      const program = gl.createProgram()!
      gl.attachShader(program, vs)
      gl.attachShader(program, fs)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program))
        return null
      }
      return program
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource)!
    const fragmentShader = createShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    )!
    const program = createProgram(vertexShader, fragmentShader)!
    gl.useProgram(program)

    const geometryBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, geometryBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    )

    const positionLoc = gl.getAttribLocation(program, "a_position")
    const uniforms = {
      resolution: gl.getUniformLocation(program, "u_resolution"),
      millis: gl.getUniformLocation(program, "u_millis"),
      particles: gl.getUniformLocation(program, "u_particles"),
      energy: gl.getUniformLocation(program, "u_energy"),
      blobiness: gl.getUniformLocation(program, "u_blobiness"),
      brightness: gl.getUniformLocation(program, "u_brightness"),
      offset: gl.getUniformLocation(program, "u_offset"),
    }

    const resize = () => {
      const displayWidth = canvas.clientWidth
      const displayHeight = canvas.clientHeight
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth
        canvas.height = displayHeight
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const draw = (now: number) => {
      resize()
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.bindBuffer(gl.ARRAY_BUFFER, geometryBuffer)
      gl.enableVertexAttribArray(positionLoc)
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
      gl.uniform1f(uniforms.millis, now)
      gl.uniform1i(uniforms.particles, particles)
      gl.uniform1f(uniforms.energy, energy)
      gl.uniform1f(uniforms.blobiness, blobiness)
      gl.uniform1f(uniforms.brightness, brightness)
      gl.uniform1f(uniforms.offset, offset)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      animationRef.current = requestAnimationFrame(draw)
    }

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [particles, energy, blobiness, brightness, offset])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width,
        height,
        display: "block",
      }}
    />
  )
}

export { WebGLBlob }
