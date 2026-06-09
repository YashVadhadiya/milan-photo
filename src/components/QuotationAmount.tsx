interface Props {
  value: number | null;
  onChange: (value: number | null) => void;
}

export default function QuotationAmount({ value, onChange }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Quotation Amount</h2>
      <div className="max-w-xs">
        <label className="block text-sm font-medium text-gray-600 mb-1">
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>
    </div>
  );
}
