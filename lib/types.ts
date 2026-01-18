export type Resolution = 64 | 128 | 256;

export type PaletteType = 'classic-grey' | 'gameboy' | 'retro-32' | 'retro-64' | 'retro-256';

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ConversionOptions {
  resolution: Resolution;
  palette: PaletteType;
}
