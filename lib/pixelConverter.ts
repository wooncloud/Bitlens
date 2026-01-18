import { ConversionOptions, RGB } from './types';
import { PALETTES, findClosestColor } from './palettes';

export class PixelConverter {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    const ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }
    this.ctx = ctx;
    // Disable image smoothing for pixelated effect
    this.ctx.imageSmoothingEnabled = false;
  }

  /**
   * Convert an image to pixelated version with palette mapping
   */
  async convertImage(
    imageFile: File,
    options: ConversionOptions
  ): Promise<string> {
    const img = await this.loadImage(imageFile);

    // Step 1: Downscale to target resolution
    const downscaled = this.downscale(img, options.resolution);

    // Step 2: Apply palette mapping
    const pixelated = this.applyPalette(downscaled, options.palette);

    return pixelated;
  }

  /**
   * Load image from file
   */
  private loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Downscale image to target resolution while maintaining aspect ratio
   */
  private downscale(img: HTMLImageElement, targetSize: number): ImageData {
    const aspectRatio = img.width / img.height;
    let width: number, height: number;

    if (aspectRatio > 1) {
      // Landscape
      width = targetSize;
      height = Math.round(targetSize / aspectRatio);
    } else {
      // Portrait or square
      height = targetSize;
      width = Math.round(targetSize * aspectRatio);
    }

    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx.drawImage(img, 0, 0, width, height);
    return this.ctx.getImageData(0, 0, width, height);
  }

  /**
   * Apply color palette to image data
   */
  private applyPalette(imageData: ImageData, paletteType: string): string {
    const palette = PALETTES[paletteType as keyof typeof PALETTES];
    const data = imageData.data;

    // Map each pixel to closest palette color
    for (let i = 0; i < data.length; i += 4) {
      const color: RGB = {
        r: data[i],
        g: data[i + 1],
        b: data[i + 2],
      };

      const closestColor = findClosestColor(color, palette);

      data[i] = closestColor.r;
      data[i + 1] = closestColor.g;
      data[i + 2] = closestColor.b;
      // Keep alpha channel (data[i + 3]) unchanged
    }

    // Put the modified data back
    this.ctx.putImageData(imageData, 0, 0);

    // Return data URL
    return this.canvas.toDataURL('image/png');
  }

  /**
   * Upscale pixelated image for high-quality download (1080px)
   */
  async upscaleForDownload(dataUrl: string, targetSize: number = 1080): Promise<string> {
    const img = await this.loadImageFromDataUrl(dataUrl);

    const aspectRatio = img.width / img.height;
    let width: number, height: number;

    if (aspectRatio > 1) {
      width = targetSize;
      height = Math.round(targetSize / aspectRatio);
    } else {
      height = targetSize;
      width = Math.round(targetSize * aspectRatio);
    }

    // Create new canvas for upscaled image
    const upscaleCanvas = document.createElement('canvas');
    upscaleCanvas.width = width;
    upscaleCanvas.height = height;

    const upscaleCtx = upscaleCanvas.getContext('2d');
    if (!upscaleCtx) {
      throw new Error('Failed to get canvas context');
    }

    // Use nearest-neighbor scaling for crisp pixels
    upscaleCtx.imageSmoothingEnabled = false;
    upscaleCtx.drawImage(img, 0, 0, width, height);

    return upscaleCanvas.toDataURL('image/png');
  }

  /**
   * Load image from data URL
   */
  private loadImageFromDataUrl(dataUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = dataUrl;
    });
  }
}
