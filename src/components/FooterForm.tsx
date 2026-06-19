import type { FooterDetails } from '../types';

interface Props {
  footer: FooterDetails;
  onUpdate: (field: keyof FooterDetails, value: string | boolean) => void;
}

function OwnerSection({
  num,
  name,
  mobile,
  enabled,
  onUpdate,
}: {
  num: string;
  name: string;
  mobile: string;
  enabled: boolean;
  onUpdate: Props['onUpdate'];
}) {
  const nameKey = `owner${num}Name` as keyof FooterDetails;
  const mobileKey = `owner${num}Mobile` as keyof FooterDetails;
  const enabledKey = `owner${num}Enabled` as keyof FooterDetails;

  return (
    <div className="border border-[#ded5bf] rounded-lg bg-[#fbfaf7] p-4">
      <div className="text-xs font-semibold uppercase text-[#8a8b55] mb-3">
        Owner {num}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold uppercase text-[#6f7468] mb-1">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => onUpdate(nameKey, e.target.value)}
            placeholder={num === '1' ? 'e.g. Vishal Bhai' : 'e.g. Dharmik Bhai'}
            className="w-full px-3 py-2 min-h-[40px] border border-[#d8d1c0] rounded-lg bg-white text-sm text-[#263128] placeholder:text-[#a2a696] focus:ring-2 focus:ring-[#b99a5b]/30 focus:border-[#b99a5b] outline-none transition"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-[#6f7468] mb-1">
            Mobile
          </label>
          <input
            value={mobile}
            onChange={(e) => onUpdate(mobileKey, e.target.value)}
            placeholder="e.g. +91 8128126869"
            className="w-full px-3 py-2 min-h-[40px] border border-[#d8d1c0] rounded-lg bg-white text-sm text-[#263128] placeholder:text-[#a2a696] focus:ring-2 focus:ring-[#b99a5b]/30 focus:border-[#b99a5b] outline-none transition"
          />
        </div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer mt-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onUpdate(enabledKey, e.target.checked)}
          className="w-4 h-4 rounded border-[#d8d1c0] text-[#b99a5b] focus:ring-[#b99a5b]/30"
        />
        <span className="text-sm font-medium text-[#6f7468]">Show in footer</span>
      </label>
    </div>
  );
}

export default function FooterForm({ footer, onUpdate }: Props) {
  return (
    <div className="bg-white/90 rounded-lg shadow-sm border border-[#ded5bf] p-5 sm:p-6 mb-5 backdrop-blur">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-[#263128]">Footer Details</h2>
        <span className="h-px flex-1 bg-[#ded5bf]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <OwnerSection num="1" name={footer.owner1Name} mobile={footer.owner1Mobile} enabled={footer.owner1Enabled} onUpdate={onUpdate} />
        <OwnerSection num="2" name={footer.owner2Name} mobile={footer.owner2Mobile} enabled={footer.owner2Enabled} onUpdate={onUpdate} />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-[#6f7468] mb-1.5">
            Address
          </label>
          <textarea
            value={footer.address}
            onChange={(e) => onUpdate('address', e.target.value)}
            placeholder="e.g. MILAN PHOTO, 509, 5th Floor..."
            rows={2}
            className="w-full px-3.5 py-2.5 min-h-[44px] border border-[#d8d1c0] rounded-lg bg-[#fbfaf7] text-sm text-[#263128] placeholder:text-[#a2a696] focus:ring-2 focus:ring-[#b99a5b]/30 focus:border-[#b99a5b] outline-none transition resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-[#6f7468] mb-1.5">
            Google Maps Link
          </label>
          <input
            value={footer.mapLink}
            onChange={(e) => onUpdate('mapLink', e.target.value)}
            placeholder="https://maps.app.goo.gl/..."
            className="w-full px-3.5 py-2.5 min-h-[44px] border border-[#d8d1c0] rounded-lg bg-[#fbfaf7] text-sm text-[#263128] placeholder:text-[#a2a696] focus:ring-2 focus:ring-[#b99a5b]/30 focus:border-[#b99a5b] outline-none transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-[#6f7468] mb-1.5">
              Instagram ID
            </label>
            <input
              value={footer.instagramId}
              onChange={(e) => onUpdate('instagramId', e.target.value)}
              placeholder="e.g. milan_photoshoot__"
              className="w-full px-3.5 py-2.5 min-h-[44px] border border-[#d8d1c0] rounded-lg bg-[#fbfaf7] text-sm text-[#263128] placeholder:text-[#a2a696] focus:ring-2 focus:ring-[#b99a5b]/30 focus:border-[#b99a5b] outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-[#6f7468] mb-1.5">
              Instagram Link
            </label>
            <input
              value={footer.instagramLink}
              onChange={(e) => onUpdate('instagramLink', e.target.value)}
              placeholder="https://www.instagram.com/..."
              className="w-full px-3.5 py-2.5 min-h-[44px] border border-[#d8d1c0] rounded-lg bg-[#fbfaf7] text-sm text-[#263128] placeholder:text-[#a2a696] focus:ring-2 focus:ring-[#b99a5b]/30 focus:border-[#b99a5b] outline-none transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
