import { useState, useCallback } from 'react';
import type { AppState, ClientDetails, FooterDetails } from './types';
import { PRE_PRODUCTION_ITEMS, POST_PRODUCTION_ITEMS, createLineItem, DEFAULT_FOOTER } from './constants';
import FormView from './components/FormView';
import Preview from './components/Preview';

function toTitleCase(value: string): string {
  return value.replace(/[A-Za-z][A-Za-z']*/g, (word) => (
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ));
}

function formatClientValue(field: keyof ClientDetails, value: string): string {
  return (field === 'mobile' || field === 'eventDate' || field === 'quotationDate') ? value : toTitleCase(value);
}

export default function App() {
  const [view, setView] = useState<'form' | 'preview'>('form');
  const [state, setState] = useState<AppState>(() => ({
    clientDetails: { name: '', mobile: '', address: '', eventDate: '', quotationDate: (() => { const d = new Date(); return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`; })() },
    footerDetails: { ...DEFAULT_FOOTER },
    eventDays: [],
    totalAmount: null,
  }));

  const updateClient = useCallback((field: keyof ClientDetails, value: string) => {
    setState((prev) => ({
      ...prev,
      clientDetails: { ...prev.clientDetails, [field]: formatClientValue(field, value) },
    }));
  }, []);

  const updateFooter = useCallback((field: keyof FooterDetails, value: string | boolean) => {
    setState((prev) => ({
      ...prev,
      footerDetails: { ...prev.footerDetails, [field]: value },
    }));
  }, []);

  const addEventDay = useCallback((label: string) => {
    setState((prev) => {
      const dayNum = prev.eventDays.length + 1;
      const dayLabel = toTitleCase(label || `Day ${dayNum}`);
      const day = {
        id: `day-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        label: dayLabel,
        preProduction: PRE_PRODUCTION_ITEMS.map(createLineItem),
        postProduction: POST_PRODUCTION_ITEMS.map(createLineItem),
      };
      return { ...prev, eventDays: [...prev.eventDays, day] };
    });
  }, []);

  const removeEventDay = useCallback((dayId: string) => {
    setState((prev) => ({
      ...prev,
      eventDays: prev.eventDays.filter((d) => d.id !== dayId),
    }));
  }, []);

  const updateEventDayLabel = useCallback((dayId: string, label: string) => {
    setState((prev) => ({
      ...prev,
      eventDays: prev.eventDays.map((d) =>
        d.id === dayId ? { ...d, label: toTitleCase(label) } : d
      ),
    }));
  }, []);

  const toggleItem = useCallback(
    (dayId: string, side: 'preProduction' | 'postProduction', itemId: string) => {
      setState((prev) => ({
        ...prev,
        eventDays: prev.eventDays.map((d) =>
          d.id === dayId
            ? {
                ...d,
                [side]: d[side].map((i) =>
                  i.id === itemId ? { ...i, enabled: !i.enabled } : i
                ),
              }
            : d
        ),
      }));
    },
    []
  );

  const updateItemQuantity = useCallback(
    (dayId: string, side: 'preProduction' | 'postProduction', itemId: string, qty: number) => {
      setState((prev) => ({
        ...prev,
        eventDays: prev.eventDays.map((d) =>
          d.id === dayId
            ? {
                ...d,
                [side]: d[side].map((i) =>
                  i.id === itemId ? { ...i, quantity: Math.max(1, qty) } : i
                ),
              }
            : d
        ),
      }));
    },
    []
  );

  const updateItemNotes = useCallback(
    (dayId: string, side: 'preProduction' | 'postProduction', itemId: string, notes: string) => {
      setState((prev) => ({
        ...prev,
        eventDays: prev.eventDays.map((d) =>
          d.id === dayId
            ? {
                ...d,
                [side]: d[side].map((i) =>
                  i.id === itemId ? { ...i, notes } : i
                ),
              }
            : d
        ),
      }));
    },
    []
  );

  const updateItemDays = useCallback(
    (dayId: string, side: 'preProduction' | 'postProduction', itemId: string, days: number) => {
      setState((prev) => ({
        ...prev,
        eventDays: prev.eventDays.map((d) =>
          d.id === dayId
            ? {
                ...d,
                [side]: d[side].map((i) =>
                  i.id === itemId ? { ...i, days: Math.max(0, days) } : i
                ),
              }
            : d
        ),
      }));
    },
    []
  );

  const setAmount = useCallback((amount: number | null) => {
    setState((prev) => ({ ...prev, totalAmount: amount }));
  }, []);

  const resetAll = useCallback(() => {
    setState({
    clientDetails: { name: '', mobile: '', address: '', eventDate: '', quotationDate: (() => { const d = new Date(); return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`; })() },
      footerDetails: { ...DEFAULT_FOOTER },
      eventDays: [],
      totalAmount: null,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {view === 'form' ? (
        <FormView
          state={state}
          onUpdateClient={updateClient}
          onUpdateFooter={updateFooter}
          onAddEventDay={addEventDay}
          onRemoveEventDay={removeEventDay}
          onUpdateEventDayLabel={updateEventDayLabel}
          onToggleItem={toggleItem}
          onUpdateItemQuantity={updateItemQuantity}
          onUpdateItemNotes={updateItemNotes}
          onUpdateItemDays={updateItemDays}
          onSetAmount={setAmount}
          onReset={resetAll}
          onPreview={() => setView('preview')}
        />
      ) : (
        <Preview state={state} onBack={() => setView('form')} />
      )}
    </div>
  );
}
