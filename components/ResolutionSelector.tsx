import { Resolution } from '@/lib/types';

interface ResolutionSelectorProps {
  value: Resolution;
  onChange: (resolution: Resolution) => void;
}

const RESOLUTIONS: Resolution[] = [64, 128, 256];

export default function ResolutionSelector({ value, onChange }: ResolutionSelectorProps) {
  return (
    <div className="nes-container is-rounded with-title mb-6">
      <p className="title text-xs">Resolution</p>
      <div className="space-y-3">
        {RESOLUTIONS.map((res) => (
          <label key={res} className="flex items-center cursor-pointer">
            <input
              type="radio"
              className="nes-radio"
              name="resolution"
              checked={value === res}
              onChange={() => onChange(res)}
            />
            <span className="text-xs ml-2">{res}px</span>
          </label>
        ))}
      </div>
    </div>
  );
}
