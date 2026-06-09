import { useState, useEffect, useCallback } from 'react';
import type { AppState, ClientDetails } from './types';
import { PRE_PRODUCTION_ITEMS, POST_PRODUCTION_ITEMS, createLineItem } from './constants';
import FormView from './components/FormView';
import Preview from './components/Preview';

const DEFAULT_STATE: AppState = {
  clientDetails: { name: '', mobile: '', address: '', eventName: '', venue: '' },
  eventDays: [],
  totalAmount: null,
};

export default function App() {
  const [view, setView] = useState<'form' | 'preview'>('form');
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('quotation-draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          typeof parsed === 'object' &&
          'clientDetails' in parsed &&
          'eventDays' in parsed
        ) {
          return parsed as AppState;
        }
      }
    } catch {}
    return DEFAULT_STATE;
  });

  useEffect(() => {
    localStorage.setItem('quotation-draft', JSON.stringify(state));
  }, [state]);

  const updateClient = useCallback((field: keyof ClientDetails, value: string) => {
    setState((prev) => ({
      ...prev,
      clientDetails: { ...prev.clientDetails, [field]: value },
    }));
  }, []);

  const addEventDay = useCallback((label: string) => {
    setState((prev) => {
      const dayNum = prev.eventDays.length + 1;
      const dayLabel = label || `Day ${dayNum}`;
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
        d.id === dayId ? { ...d, label } : d
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
                  i.id === itemId ? { ...i, quantity: Math.max(0, qty) } : i
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

  const setAmount = useCallback((amount: number | null) => {
    setState((prev) => ({ ...prev, totalAmount: amount }));
  }, []);

  const resetAll = useCallback(() => {
    setState(DEFAULT_STATE);
    localStorage.removeItem('quotation-draft');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {view === 'form' ? (
        <FormView
          state={state}
          onUpdateClient={updateClient}
          onAddEventDay={addEventDay}
          onRemoveEventDay={removeEventDay}
          onUpdateEventDayLabel={updateEventDayLabel}
          onToggleItem={toggleItem}
          onUpdateItemQuantity={updateItemQuantity}
          onUpdateItemNotes={updateItemNotes}
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
