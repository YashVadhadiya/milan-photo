import type { EventDay } from '../types';
import PreProductionPanel from './PreProductionPanel';
import PostProductionPanel from './PostProductionPanel';

interface Props {
  day: EventDay;
  onUpdateLabel: (id: string, label: string) => void;
  onRemove: (id: string) => void;
  onToggleItem: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string) => void;
  onUpdateItemQuantity: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string, qty: number) => void;
  onUpdateItemNotes: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string, notes: string) => void;
}

export default function DayBlock({
  day,
  onUpdateLabel,
  onRemove,
  onToggleItem,
  onUpdateItemQuantity,
  onUpdateItemNotes,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
      <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between gap-4">
        <input
          value={day.label}
          onChange={(e) => onUpdateLabel(day.id, e.target.value)}
          className="bg-transparent border-b border-transparent hover:border-white/40 focus:border-white/60 outline-none font-semibold flex-1 text-sm"
        />
        <button
          onClick={() => onRemove(day.id)}
          className="text-red-300 hover:text-red-200 text-xs font-medium shrink-0"
        >
          Remove
        </button>
      </div>
      <div className="flex flex-col sm:flex-row">
        <PreProductionPanel
          dayId={day.id}
          items={day.preProduction}
          side="preProduction"
          onToggle={onToggleItem}
          onQuantity={onUpdateItemQuantity}
          onNotes={onUpdateItemNotes}
        />
        <PostProductionPanel
          dayId={day.id}
          items={day.postProduction}
          side="postProduction"
          onToggle={onToggleItem}
          onQuantity={onUpdateItemQuantity}
        />
      </div>
    </div>
  );
}
