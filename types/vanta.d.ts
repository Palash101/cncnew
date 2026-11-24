declare module "vanta/dist/vanta.net.min" {
  type VantaEffect = { destroy: () => void; resize?: () => void };
  type VantaNetOptions = {
    el: HTMLElement;
    THREE: unknown;
    color?: number;
    backgroundColor?: number;
    backgroundAlpha?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    showDots?: boolean;
    scale?: number;
    scaleMobile?: number;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
  };
  const NET: (options: VantaNetOptions) => VantaEffect;
  export default NET;
}

declare module "vanta/dist/vanta.birds.min" {
  type VantaEffect = { destroy: () => void; resize?: () => void };
  type VantaBirdsOptions = {
    el: HTMLElement;
    THREE: unknown;
    backgroundColor?: number;
    backgroundAlpha?: number;
    color1?: number;
    color2?: number;
    colorMode?: "lerp" | "variance" | "lerpGradient" | "varianceGradient";
    birdSize?: number;
    wingSpan?: number;
    speedLimit?: number;
    separation?: number;
    alignment?: number;
    cohesion?: number;
    quantity?: number;
    scale?: number;
    scaleMobile?: number;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
  };
  const BIRDS: (options: VantaBirdsOptions) => VantaEffect;
  export default BIRDS;
}
