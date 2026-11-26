"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   Hero background: one full-bleed WebGL canvas, drawn in the brand colours.

   - Two sheets of fine light threads twist like silk along the bottom and
     climb the left and right edges, so they frame the copy instead of
     crossing it.
   - Slow fog glows behind the threads; small specks drift upward.
   - The middle of the hero is dimmed, so text always sits on a calm surface.
   - The threads brighten near the mouse.

   Stops drawing when paused, off screen or in a hidden tab. With reduced
   motion it draws one still frame. Without WebGL a plain CSS glow shows.
   ───────────────────────────────────────────────────────────── */

export type HeroBackgroundColors = {
  night: string; // base
  brand: string; // fog + threads
  soft: string; // lighter brand
  accent: string; // thread highlights + specks
};

const MAX_THREADS = 20;
const INTRO_SECONDS = 2.6;
const MAX_PIXELS = 2_400_000; // keeps 4K screens cheap

const VERTEX = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uNight;
uniform vec3 uBrand;
uniform vec3 uSoft;
uniform vec3 uAccent;
uniform vec3 uPointer;
uniform float uReveal;
uniform float uThreads;
out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float sum = 0.0;
  float gain = 0.5;
  for (int i = 0; i < 4; i++) {
    sum += gain * noise(p);
    p = mat2(0.8, -0.6, 0.6, 0.8) * p * 2.03 + 11.7;
    gain *= 0.5;
  }
  return sum;
}

// A sheet of fine light threads. The sheet twists, so the threads cross over each other.
vec3 sheet(vec2 p, float t, float base, float seed, float spread, vec3 from, vec3 to) {
  float x = p.x;
  // Bowl shape: low in the middle, rising toward the left and right edges
  float centre = base + 0.5 * x * x
    + 0.085 * sin(x * 1.5 + t * 0.31 + seed)
    + 0.04 * sin(x * 3.3 - t * 0.23 + seed * 1.7);
  float twist = sin(x * 1.9 + t * 0.19 + seed * 2.3);
  float px = 1.0 / uRes.y;
  vec3 sum = vec3(0.0);
  for (int i = 0; i < ${MAX_THREADS}; i++) {
    if (float(i) >= uThreads) break;
    float f = float(i) / (uThreads - 1.0);
    float y = centre
      + (f - 0.5) * spread * (twist + 0.25 * sin(x * 4.1 + f * 5.0 - t * 0.4 + seed))
      + 0.01 * sin(x * 6.0 + f * 12.0 + t * 0.7);
    float d = abs(p.y - y);
    float core = smoothstep(1.6 * px, 0.0, d);
    float halo = 0.0012 / (d + 0.004);
    // Light travelling along each thread
    float pulse = 0.55 + 0.45 * sin(x * 2.4 - t * 0.9 + f * 7.0 + seed);
    sum += mix(from, to, f) * (core * 0.6 + halo) * pulse;
  }
  return sum;
}

