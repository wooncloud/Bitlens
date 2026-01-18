import { RGB, PaletteType } from './types';

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

  // NES / Famicom - 8-bit primary colors
  'nes': [
    { r: 0, g: 0, b: 0 },         // Black
    { r: 255, g: 255, b: 255 },   // White
    { r: 255, g: 0, b: 0 },       // Red
    { r: 0, g: 0, b: 255 },       // Blue
    { r: 255, g: 255, b: 0 },     // Yellow
    { r: 0, g: 255, b: 0 },       // Green
    { r: 255, g: 0, b: 255 },     // Magenta
    { r: 0, g: 255, b: 255 },     // Cyan
  ],

  // Cyberpunk Night - 16-bit neon aesthetics
  'cyberpunk': [
    { r: 0, g: 0, b: 0 },         // Black
    { r: 45, g: 27, b: 78 },      // Dark purple - #2d1b4e
    { r: 138, g: 43, b: 226 },    // Bright purple
    { r: 255, g: 0, b: 255 },     // Magenta - #ff00ff
    { r: 0, g: 255, b: 255 },     // Cyan - #00ffff
    { r: 255, g: 128, b: 0 },     // Orange - #ff8000
    { r: 255, g: 255, b: 0 },     // Yellow - #ffff00
    { r: 255, g: 20, b: 147 },    // Deep pink
    { r: 57, g: 255, b: 20 },     // Neon green
    { r: 255, g: 255, b: 255 },   // White
  ],

  // Vaporwave - Dreamy pastel aesthetics
  'vaporwave': [
    { r: 255, g: 113, b: 206 },   // Pink - #ff71ce
    { r: 1, g: 205, b: 254 },     // Sky blue - #01cdfe
    { r: 5, g: 255, b: 161 },     // Mint green - #05ffa1
    { r: 185, g: 103, b: 255 },   // Purple - #b967ff
    { r: 255, g: 251, b: 150 },   // Yellow - #fffb96
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
