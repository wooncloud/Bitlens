import { RGB, PaletteType } from '../types';
import { BASIC_PALETTES } from './basic';
import { GENERATED_PALETTES } from './generated';
import { CUSTOM_PALETTES } from './custom';
import { COMMUNITY_PALETTES } from './community';

/**
 * All color palettes combined
 */
export const PALETTES: Record<PaletteType, RGB[]> = {
  ...BASIC_PALETTES,
  ...CUSTOM_PALETTES,
  ...GENERATED_PALETTES,
  ...COMMUNITY_PALETTES,
};

/**
 * Find the closest color in a palette using Euclidean distance
 */
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
