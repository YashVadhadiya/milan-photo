import { useState } from 'react';
import { toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import type { AppState } from '../types';

interface Props {
  pageRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  state: AppState;
  pageCount: number;
}

export default function DownloadButton({ pageRefs, state, pageCount }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (loading) return;
    setLoading(true);

    const name = state.clientDetails.name?.trim()
      ? state.clientDetails.name.trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
      : 'Quotation';
    const filename = `${name}-Photo-Quotation.pdf`;

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const A4_W = 210;
      const A4_H = 297;

      for (let i = 0; i < pageCount; i++) {
        const el = pageRefs.current[i];
        if (!el) continue;

        const imgData = await toJpeg(el, {
          quality: 0.92,
          pixelRatio: 3,
          cacheBust: true,
        });

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, A4_W, A4_H);
      }

      pdf.save(filename);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition ${
        loading
          ? 'bg-gray-300 text-gray-500 cursor-wait'
          : 'bg-[#263128] text-white hover:bg-[#344236] cursor-pointer shadow-sm'
      }`}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Generating PDF...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </>
      )}
    </button>
  );
}
