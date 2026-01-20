import { RGB } from '../types';

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

/**
 * Programmatically generated palettes with uniform RGB distribution
 */
export const GENERATED_PALETTES = {
  // 32-color palette (4x4x2 RGB uniform distribution)
  'retro-32': generateUniformPalette(4, 4, 2),

  // 64-color palette (4x4x4 RGB uniform distribution)
  'retro-64': generateUniformPalette(4, 4, 4),

  // 256-color palette (8x8x4 RGB uniform distribution)
  'retro-256': generateUniformPalette(8, 8, 4),
};
