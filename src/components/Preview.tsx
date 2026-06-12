import { useMemo, useRef, useState, useEffect } from 'react';
import type { AppState } from '../types';
import { paginate } from '../utils/paginate';
import QuotationPage from './QuotationPage';
import DownloadButton from './DownloadButton';

interface Props {
  state: AppState;
  onBack: () => void;
}

const PAGE_W_MM = 210;
const PAGE_H_MM = 297;
const PX_PER_MM = 96 / 25.4;
const PAGE_W_PX = PAGE_W_MM * PX_PER_MM;

export default function Preview({ state, onBack }: Props) {
  const pages = useMemo(() => paginate(state), [state]);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scale, setScale] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setScale(Math.min(1, entry.contentRect.width / PAGE_W_PX));
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#eef4ef_0%,#f8fafc_46%,#edf1f5_100%)] py-6 sm:py-8 px-3 sm:px-4">
      <div ref={wrapperRef} className="mx-auto" style={{ maxWidth: '220mm' }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 rounded-lg border border-[#ded5bf] bg-white/85 px-4 py-3 shadow-sm backdrop-blur">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 text-[#6f7468] hover:text-[#263128] transition text-sm font-semibold min-h-[42px] sm:min-h-0"
          >
            <span>{'\u2190'}</span>
            <span>Back to Edit</span>
          </button>
          <DownloadButton pageRefs={pageRefs} state={state} pageCount={pages.length} />
        </div>

        <div className="space-y-6">
          {pages.map((p, idx) => (
            <div
              key={idx}
              className="mx-auto"
              style={{
                width: `${PAGE_W_MM * scale}mm`,
                height: `${PAGE_H_MM * scale}mm`,
                overflow: 'hidden',
                boxShadow: '0 18px 50px rgba(38,49,40,0.18)',
                borderRadius: '1.8mm',
              }}
            >
              <div
                style={{
                  width: `${PAGE_W_MM}mm`,
                  height: `${PAGE_H_MM}mm`,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                }}
              >
                <div ref={(el) => { pageRefs.current[idx] = el; }}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
