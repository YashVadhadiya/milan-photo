import { useState } from 'react';
import { PRESET_TAGS } from '../constants';

interface Props {
  daysCount: number;
  selectedLabels: string[];
  onAdd: (label: string) => void;
}

export default function EventDays({ daysCount, selectedLabels, onAdd }: Props) {
  const [custom, setCustom] = useState('');
  const selectedSet = new Set(selectedLabels.map((label) => label.trim().toLowerCase()));

  const handleAdd = () => {
    if (custom.trim()) {
      onAdd(custom.trim());
      setCustom('');
    } else {
      onAdd(`Day ${daysCount + 1}`);
    }
  };

  return (
    <div className="bg-white/90 rounded-lg shadow-sm border border-[#ded5bf] p-5 sm:p-6 mb-5 backdrop-blur">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-[#263128]">Event Days</h2>
        <span className="rounded-full bg-[#f7f1e3] px-3 py-1 text-xs font-semibold text-[#8a8b55]">
          {daysCount} added
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {PRESET_TAGS.map((tag) => {
          const selected = selectedSet.has(tag.toLowerCase());

          return (
            <button
              key={tag}
              onClick={() => !selected && onAdd(tag)}
              disabled={selected}
              className={`px-3 py-1.5 min-h-[36px] border rounded-full text-sm font-medium transition ${
                selected
                  ? 'border-[#8a8b55] bg-[#eef1dd] text-[#263128] cursor-default shadow-sm'
                  : 'border-[#ded5bf] bg-[#fbfaf7] text-[#263128] hover:border-[#b99a5b] hover:bg-[#f7f1e3] active:bg-[#eee3c8]'
              }`}
            >
              {selected ? '✓' : '+'} {tag}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Type custom day label..."
          className="flex-1 px-3.5 py-2.5 min-h-[44px] border border-[#d8d1c0] rounded-lg bg-[#fbfaf7] text-sm text-[#263128] placeholder:text-[#a2a696] focus:ring-2 focus:ring-[#b99a5b]/30 focus:border-[#b99a5b] outline-none transition"
        />
        <button
          onClick={handleAdd}
          className="px-5 py-2.5 bg-[#263128] text-white rounded-lg text-sm font-semibold hover:bg-[#344236] transition min-h-[44px] flex items-center"
        >
          Add Day
        </button>
      </div>
    </div>
  );
}
