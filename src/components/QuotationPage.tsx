import type { CSSProperties } from 'react';
import type { EventDay, ClientDetails, FooterDetails, LineItem } from '../types';
import { BRAND } from '../constants';
import FooterPreview from './FooterPreview';
import SimpleFooter from './SimpleFooter';


interface Props {
  days: EventDay[];
  clientDetails: ClientDetails;
  footerDetails: FooterDetails;
  showClient: boolean;
  showAmount: boolean;
  amount: number | null;
  pageNumber: number;
  totalPages: number;
  showDetailedFooter?: boolean;
  bgImage?: string;
}

const C = BRAND.colors;

function hasClientData(c: ClientDetails): boolean {
  return !!(c.name || c.mobile || c.address || c.eventDate || c.quotationDate);
}

function itemLabel(item: LineItem): string {
  return item.quantity > 1 ? `${item.label} (x${item.quantity})` : item.label;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;

  return (
    <div style={{ display: 'flex', gap: '8pt', alignItems: 'baseline' }}>
      <span
        style={{
          width: '78pt',
          flexShrink: 0,
          fontSize: '8.5pt',
          color: C.muted,
          fontWeight: 700,
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: '10.5pt', color: C.text, fontWeight: 600 }}>{value}</span>
    </div>
  );
}

function ServiceList({ title, items }: { title: string; items: LineItem[] }) {
  if (items.length === 0) return null;

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          fontSize: '8.8pt',
          color: C.olive,
          fontWeight: 800,
          textTransform: 'uppercase',
          marginBottom: '6pt',
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1pt' }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: '2.5pt 0',
              borderBottom: `0.25pt solid ${C.line}`,
              breakInside: 'avoid',
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '13pt', color: C.text, fontWeight: 650 }}>
                {itemLabel(item)}
              </div>
              {item.notes && (
                <div style={{ marginTop: '1pt', fontSize: '8.5pt', color: C.muted }}>
                  {item.notes}
                </div>
              )}
              {item.id === 'pre-wed-teaser' && item.days > 0 && (
                <div style={{ marginTop: '1pt', fontSize: '8.5pt', color: C.muted }}>
                  {item.days} Days to go photos
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const glassPanel: CSSProperties = {
  background: 'rgba(255,255,255,0.82)',
  border: `0.8pt solid ${C.line}`,
  borderRadius: '7pt',
  boxShadow: '0 8pt 22pt rgba(38,49,40,0.08)',
};

export default function QuotationPage({
  days,
  clientDetails,
  footerDetails,
  showClient,
  showAmount,
  amount,
  pageNumber,
  totalPages,
  showDetailedFooter,
  bgImage,
}: Props) {
  const visibleDays = days
    .map((day) => ({
      day,
      preItems: day.preProduction.filter((i) => i.enabled),
      postItems: day.postProduction.filter((i) => i.enabled),
    }))
    .filter(({ preItems, postItems }) => preItems.length > 0 || postItems.length > 0);

  return (
    <div
      style={{
        width: '210mm',
        height: '297mm',
        padding: '15mm 13mm 8mm',
        fontFamily: '"Segoe UI", Arial, sans-serif',
        fontSize: '10pt',
        color: C.text,
        lineHeight: 1.45,
        backgroundColor: C.paper,
        backgroundImage: `url(${bgImage || BRAND.backgroundPath})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
        }}
      >
        <header
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '14pt',
            paddingBottom: '11pt',
            marginBottom: '12pt',
            borderBottom: `1.6pt solid ${C.accent}`,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '-15mm',
              bottom: 0,
              background: 'linear-gradient(90deg, transparent 5%, rgba(185,154,91,0.035) 15%, rgba(185,154,91,0.14) 25%, rgba(185,154,91,0.28) 35%, rgba(185,154,91,0.42) 44%, rgba(185,154,91,0.45) 50%, rgba(185,154,91,0.42) 56%, rgba(185,154,91,0.28) 65%, rgba(185,154,91,0.14) 75%, rgba(185,154,91,0.035) 85%, transparent 95%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '-15mm',
              bottom: 0,
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', zIndex: 2, flex: 1, height: '65px' }} />
        </header>

        <main style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {showClient && hasClientData(clientDetails) && (
            <section
              style={{
                ...glassPanel,
                padding: '10pt 12pt',
                marginBottom: '11pt',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '14pt',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontSize: '14pt',
                      color: C.primary,
                      fontWeight: 700,
                      marginBottom: '5pt',
                    }}
                  >
                    Client & Event
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3pt 14pt' }}>
                    <DetailRow label="Client" value={clientDetails.name} />
                    <DetailRow label="Mobile" value={clientDetails.mobile} />
                    <DetailRow label="Address" value={clientDetails.address} />
                    <DetailRow label="Event Date" value={clientDetails.eventDate} />
                    <DetailRow label="Quotation Date" value={clientDetails.quotationDate} />
                  </div>
                </div>
              </div>
            </section>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '9pt' }}>
            {!showAmount && visibleDays.length === 0 && (
              <section style={{ ...glassPanel, padding: '18pt', textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '17pt',
                    color: C.primary,
                    fontWeight: 700,
                  }}
                >
                  Services will appear here
                </div>
              </section>
            )}

            {visibleDays.map(({ day, preItems, postItems }, index) => (
              <section key={day.id} style={{ ...glassPanel, overflow: 'hidden', breakInside: 'avoid' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10pt',
                    padding: '8pt 11pt',
                    background: `linear-gradient(90deg, ${C.primary}, #53613f)`,
                    color: C.white,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontSize: '14pt',
                      fontWeight: 700,
                    }}
                  >
                    {day.label}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '13pt', padding: '10pt 12pt 11pt' }}>
                  <ServiceList title="Team" items={preItems} />
                  <ServiceList title="Output" items={postItems} />
                </div>
              </section>
            ))}
          </div>

          {showAmount && amount != null && amount > 0 && (
            <section
              style={{
                ...glassPanel,
                marginTop: '11pt',
                padding: '10pt 14pt',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12pt',
                border: `1.2pt solid ${C.accent}`,
                background: 'rgba(247,241,227,0.86)',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '14pt',
                    color: C.primary,
                    fontWeight: 700,
                  }}
                >
                  Total Quotation
                </div>
                <div style={{ marginTop: '2pt', fontSize: '8.8pt', color: C.muted, fontWeight: 600 }}>
                  Package amount for selected services
                </div>
              </div>
              <div
                style={{
                  fontSize: '23pt',
                  color: C.primary,
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                }}
              >
                {'\u20B9'} {amount.toLocaleString('en-IN')}
              </div>
            </section>
          )}
        </main>

        {showDetailedFooter ? (
          <FooterPreview footer={footerDetails} pageNumber={pageNumber} totalPages={totalPages} />
        ) : (
          <SimpleFooter pageNumber={pageNumber} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}
