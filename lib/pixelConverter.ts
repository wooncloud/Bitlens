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
    const { img, cleanup } = await this.loadImage(imageFile);

    try {
      // Step 1: Downscale to target resolution
      const downscaled = this.downscale(img, options.resolution);

      // Step 2: Apply palette mapping
      const pixelated = this.applyPalette(downscaled, options.palette);

      return pixelated;
    } finally {
      // Cleanup to prevent memory leak
      cleanup();
    }
  }

  /**
   * Load image from file with cleanup function
   */
  private loadImage(file: File): Promise<{ img: HTMLImageElement; cleanup: () => void }> {
    return new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        resolve({
          img,
          cleanup: () => URL.revokeObjectURL(objectUrl),
        });
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Failed to load image'));
      };
      img.src = objectUrl;
    });
  }

  /**
   * Calculate dimensions while maintaining aspect ratio
   */
  private calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    targetSize: number
  ): { width: number; height: number } {
    const aspectRatio = originalWidth / originalHeight;

    if (aspectRatio > 1) {
      // Landscape
      return {
        width: targetSize,
        height: Math.round(targetSize / aspectRatio),
      };
    } else {
      // Portrait or square
      return {
        width: Math.round(targetSize * aspectRatio),
        height: targetSize,
      };
    }
  }

  /**
   * Downscale image to target resolution while maintaining aspect ratio
   */
  private downscale(img: HTMLImageElement, targetSize: number): ImageData {
    const { width, height } = this.calculateDimensions(img.width, img.height, targetSize);

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
    const { width, height } = this.calculateDimensions(img.width, img.height, targetSize);

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
