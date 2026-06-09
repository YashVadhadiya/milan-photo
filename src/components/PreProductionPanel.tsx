import type { LineItem } from '../types';

interface Props {
  dayId: string;
  items: LineItem[];
  side: 'preProduction';
  onToggle: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string) => void;
  onQuantity: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string, qty: number) => void;
  onNotes: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string, notes: string) => void;
}

export default function PreProductionPanel({
  dayId,
  items,
  side,
  onToggle,
  onQuantity,
  onNotes,
}: Props) {
  return (
    <div className="flex-1 p-4 sm:border-r border-gray-200">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
        Pre-Production / Team
      </h3>
      {items.map((item) => (
        <div key={item.id} className="mb-2">
          <label className="flex items-center gap-2 cursor-pointer py-0.5">
            <input
              type="checkbox"
              checked={item.enabled}
              onChange={() => onToggle(dayId, side, item.id)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm flex-1 select-none">{item.label}</span>
            {item.enabled && (
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  onQuantity(dayId, side, item.id, parseInt(e.target.value) || 1)
                }
                className="w-14 px-2 py-1 border border-gray-300 rounded text-sm text-center"
              />
            )}
          </label>
          {item.enabled && item.id === 'live-setup' && (
            <input
              value={item.notes}
              onChange={(e) => onNotes(dayId, side, item.id, e.target.value)}
              placeholder="Setup details..."
              className="ml-6 mt-1 w-full px-2 py-1 border border-gray-200 rounded text-xs text-gray-600"
            />
          )}
        </div>
      ))}
    </div>
  );
}
