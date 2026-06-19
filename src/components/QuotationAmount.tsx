interface Props {
  value: number | null;
  onChange: (value: number | null) => void;
  advanceValue: number | null;
  onAdvanceChange: (value: number | null) => void;
}

export default function QuotationAmount({ value, onChange, advanceValue, onAdvanceChange }: Props) {
  return (
    <div className="bg-white/90 rounded-lg shadow-sm border border-[#ded5bf] p-5 sm:p-6 mb-5 backdrop-blur">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-[#263128]">Quotation Amount</h2>
        <span className="h-px flex-1 bg-[#ded5bf]" />
      </div>
      <div className="max-w-xs">
        <label className="block text-xs font-semibold uppercase text-[#6f7468] mb-1.5">
          Total Amount ({'\u20B9'})
        </label>
        <input
          type="number"
          min="0"
          value={value ?? ''}
          onChange={(e) => {
            const v = e.target.value;
            onChange(v ? parseInt(v) : null);
          }}
          placeholder="e.g. 250000"
          className="w-full px-3.5 py-2.5 min-h-[44px] border border-[#d8d1c0] rounded-lg bg-[#fbfaf7] text-sm text-[#263128] placeholder:text-[#a2a696] focus:ring-2 focus:ring-[#b99a5b]/30 focus:border-[#b99a5b] outline-none transition"
        />
      </div>
      <div className="max-w-xs mt-3">
        <label className="block text-xs font-semibold uppercase text-[#6f7468] mb-1.5">
          Advance Payment ({'\u20B9'})
        </label>
        <input
          type="number"
          min="0"
          value={advanceValue ?? ''}
          onChange={(e) => {
            const v = e.target.value;
            onAdvanceChange(v ? parseInt(v) : null);
          }}
          placeholder="e.g. 50000"
          className="w-full px-3.5 py-2.5 min-h-[44px] border border-[#d8d1c0] rounded-lg bg-[#fbfaf7] text-sm text-[#263128] placeholder:text-[#a2a696] focus:ring-2 focus:ring-[#b99a5b]/30 focus:border-[#b99a5b] outline-none transition"
        />
      </div>
    </div>
  );
}
