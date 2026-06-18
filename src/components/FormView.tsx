import type { AppState, ClientDetails, FooterDetails } from '../types';
import ClientDetailsForm from './ClientDetails';
import FooterForm from './FooterForm';
import EventDays from './EventDays';
import DayBlock from './DayBlock';
import QuotationAmount from './QuotationAmount';

interface Props {
  state: AppState;
  onUpdateClient: (field: keyof ClientDetails, value: string) => void;
  onUpdateFooter: (field: keyof FooterDetails, value: string | boolean) => void;
  onAddEventDay: (label: string) => void;
  onRemoveEventDay: (id: string) => void;
  onUpdateEventDayLabel: (id: string, label: string) => void;
  onToggleItem: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string) => void;
  onUpdateItemQuantity: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string, qty: number) => void;
  onUpdateItemNotes: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string, notes: string) => void;
  onUpdateItemDays: (dayId: string, side: 'preProduction' | 'postProduction', itemId: string, days: number) => void;
  onSetAmount: (amount: number | null) => void;
  onReset: () => void;
  onPreview: () => void;
  onLoadSample: () => void;
}

export default function FormView(props: Props) {
  const { state, onAddEventDay, onReset, onPreview } = props;
  const hasDays = state.eventDays.length > 0;
  const selectedItems = state.eventDays.reduce(
    (total, day) =>
      total +
      day.preProduction.filter((item) => item.enabled).length +
      day.postProduction.filter((item) => item.enabled).length,
    0
  );
  const selectedDayLabels = state.eventDays.map((day) => day.label);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#eef4ef_48%,#f6f8fb_100%)]">
      <div className="max-w-5xl mx-auto py-6 sm:py-10 px-3 sm:px-5">
      <div className="mb-6 sm:mb-8 rounded-lg border border-[#ded5bf] bg-white/85 px-5 py-5 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-[#8a8b55]">Milan Studio</p>
            <p className="mt-1 text-sm text-[#6f7468]">Wedding & event photography proposal workspace</p>
          </div>
          <button
            onClick={props.onLoadSample}
            className="hidden"
          >
            + Load Sample
          </button>
        </div>
      </div>

      <ClientDetailsForm client={state.clientDetails} onChange={props.onUpdateClient} />

      <EventDays
        daysCount={state.eventDays.length}
        selectedLabels={selectedDayLabels}
        onAdd={onAddEventDay}
      />

      {state.eventDays.map((day) => (
        <DayBlock
          key={day.id}
          day={day}
          onUpdateLabel={props.onUpdateEventDayLabel}
          onRemove={props.onRemoveEventDay}
          onToggleItem={props.onToggleItem}
          onUpdateItemQuantity={props.onUpdateItemQuantity}
          onUpdateItemNotes={props.onUpdateItemNotes}
          onUpdateItemDays={props.onUpdateItemDays}
        />
      ))}

      <QuotationAmount value={state.totalAmount} onChange={props.onSetAmount} />

      <FooterForm footer={state.footerDetails} onUpdate={props.onUpdateFooter} />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-8">
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-[#6f7468] hover:text-[#263128] transition text-center"
        >
          Reset All
        </button>
        <button
          onClick={onPreview}
          disabled={!hasDays}
          className={`w-full sm:w-auto px-8 py-3 rounded-lg text-sm font-semibold transition ${
            hasDays
              ? 'bg-[#263128] text-white hover:bg-[#344236] shadow-lg shadow-[#8a8b55]/20'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Preview & Download
        </button>
      </div>
      </div>
    </div>
  );
}
