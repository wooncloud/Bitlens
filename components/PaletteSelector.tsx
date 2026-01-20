import { PaletteType } from '@/lib/types';

interface PaletteSelectorProps {
  value: PaletteType;
  onChange: (palette: PaletteType) => void;
}

interface PaletteOption {
  value: PaletteType;
  label: string;
}

const PALETTE_OPTIONS: PaletteOption[] = [
  { value: 'classic-grey', label: 'Classic Grey' },
  { value: 'gameboy', label: 'Game Boy' },
  { value: 'retro-29', label: '29 Retro' },
  { value: 'lospec-500', label: 'LOSPEC 500' },
  { value: 'retro-32', label: '32 Colors' },
  { value: 'retro-64', label: '64 Colors' },
  { value: 'retro-256', label: '256 Colors' },
  { value: 'lost-century', label: 'Lost Century' },
  { value: 'slso8', label: 'SLSO8' },
  { value: 'vinik24', label: 'VINIK24' },
  { value: 'nature-31', label: 'Nature 31' },
  { value: 'justparchment8', label: 'Just Parchment 8' },
  { value: 'aap-64', label: 'AAP-64' },
  { value: 'oil-6', label: 'Oil 6' },
  { value: 'waldgeist', label: 'Waldgeist' },
  { value: 'steam-lords', label: 'Steam Lords' },
  { value: 'apollo', label: 'Apollo' },
  { value: 'cl8uds', label: 'CL8UDS' },
  { value: 'blk-nx64', label: 'BLK NX64' },
];

export default function PaletteSelector({ value, onChange }: PaletteSelectorProps) {
  return (
    <div className="nes-container is-rounded with-title mb-6">
      <p className="title text-xs">Palette</p>
      <div className="space-y-3">
        {PALETTE_OPTIONS.map((option) => (
          <label key={option.value} className="flex items-center cursor-pointer">
            <input
              type="radio"
              className="nes-radio"
              name="palette"
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="text-xs ml-2">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
