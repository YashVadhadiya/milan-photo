import type { ClientDetails as ClientDetailsType } from '../types';

interface Props {
  client: ClientDetailsType;
  onChange: (field: keyof ClientDetailsType, value: string) => void;
}

export default function ClientDetails({ client, onChange }: Props) {
  const fields: { key: keyof ClientDetailsType; label: string; placeholder: string; readOnly?: boolean }[] = [
    { key: 'name', label: 'Client Name', placeholder: 'e.g. Milan Sharma' },
    { key: 'mobile', label: 'Mobile Number', placeholder: 'e.g. +91 98765 43210' },
    { key: 'address', label: 'Address', placeholder: 'e.g. Mumbai, Maharashtra' },
    { key: 'eventDate', label: 'Event Date', placeholder: 'e.g. 2026-12-15' },
    { key: 'quotationDate', label: 'Date of Quotation', placeholder: 'Today\'s date', readOnly: true },
  ];

  return (
    <div className="bg-white/90 rounded-lg shadow-sm border border-[#ded5bf] p-5 sm:p-6 mb-5 backdrop-blur">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-[#263128]">Client & Event</h2>
        <span className="h-px flex-1 bg-[#ded5bf]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ key, label, placeholder, readOnly }) => (
          <div key={key}>
            <label className="block text-xs font-semibold uppercase text-[#6f7468] mb-1.5">
              {label}
            </label>
            <input
              value={client[key]}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={placeholder}
              readOnly={readOnly}
              tabIndex={readOnly ? -1 : undefined}
              className={`w-full px-3.5 py-2.5 min-h-[44px] border border-[#d8d1c0] rounded-lg bg-[#fbfaf7] text-sm text-[#263128] placeholder:text-[#a2a696] focus:ring-2 focus:ring-[#b99a5b]/30 focus:border-[#b99a5b] outline-none transition ${readOnly ? 'opacity-70 cursor-not-allowed' : ''}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
