import type { LineItem } from '../types';
import QuantityStepper from './QuantityStepper';

interface Props {
  dayId: string;
  items: LineItem[];
  side: 'postProduction';
  onToggle: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string) => void;
  onQuantity: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string, qty: number) => void;
  onDays: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string, days: number) => void;
}

export default function PostProductionPanel({
  dayId,
  items,
  side,
  onToggle,
  onQuantity,
  onDays,
}: Props) {
  return (
    <div className="flex-1 p-4 bg-white">
      <h3 className="text-xs font-bold text-[#8a8b55] uppercase mb-3">
        Output
      </h3>
      {items.map((item) => (
        <div
          key={item.id}
          className={`mb-2 rounded-lg border px-3 py-2 transition ${
            item.enabled
              ? 'border-[#b99a5b] bg-[#fbfaf7] shadow-sm'
              : 'border-transparent hover:border-[#ded5bf] hover:bg-[#fbfaf7]/70'
          }`}
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={item.enabled}
              onChange={() => onToggle(dayId, side, item.id)}
              className="rounded border-[#bfb69f] text-[#8a8b55] focus:ring-[#b99a5b]"
            />
            <span className="text-sm flex-1 select-none text-[#263128]">{item.label}</span>
            {item.enabled && (
              <QuantityStepper
                value={item.quantity}
                onChange={(qty) => onQuantity(dayId, side, item.id, qty)}
              />
            )}
          </label>
          {item.enabled && item.id === 'pre-wed-teaser' && (
            <div className="mt-2 ml-7 flex items-center gap-2">
              <input
                type="text"
                inputMode="numeric"
                value={item.days || 0}
                onChange={(e) => onDays(dayId, side, item.id, parseInt(e.target.value) || 0)}
                className="w-16 px-2 py-1 border border-[#d8d1c0] rounded-lg bg-white text-sm text-[#263128] text-center focus:ring-2 focus:ring-[#b99a5b]/30 focus:border-[#b99a5b] outline-none transition"
              />
              <span className="text-[11px] text-[#6f7468] font-medium">Days to go photos</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
