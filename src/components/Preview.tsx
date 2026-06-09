import { useMemo, useRef } from 'react';
import type { AppState } from '../types';
import { paginate } from '../utils/paginate';
import QuotationPage from './QuotationPage';
import DownloadButton from './DownloadButton';

interface Props {
  state: AppState;
  onBack: () => void;
}

export default function Preview({ state, onBack }: Props) {
  const pages = useMemo(() => paginate(state), [state]);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-[220mm] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 transition text-sm"
          >
            <span>{'\u2190'}</span>
            <span>Back to Edit</span>
          </button>
          <DownloadButton pageRefs={pageRefs} state={state} pageCount={pages.length} />
        </div>

        <div className="overflow-x-auto pb-4">
          {pages.map((p, idx) => (
            <div
              key={idx}
              className="mx-auto mb-6 last:mb-0"
              style={{
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
                width: '210mm',
              }}
            >
              <div
                ref={(el) => { pageRefs.current[idx] = el; }}
              >
                <QuotationPage
                  days={p.dayIndices.map((i) => state.eventDays[i])}
                  clientDetails={state.clientDetails}
                  showClient={p.showClient}
                  showAmount={p.showAmount}
                  amount={state.totalAmount}
                  pageNumber={idx + 1}
                  totalPages={pages.length}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
