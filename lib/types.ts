export type Resolution = 64 | 128 | 256;

export type PaletteType = 'classic-grey' | 'gameboy' | 'nes' | 'cyberpunk' | 'vaporwave';

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ConversionOptions {
  resolution: Resolution;
  palette: PaletteType;
}