// Small twinkling specks drifting upward
float dust(vec2 p, float t, float scale, float seed) {
  vec2 q = p * scale + vec2(seed, -t * 0.35);
  vec2 id = floor(q);
  vec2 f = fract(q) - 0.5;
  float h = hash(id + seed);
  vec2 offset = (vec2(hash(id + 1.3), hash(id + 7.7)) - 0.5) * 0.6;
  float twinkle = 0.5 + 0.5 * sin(t * (2.0 + h * 4.0) + h * 40.0);
  return smoothstep(0.03 + 0.035 * h, 0.0, length(f - offset)) * twinkle * step(0.6, h);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 p = (frag - 0.5 * uRes) / uRes.y;
  // On tall (phone) screens stretch x, so the waves keep their shape
  float widen = clamp(1.3 * uRes.y / uRes.x, 1.0, 2.4);
  vec2 q = vec2(p.x * widen, p.y);
  float t = uTime;

  // Fog: warped noise, strongest along the bottom and in the top corners
  vec2 warp = vec2(
    fbm(q * 1.4 + vec2(t * 0.05, -t * 0.03)),
    fbm(q * 1.4 + vec2(5.2 - t * 0.04, 1.3 + t * 0.05))
  );
  float n = fbm(q * 1.1 + warp * 1.2 + vec2(0.0, -t * 0.04));
  float low = smoothstep(0.2, -0.6, p.y - 0.25 * q.x * q.x);
  float high = smoothstep(0.0, 0.7, p.y) * smoothstep(0.2, 1.0, abs(q.x));
  vec3 light = uBrand * low * (0.3 + 3.2 * n * n);
  light += uSoft * high * n * 0.45;

  // Threads rise into place during the intro and brighten near the mouse
  float lift = (uReveal - 1.0) * 0.2;
  vec2 away = p - uPointer.xy;
  float reach = uPointer.z * exp(-dot(away, away) / 0.045);
  vec3 threads = sheet(q, t, -0.37 + lift, 0.0, 0.26, uBrand, uAccent)
    + sheet(q, t * 0.8 + 40.0, -0.42 + lift, 2.6, 0.2, uSoft, uBrand) * 0.7;
  light += threads * 0.8 * (1.0 + 1.4 * reach);
  light += uAccent * reach * 0.05;

  float specks = dust(p, t, 13.0, 1.7) + dust(p, t * 0.7, 24.0, 9.1) * 0.6;
  light += mix(uAccent, vec3(1.0), 0.5) * specks * 0.5;

  // Calm zone behind the copy
  float calm = mix(0.25, 1.0, smoothstep(0.5, 1.3, length((p - vec2(0.0, -0.06)) / vec2(0.74, 0.44))));
  light *= calm * uReveal;
  light = 1.0 - exp(-light * 1.3);

  vec3 col = uNight + light * (1.0 - uNight);
  col *= 1.0 - 0.3 * smoothstep(0.45, 1.1, length(p * vec2(0.75, 1.0)));
  col *= 1.0 - 0.25 * smoothstep(0.3, 0.5, p.y); // darker under the navbar
  col += (hash(frag) - 0.5) / 255.0; // dither: no banding in the dark gradients
  outColor = vec4(col, 1.0);
}`;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const hexToRgb = (hex: string): [number, number, number] => {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? [...value].map((c) => c + c).join("") : value;
  const int = Number.parseInt(full, 16);
  if (Number.isNaN(int)) return [0, 0, 0];
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
};

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  console.warn("HeroBackground shader:", gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
};

export default function HeroBackground({ colors, paused = false }: { colors: HeroBackgroundColors; paused?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wakeRef = useRef<(() => void) | null>(null);
  const settings = { colors, paused };
  const settingsRef = useRef(settings);
  useLayoutEffect(() => {
    settingsRef.current = settings;
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, depth: false, stencil: false });
    const vertex = gl && compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fragment = gl && compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl && vertex && fragment ? gl.createProgram() : null;
    if (gl && program && vertex && fragment) {
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.bindAttribLocation(program, 0, "aPosition");
      gl.linkProgram(program);
    }
    if (!gl || !program || !gl.getProgramParameter(program, gl.LINK_STATUS)) {
      container.dataset.fallback = "true"; // CSS glow instead
      return undefined;
    }

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const u = {
      res: uniform("uRes"),
      time: uniform("uTime"),
      night: uniform("uNight"),
      brand: uniform("uBrand"),
      soft: uniform("uSoft"),
      accent: uniform("uAccent"),
      pointer: uniform("uPointer"),
      reveal: uniform("uReveal"),
      threads: uniform("uThreads"),
    };

    const buffer = gl.createBuffer();
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const view = { width: 1, height: 1 };
    const pointer = { x: 0, y: 0, inside: false };
    const state = {
      clock: reduce ? 24 : 0, // reduced motion: one settled frame
      px: 0,
      py: 0,
      reach: 0,
      reveal: reduce ? 1 : 0,
    };
    let raf = 0;
    let last = 0;
    let visible = true;

    const render = () => {
      const { colors: c } = settingsRef.current;
      const eased = 1 - Math.pow(1 - state.reveal, 3);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform1f(u.time, state.clock);
      gl.uniform3fv(u.night, hexToRgb(c.night));
      gl.uniform3fv(u.brand, hexToRgb(c.brand));
      gl.uniform3fv(u.soft, hexToRgb(c.soft));
      gl.uniform3fv(u.accent, hexToRgb(c.accent));
      gl.uniform3f(u.pointer, state.px, state.py, state.reach);
      gl.uniform1f(u.reveal, eased);
      gl.uniform1f(u.threads, view.width < 768 ? 11 : 18); // fewer threads on phones
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      if (settingsRef.current.paused || reduce) {
        state.reveal = 1;
        render();
        last = 0;
        return;
      }
      const dt = last ? clamp((now - last) / 1000, 0.0005, 0.05) : 1 / 60;
      last = now;
      state.clock += dt;
      state.reveal = Math.min(1, state.reveal + dt / INTRO_SECONDS);
      if (pointer.inside) {
        const follow = 1 - Math.exp(-dt / 0.35);
        state.px += ((pointer.x - view.width / 2) / view.height - state.px) * follow;
        state.py += (0.5 - pointer.y / view.height - state.py) * follow;
      }
      state.reach += ((pointer.inside ? 1 : 0) - state.reach) * (1 - Math.exp(-dt / 0.8));
      render();
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(MAX_PIXELS / (width * height)));
      view.width = width;
      view.height = height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      render();
      wake();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = container.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      const wasInside = pointer.inside;
      pointer.inside = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
      if (pointer.inside && !wasInside) {
        state.px = (pointer.x - rect.width / 2) / rect.height;
        state.py = 0.5 - pointer.y / rect.height;
      }
    };
    const onPointerLeave = () => {
      pointer.inside = false;
    };
    const onVisibility = () => {
      last = 0;
      wake();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const intersection = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) {
        last = 0;
        wake();
      }
    });
    intersection.observe(container);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    resize();

    // Called after every React render: picks up new colours and un-pausing
    wakeRef.current = () => {
      if (!raf) render();
      wake();
    };

    return () => {
      cancelAnimationFrame(raf);
      wakeRef.current = null;
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
      if (!canvas.isConnected) gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  useEffect(() => {
    wakeRef.current?.();
  });

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden data-[fallback=true]:bg-[radial-gradient(120%_65%_at_50%_112%,color-mix(in_srgb,var(--c-brand)_55%,transparent),transparent_72%)]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
