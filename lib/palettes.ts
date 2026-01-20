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
    { r: 4, g: 12, b: 6 },        // #040c06
    { r: 17, g: 35, b: 24 },      // #112318
    { r: 30, g: 58, b: 41 },      // #1e3a29
    { r: 48, g: 93, b: 66 },      // #305d42
    { r: 77, g: 128, b: 97 },     // #4d8061
    { r: 137, g: 162, b: 87 },    // #89a257
    { r: 190, g: 220, b: 127 },   // #bedc7f
    { r: 238, g: 255, b: 204 },   // #eeffcc
  ],

  // 29-color retro palette
  'retro-29': [
    { r: 242, g: 240, b: 229 },   // #f2f0e5
    { r: 184, g: 181, b: 185 },   // #b8b5b9
    { r: 134, g: 129, b: 136 },   // #868188
    { r: 100, g: 99, b: 101 },    // #646365
    { r: 69, g: 68, b: 79 },      // #45444f
    { r: 58, g: 56, b: 88 },      // #3a3858
    { r: 33, g: 33, b: 35 },      // #212123
    { r: 53, g: 43, b: 66 },      // #352b42
    { r: 67, g: 67, b: 106 },     // #43436a
    { r: 75, g: 128, b: 202 },    // #4b80ca
    { r: 104, g: 194, b: 211 },   // #68c2d3
    { r: 162, g: 220, b: 199 },   // #a2dcc7
    { r: 237, g: 225, b: 158 },   // #ede19e
    { r: 211, g: 160, b: 104 },   // #d3a068
    { r: 180, g: 82, b: 82 },     // #b45252
    { r: 106, g: 83, b: 110 },    // #6a536e
    { r: 75, g: 65, b: 88 },      // #4b4158
    { r: 128, g: 73, b: 58 },     // #80493a
    { r: 167, g: 123, b: 91 },    // #a77b5b
    { r: 229, g: 206, b: 180 },   // #e5ceb4
    { r: 194, g: 211, b: 104 },   // #c2d368
    { r: 138, g: 176, b: 96 },    // #8ab060
    { r: 86, g: 123, b: 121 },    // #567b79
    { r: 78, g: 88, b: 74 },      // #4e584a
    { r: 123, g: 114, b: 67 },    // #7b7243
    { r: 178, g: 180, b: 126 },   // #b2b47e
    { r: 237, g: 200, b: 196 },   // #edc8c4
    { r: 207, g: 138, b: 203 },   // #cf8acb
    { r: 95, g: 85, b: 106 },     // #5f556a
  ],

  // LOSPEC 500 palette (42 colors)
  'lospec-500': [
    { r: 16, g: 18, b: 28 },      // #10121c
    { r: 44, g: 30, b: 49 },      // #2c1e31
    { r: 107, g: 38, b: 67 },     // #6b2643
    { r: 172, g: 40, b: 71 },     // #ac2847
    { r: 236, g: 39, b: 63 },     // #ec273f
    { r: 148, g: 73, b: 58 },     // #94493a
    { r: 222, g: 93, b: 58 },     // #de5d3a
    { r: 233, g: 133, b: 55 },    // #e98537
    { r: 243, g: 168, b: 51 },    // #f3a833
    { r: 77, g: 53, b: 51 },      // #4d3533
    { r: 110, g: 76, b: 48 },     // #6e4c30
    { r: 162, g: 109, b: 63 },    // #a26d3f
    { r: 206, g: 146, b: 72 },    // #ce9248
    { r: 218, g: 177, b: 99 },    // #dab163
    { r: 232, g: 210, b: 130 },   // #e8d282
    { r: 247, g: 243, b: 183 },   // #f7f3b7
    { r: 30, g: 64, b: 68 },      // #1e4044
    { r: 0, g: 101, b: 84 },      // #006554
    { r: 38, g: 133, b: 76 },     // #26854c
    { r: 90, g: 181, b: 82 },     // #5ab552
    { r: 157, g: 230, b: 78 },    // #9de64e
    { r: 0, g: 139, b: 139 },     // #008b8b
    { r: 98, g: 164, b: 119 },    // #62a477
    { r: 166, g: 203, b: 150 },   // #a6cb96
    { r: 211, g: 238, b: 211 },   // #d3eed3
    { r: 62, g: 59, b: 101 },     // #3e3b65
    { r: 56, g: 89, b: 179 },     // #3859b3
    { r: 51, g: 136, b: 222 },    // #3388de
    { r: 54, g: 197, b: 244 },    // #36c5f4
    { r: 110, g: 234, b: 214 },   // #6dead6
    { r: 94, g: 91, b: 140 },     // #5e5b8c
    { r: 140, g: 120, b: 165 },   // #8c78a5
    { r: 176, g: 167, b: 184 },   // #b0a7b8
    { r: 222, g: 206, b: 237 },   // #deceed
    { r: 154, g: 77, b: 118 },    // #9a4d76
    { r: 200, g: 120, b: 175 },   // #c878af
    { r: 204, g: 153, b: 255 },   // #cc99ff
    { r: 250, g: 110, b: 121 },   // #fa6e79
    { r: 255, g: 162, b: 172 },   // #ffa2ac
    { r: 255, g: 209, b: 213 },   // #ffd1d5
    { r: 246, g: 232, b: 224 },   // #f6e8e0
    { r: 255, g: 255, b: 255 },   // #ffffff
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
