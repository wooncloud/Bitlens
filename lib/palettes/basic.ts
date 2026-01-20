import { RGB } from '../types';

/**
 * Basic retro palettes - Classic grayscale and Game Boy
 */
export const BASIC_PALETTES = {
  // Classic 4-level grayscale (Game Boy style without green tint)
  'classic-grey': [
    { r: 15, g: 15, b: 15 },      // Dark grey
    { r: 85, g: 85, b: 85 },      // Medium-dark grey
    { r: 170, g: 170, b: 170 },   // Medium-light grey
    { r: 240, g: 240, b: 240 },   // Light grey
  ] as RGB[],

  // Game Boy Classic - Original greenish LCD screen
  'gameboy': [
    { r: 4, g: 12, b: 6 },        // #040c06
    { r: 17, g: 35, b: 24 },      // #112318
    { r: 30, g: 58, b: 41 },      // #1e3a29
    { r: 48, g: 93, b: 66 },      // #305d42
    { r: 77, g: 128, b: 97 },     // #4d8061
    { r: 137, g: 162, b: 87 },    // #89a257
    { r: 190, g: 220, b: 127 },   // #bedc7f
    { r: 238, g: 255, b: 204 },   // #eeffcc
  ] as RGB[],
};
