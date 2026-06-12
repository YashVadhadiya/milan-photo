import type { LineItem } from '../types';
import QuantityStepper from './QuantityStepper';

interface Props {
  dayId: string;
  items: LineItem[];
  side: 'postProduction';
  onToggle: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string) => void;
  onQuantity: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string, qty: number) => void;
}

export default function PostProductionPanel({
  dayId,
  items,
  side,
  onToggle,
  onQuantity,
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
        </div>
      ))}
    </div>
  );
}
