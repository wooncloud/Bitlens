import { RGB, PaletteType } from './types';

/**
 * Generate a palette by uniformly dividing RGB color space
 */
function generateUniformPalette(rSteps: number, gSteps: number, bSteps: number): RGB[] {
  const palette: RGB[] = [];

  for (let r = 0; r < rSteps; r++) {
    for (let g = 0; g < gSteps; g++) {
      for (let b = 0; b < bSteps; b++) {
        palette.push({
          r: Math.round((r * 255) / (rSteps - 1)),
          g: Math.round((g * 255) / (gSteps - 1)),
          b: Math.round((b * 255) / (bSteps - 1)),
        });
      }
    }
  }

  return palette;
}

// Color palettes for retro effects
export const PALETTES: Record<PaletteType, RGB[]> = {
  // Classic 4-level grayscale (Game Boy style without green tint)
  'classic-grey': [
    { r: 15, g: 15, b: 15 },      // Dark grey
    { r: 85, g: 85, b: 85 },      // Medium-dark grey
    { r: 170, g: 170, b: 170 },   // Medium-light grey
    { r: 240, g: 240, b: 240 },   // Light grey
  ],

  // Game Boy Classic - Original greenish LCD screen
  'gameboy': [
    { r: 8, g: 24, b: 32 },       // Darkest - #081820
    { r: 52, g: 104, b: 86 },     // Dark - #346856
    { r: 136, g: 192, b: 112 },   // Light - #88c070
    { r: 224, g: 248, b: 208 },   // Lightest - #e0f8d0
  ],

  // 32-color palette (4x4x2 RGB uniform distribution)
  'retro-32': generateUniformPalette(4, 4, 2),

  // 64-color palette (4x4x4 RGB uniform distribution)
  'retro-64': generateUniformPalette(4, 4, 4),

  // 256-color palette (8x8x4 RGB uniform distribution)
  'retro-256': generateUniformPalette(8, 8, 4),
};

// Find the closest color in a palette using Euclidean distance
export function findClosestColor(color: RGB, palette: RGB[]): RGB {
  let minDistance = Infinity;
  let closestColor = palette[0];

  for (const paletteColor of palette) {
    const distance = Math.sqrt(
      Math.pow(color.r - paletteColor.r, 2) +
      Math.pow(color.g - paletteColor.g, 2) +
      Math.pow(color.b - paletteColor.b, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestColor = paletteColor;
    }
  }

  return closestColor;
}
