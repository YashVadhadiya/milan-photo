import { BRAND } from '../constants';

const C = BRAND.colors;

interface Props {
  pageNumber: number;
  totalPages: number;
}

export default function SimpleFooter({ pageNumber, totalPages }: Props) {
  return (
    <footer
      style={{
        paddingTop: '6pt',
        marginBottom: '-15px',
        borderTop: `1.3pt solid ${C.accent}`,
        alignItems: 'flex-end',
        fontSize: '8.8pt',
        color: C.muted,
        lineHeight: 1.5,
        flexShrink: 0,
      }}
    >
      <div style={{ flex: 1 }} />
      <div style={{ fontWeight: 700, color: C.primary, textAlign: 'center' }}>Milan Photo</div>
      <div style={{ flex: 1, textAlign: 'right', fontWeight: 700, whiteSpace: 'nowrap' }}>
        Page {pageNumber} of {totalPages}
      </div>
    </footer>
  );
}
