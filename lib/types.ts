export type Resolution = 64 | 128 | 256;

export type PaletteType = 'classic-grey' | 'greenish' | 'cyberpunk' | 'nostalgia';

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ConversionOptions {
  resolution: Resolution;
  palette: PaletteType;
}
