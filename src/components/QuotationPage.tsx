import type { CSSProperties } from 'react';
import type { EventDay, ClientDetails, LineItem } from '../types';
import { BRAND } from '../constants';

interface Props {
  days: EventDay[];
  clientDetails: ClientDetails;
  showClient: boolean;
  showAmount: boolean;
  amount: number | null;
  pageNumber: number;
  totalPages: number;
}

const C = BRAND.colors;

function hasClientData(c: ClientDetails): boolean {
  return !!(c.name || c.mobile || c.address || c.eventName || c.venue);
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
          width: '58pt',
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4pt' }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: '5pt 0',
              borderBottom: `0.5pt solid ${C.line}`,
              breakInside: 'avoid',
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '10pt', color: C.text, fontWeight: 650 }}>
                {itemLabel(item)}
              </div>
              {item.notes && (
                <div style={{ marginTop: '1pt', fontSize: '8.5pt', color: C.muted }}>
                  {item.notes}
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
  showClient,
  showAmount,
  amount,
  pageNumber,
  totalPages,
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
        padding: '15mm 17mm 14mm',
        fontFamily: '"Segoe UI", Arial, sans-serif',
        fontSize: '10pt',
        color: C.text,
        lineHeight: 1.45,
        backgroundColor: C.paper,
        backgroundImage: `url(${BRAND.backgroundPath})`,
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
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.68) 52%, rgba(255,255,255,0.25) 100%)',
          pointerEvents: 'none',
        }}
      />

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
            display: 'flex',
            alignItems: 'center',
            gap: '14pt',
            paddingBottom: '11pt',
            marginBottom: '12pt',
            borderBottom: `1.6pt solid ${C.accent}`,
            flexShrink: 0,
          }}
        >
          <img
            src={BRAND.logoPath}
            alt="logo"
            style={{
              width: '54pt',
              height: '54pt',
              objectFit: 'contain',
              borderRadius: '6pt',
              background: 'rgba(255,255,255,0.72)',
              padding: '4pt',
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '24pt',
                color: C.primary,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              Photography Quotation
            </div>
            <div style={{ marginTop: '5pt', fontSize: '9.5pt', color: C.muted, fontWeight: 600 }}>
              {BRAND.businessName} | {BRAND.tagline}
            </div>
          </div>
          <div
            style={{
              ...glassPanel,
              boxShadow: 'none',
              padding: '8pt 10pt',
              textAlign: 'right',
              minWidth: '92pt',
            }}
          >
            <div style={{ fontSize: '8.5pt', color: C.muted, fontWeight: 700 }}>Prepared By</div>
            <div style={{ fontSize: '10pt', color: C.primary, fontWeight: 800 }}>{BRAND.contactPerson}</div>
            <div style={{ fontSize: '8.8pt', color: C.muted }}>{BRAND.mobile}</div>
          </div>
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
                    <DetailRow label="Location" value={clientDetails.address} />
                    <DetailRow label="Venue" value={clientDetails.venue} />
                    <DetailRow label="Event" value={clientDetails.eventName} />
                  </div>
                </div>
              </div>
            </section>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '9pt' }}>
            {visibleDays.length === 0 && (
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
                  <div
                    style={{
                      border: '0.7pt solid rgba(255,255,255,0.35)',
                      borderRadius: '999pt',
                      padding: '2pt 7pt',
                      fontSize: '8.5pt',
                      fontWeight: 700,
                      color: C.lightGold,
                    }}
                  >
                    Event {index + 1}
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

        <footer
          style={{
            marginTop: '11pt',
            paddingTop: '8pt',
            borderTop: `1.3pt solid ${C.accent}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: '8.8pt',
            color: C.muted,
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ fontWeight: 800, color: C.primary }}>{BRAND.businessName}</div>
            <div>{BRAND.contactPerson} | {BRAND.mobile}</div>
          </div>
          <div style={{ textAlign: 'right', fontWeight: 700 }}>
            Page {pageNumber} of {totalPages}
          </div>
        </footer>
      </div>
    </div>
  );
}
