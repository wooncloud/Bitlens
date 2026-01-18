import { RGB, PaletteType } from './types';

// Color palettes for retro effects
export const PALETTES: Record<PaletteType, RGB[]> = {
  'classic-grey': [
    { r: 15, g: 15, b: 15 },      // Dark grey
    { r: 85, g: 85, b: 85 },      // Medium-dark grey
    { r: 170, g: 170, b: 170 },   // Medium-light grey
    { r: 240, g: 240, b: 240 },   // Light grey
  ],

  'greenish': [
    { r: 15, g: 56, b: 15 },      // Dark green
    { r: 48, g: 98, b: 48 },      // Medium-dark green
    { r: 139, g: 172, b: 15 },    // Medium-light green
    { r: 155, g: 188, b: 15 },    // Light green
  ],

  'cyberpunk': [
    { r: 0, g: 0, b: 0 },         // Black
    { r: 41, g: 24, b: 56 },      // Dark purple
    { r: 138, g: 43, b: 226 },    // Bright purple
    { r: 255, g: 0, b: 255 },     // Magenta
    { r: 0, g: 255, b: 255 },     // Cyan
    { r: 255, g: 20, b: 147 },    // Deep pink
    { r: 57, g: 255, b: 20 },     // Neon green
    { r: 255, g: 255, b: 255 },   // White
  ],

  'nostalgia': [
    { r: 44, g: 33, b: 21 },      // Dark brown
    { r: 99, g: 74, b: 47 },      // Medium brown
    { r: 160, g: 134, b: 98 },    // Light brown
    { r: 214, g: 196, b: 168 },   // Beige
    { r: 194, g: 133, b: 105 },   // Dusty rose
    { r: 142, g: 124, b: 108 },   // Grey-brown
  ],
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
