import { useState } from 'react';
import { PRESET_TAGS } from '../constants';

interface Props {
  daysCount: number;
  onAdd: (label: string) => void;
}

export default function EventDays({ daysCount, onAdd }: Props) {
  const [custom, setCustom] = useState('');

  const handleAdd = () => {
    if (custom.trim()) {
      onAdd(custom.trim());
      setCustom('');
    } else {
      onAdd(`Day ${daysCount + 1}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Event Days</h2>

      <p className="text-sm text-gray-500 mb-3">Click a preset tag or type a custom label:</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {PRESET_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => onAdd(tag)}
            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 active:bg-gray-300 transition"
          >
            + {tag}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Type custom day label..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          Add Day
        </button>
      </div>
    </div>
  );
}
