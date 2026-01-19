import { DitheringLevel } from '@/lib/types';

interface DitheringSelectorProps {
  value: DitheringLevel;
  onChange: (level: DitheringLevel) => void;
}

interface DitheringOption {
  value: DitheringLevel;
  label: string;
}

const DITHERING_OPTIONS: DitheringOption[] = [
  { value: 'none', label: 'None' },
  { value: 'low', label: 'Low' },
  { value: 'high', label: 'High' },
];

export default function DitheringSelector({ value, onChange }: DitheringSelectorProps) {
  return (
    <div className="nes-container is-rounded with-title mb-6">
      <p className="title text-xs">Dithering</p>
      <div className="space-y-3">
        {DITHERING_OPTIONS.map((option) => (
          <label key={option.value} className="flex items-center cursor-pointer">
            <input
              type="radio"
              className="nes-radio"
              name="dithering"
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
