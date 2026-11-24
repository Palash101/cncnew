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

declare module "vanta/dist/vanta.clouds.min" {
  type VantaEffect = { destroy: () => void; resize?: () => void };
  type VantaCloudsOptions = {
    el: HTMLElement;
    THREE: unknown;
    backgroundColor?: number;
    skyColor?: number;
    cloudColor?: number;
    cloudShadowColor?: number;
    sunColor?: number;
    sunGlareColor?: number;
    sunlightColor?: number;
    speed?: number;
    scale?: number;
    scaleMobile?: number;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
  };
  const CLOUDS: (options: VantaCloudsOptions) => VantaEffect;
  export default CLOUDS;
}
