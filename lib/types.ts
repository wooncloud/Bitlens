export type Resolution = 64 | 128 | 256;

export type PaletteType =
  | 'classic-grey'
  | 'gameboy'
  | 'retro-29'
  | 'lospec-500'
  | 'retro-32'
  | 'retro-64'
  | 'retro-256'
  | 'lost-century'
  | 'slso8'
  | 'vinik24'
  | 'nature-31'
  | 'justparchment8'
  | 'aap-64'
  | 'oil-6'
  | 'waldgeist'
  | 'steam-lords'
  | 'apollo'
  | 'cl8uds'
  | 'blk-nx64';

export type DitheringLevel = 'none' | 'low' | 'high';

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ConversionOptions {
  resolution: Resolution;
  palette: PaletteType;
  dithering: DitheringLevel;
}
