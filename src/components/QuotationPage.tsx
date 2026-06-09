import type { EventDay, ClientDetails } from '../types';
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

export default function QuotationPage({
  days,
  clientDetails,
  showClient,
  showAmount,
  amount,
  pageNumber,
  totalPages,
}: Props) {
  return (
    <div
      style={{
        width: '210mm',
        height: '297mm',
        padding: '16mm 18mm',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '12pt',
        color: C.text,
        lineHeight: '1.5',
        backgroundColor: '#ffffff',
        position: 'relative',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `url(${BRAND.logoPath}) center / 40% no-repeat`,
          opacity: 0.05,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
        }}
      >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14pt',
          paddingBottom: '12pt',
          borderBottom: `3pt solid ${C.accent}`,
          marginBottom: '16pt',
          flexShrink: 0,
        }}
      >
        <img
          src={BRAND.logoPath}
          alt="logo"
          style={{
            width: '56pt',
            height: '56pt',
            objectFit: 'contain',
            borderRadius: '6pt',
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '22pt', fontWeight: 700, color: C.primary, letterSpacing: '0.8pt' }}>
            {BRAND.businessName}
          </div>
          <div style={{ fontSize: '10pt', color: C.muted, marginTop: '3pt' }}>
            {BRAND.contactPerson} &nbsp;|&nbsp; {BRAND.mobile}
          </div>
        </div>
        <div style={{ fontSize: '9.5pt', color: C.muted, textAlign: 'right', lineHeight: '1.6' }}>
          <div>{BRAND.tagline}</div>
          <div style={{ color: C.accent, fontWeight: 600 }}>{BRAND.instagram}</div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        {showClient && hasClientData(clientDetails) && (
          <div
            style={{
              borderLeft: `3.5pt solid ${C.accent}`,
              background: C.lightGold,
              borderRadius: '4pt',
              padding: '10pt 14pt',
              marginBottom: '16pt',
            }}
          >
            {clientDetails.name && (
              <div style={{ display: 'flex', gap: '8pt', fontSize: '10.5pt', marginBottom: '2pt' }}>
                <span style={{ color: C.muted, width: '70pt', flexShrink: 0, fontWeight: 600 }}>Client</span>
                <span>{clientDetails.name}</span>
              </div>
            )}
            {clientDetails.mobile && (
              <div style={{ display: 'flex', gap: '8pt', fontSize: '10.5pt', marginBottom: '2pt' }}>
                <span style={{ color: C.muted, width: '70pt', flexShrink: 0, fontWeight: 600 }}>Mobile</span>
                <span>{clientDetails.mobile}</span>
              </div>
            )}
            {clientDetails.address && (
              <div style={{ display: 'flex', gap: '8pt', fontSize: '10.5pt', marginBottom: '2pt' }}>
                <span style={{ color: C.muted, width: '70pt', flexShrink: 0, fontWeight: 600 }}>Address</span>
                <span>{clientDetails.address}</span>
              </div>
            )}
            {clientDetails.eventName && (
              <div style={{ display: 'flex', gap: '8pt', fontSize: '10.5pt', marginBottom: '2pt' }}>
                <span style={{ color: C.muted, width: '70pt', flexShrink: 0, fontWeight: 600 }}>Event</span>
                <span>{clientDetails.eventName}</span>
              </div>
            )}
            {clientDetails.venue && (
              <div style={{ display: 'flex', gap: '8pt', fontSize: '10.5pt' }}>
                <span style={{ color: C.muted, width: '70pt', flexShrink: 0, fontWeight: 600 }}>Venue</span>
                <span>{clientDetails.venue}</span>
              </div>
            )}
          </div>
        )}

        {days.map((day) => {
          const preItems = day.preProduction.filter((i) => i.enabled);
          const postItems = day.postProduction.filter((i) => i.enabled);
          const hasPre = preItems.length > 0;
          const hasPost = postItems.length > 0;
          if (!hasPre && !hasPost) return null;

          return (
            <div
              key={day.id}
              style={{
                border: `1pt solid ${C.accent}44`,
                borderRadius: '5pt',
                overflow: 'hidden',
                marginBottom: '14pt',
                boxShadow: '0 1pt 4pt rgba(0,0,0,0.06)',
              }}
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${C.primary}, #2d3a4a)`,
                  color: '#fff',
                  padding: '7pt 12pt',
                  fontSize: '11.5pt',
                  fontWeight: 700,
                  letterSpacing: '0.4pt',
                  borderBottom: `1.5pt solid ${C.accent}`,
                }}
              >
                {day.label}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {hasPre && (
                  <div
                    style={{
                      flex: 1,
                      padding: '10pt 12pt',
                      ...(hasPost ? { borderRight: `0.5pt solid ${C.accent}33` } : {}),
                    }}
                  >
                    <div
                      style={{
                        fontSize: '9.5pt',
                        fontWeight: 700,
                        color: C.primary,
                        textTransform: 'uppercase',
                        letterSpacing: '0.8pt',
                        marginBottom: '7pt',
                        paddingBottom: '4pt',
                        borderBottom: `1.5pt solid ${C.accent}44`,
                      }}
                    >
                      Pre-Production / Team
                    </div>
                    {preItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '3pt 0',
                          borderBottom: '0.4pt solid #e5e7eb',
                          fontSize: '10pt',
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <span>{item.label}</span>
                          {item.notes && (
                            <div style={{ fontSize: '9pt', color: C.muted, marginTop: '1pt' }}>
                              {item.notes}
                            </div>
                          )}
                        </div>
                        <span style={{ color: C.muted, marginLeft: '8pt', flexShrink: 0, fontWeight: 600 }}>
                          {'\u00D7'} {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {hasPost && (
                  <div style={{ flex: 1, padding: '10pt 12pt' }}>
                    <div
                      style={{
                        fontSize: '9.5pt',
                        fontWeight: 700,
                        color: C.primary,
                        textTransform: 'uppercase',
                        letterSpacing: '0.8pt',
                        marginBottom: '7pt',
                        paddingBottom: '4pt',
                        borderBottom: `1.5pt solid ${C.accent}44`,
                      }}
                    >
                      Post-Production / Deliverables
                    </div>
                    {postItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '3pt 0',
                          borderBottom: '0.4pt solid #e5e7eb',
                          fontSize: '10pt',
                        }}
                      >
                        <span style={{ flex: 1 }}>{item.label}</span>
                        <span style={{ color: C.muted, marginLeft: '8pt', flexShrink: 0, fontWeight: 600 }}>
                          {'\u00D7'} {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {showAmount && amount != null && amount > 0 && (
          <div
            style={{
              border: `2pt solid ${C.accent}`,
              borderRadius: '5pt',
              padding: '10pt 16pt',
              marginTop: '10pt',
              textAlign: 'right',
              background: C.lightGold,
            }}
          >
            <div style={{ fontSize: '10.5pt', color: C.muted, marginBottom: '3pt', fontWeight: 600 }}>
              Total Amount
            </div>
            <div style={{ fontSize: '20pt', fontWeight: 700, color: C.primary }}>
              {'\u20B9'} {amount.toLocaleString('en-IN')}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          borderTop: `2.5pt solid ${C.accent}`,
          paddingTop: '10pt',
          marginTop: '12pt',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          fontSize: '9pt',
          color: C.muted,
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ fontWeight: 600, color: C.primary }}>{BRAND.businessName}</div>
          <div>{BRAND.contactPerson} | {BRAND.mobile}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: C.accent, fontWeight: 600 }}>{BRAND.instagram}</div>
          <div style={{ fontSize: '9pt', marginTop: '3pt' }}>
            Page {pageNumber} of {totalPages}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
