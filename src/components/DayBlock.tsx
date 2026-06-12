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
  const activeCount =
    day.preProduction.filter((item) => item.enabled).length +
    day.postProduction.filter((item) => item.enabled).length;

  return (
    <div className="bg-white/95 rounded-lg shadow-sm border border-[#ded5bf] overflow-hidden mb-4">
      <div className="bg-[#263128] text-white px-4 py-3 flex items-center justify-between gap-4">
        <input
          value={day.label}
          onChange={(e) => onUpdateLabel(day.id, e.target.value)}
          className="bg-transparent border-b border-transparent hover:border-white/40 focus:border-white/60 outline-none font-semibold flex-1 text-sm"
        />
        <span className="hidden xs:inline-flex rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-[#f7f1e3]">
          {activeCount} selected
        </span>
        <button
          onClick={() => onRemove(day.id)}
          className="text-[#f0d1c6] hover:text-white text-xs font-semibold shrink-0 min-h-[36px] min-w-[36px] flex items-center justify-center"
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
