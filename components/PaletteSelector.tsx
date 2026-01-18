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
  { value: 'retro-32', label: '32 Colors' },
  { value: 'retro-64', label: '64 Colors' },
  { value: 'retro-256', label: '256 Colors' },
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
