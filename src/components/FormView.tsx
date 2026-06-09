import type { AppState, ClientDetails } from '../types';
import ClientDetailsForm from './ClientDetails';
import EventDays from './EventDays';
import DayBlock from './DayBlock';
import QuotationAmount from './QuotationAmount';

interface Props {
  state: AppState;
  onUpdateClient: (field: keyof ClientDetails, value: string) => void;
  onAddEventDay: (label: string) => void;
  onRemoveEventDay: (id: string) => void;
  onUpdateEventDayLabel: (id: string, label: string) => void;
  onToggleItem: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string) => void;
  onUpdateItemQuantity: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string, qty: number) => void;
  onUpdateItemNotes: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string, notes: string) => void;
  onSetAmount: (amount: number | null) => void;
  onReset: () => void;
  onPreview: () => void;
}

export default function FormView(props: Props) {
  const { state, onAddEventDay, onReset, onPreview } = props;
  const hasDays = state.eventDays.length > 0;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Milan Photography</h1>
        <p className="text-gray-500 mt-1">Quotation Builder</p>
      </div>

      <ClientDetailsForm client={state.clientDetails} onChange={props.onUpdateClient} />

      <EventDays daysCount={state.eventDays.length} onAdd={onAddEventDay} />

      {state.eventDays.map((day) => (
        <DayBlock
          key={day.id}
          day={day}
          onUpdateLabel={props.onUpdateEventDayLabel}
          onRemove={props.onRemoveEventDay}
          onToggleItem={props.onToggleItem}
          onUpdateItemQuantity={props.onUpdateItemQuantity}
          onUpdateItemNotes={props.onUpdateItemNotes}
        />
      ))}

      <QuotationAmount value={state.totalAmount} onChange={props.onSetAmount} />

      <div className="flex items-center justify-between gap-4 mt-8">
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          Reset All
        </button>
        <button
          onClick={onPreview}
          disabled={!hasDays}
          className={`px-8 py-3 rounded-xl text-sm font-semibold transition ${
            hasDays
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Preview & Download
        </button>
      </div>
    </div>
  );
}
