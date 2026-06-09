import type { ClientDetails as ClientDetailsType } from '../types';

interface Props {
  client: ClientDetailsType;
  onChange: (field: keyof ClientDetailsType, value: string) => void;
}

export default function ClientDetails({ client, onChange }: Props) {
  const fields: { key: keyof ClientDetailsType; label: string; placeholder: string }[] = [
    { key: 'name', label: 'Client Name', placeholder: 'e.g. Milan Sharma' },
    { key: 'mobile', label: 'Mobile Number', placeholder: 'e.g. +91 98765 43210' },
    { key: 'address', label: 'Address / Location', placeholder: 'e.g. Mumbai, Maharashtra' },
    { key: 'eventName', label: 'Event Name (optional)', placeholder: 'e.g. Milan-Wedding' },
    { key: 'venue', label: 'Event Venue (optional)', placeholder: 'e.g. Grand Palace Hotel' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Client Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {label}
            </label>
            <input
              value={client[key]}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
