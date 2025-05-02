declare module 'dom-to-image-more' {
  interface DomToImageOptions {
    quality?: number;
    bgcolor?: string;
    style?: {
      transform?: string;
      transformOrigin?: string;
      width?: string;
      height?: string;
    };
  }

  export function toPng(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
  export function toJpeg(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
  export function toBlob(node: HTMLElement, options?: DomToImageOptions): Promise<Blob>;
  export function toPixelData(node: HTMLElement, options?: DomToImageOptions): Promise<number[]>;

  export default {
    toPng,
    toJpeg,
    toBlob,
    toPixelData,
  };
} 