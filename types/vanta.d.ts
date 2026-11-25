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

declare module "vanta/dist/vanta.cells.min" {
  type VantaEffect = { destroy: () => void; resize?: () => void };
  type VantaCellsOptions = {
    el: HTMLElement;
    THREE: unknown;
    color1?: number;
    color2?: number;
    backgroundColor?: number;
    amplitudeFactor?: number;
    ringFactor?: number;
    rotationFactor?: number;
    size?: number;
    speed?: number;
    scale?: number;
    scaleMobile?: number;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
  };
  const CELLS: (options: VantaCellsOptions) => VantaEffect;
  export default CELLS;
}
