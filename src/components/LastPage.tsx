import type { FooterDetails } from '../types';
import { BRAND } from '../constants';
import FooterPreview from './FooterPreview';
import lastPageBg from '../../last_page.png';

const C = BRAND.colors;

interface Props {
  footerDetails: FooterDetails;
  pageNumber: number;
  totalPages: number;
}

export default function LastPage({ footerDetails, pageNumber, totalPages }: Props) {
  return (
    <div
      style={{
        width: '210mm',
        height: '297mm',
        padding: '15mm 13mm 8mm',
        fontFamily: '"Segoe UI", Arial, sans-serif',
        color: C.text,
        backgroundColor: C.paper,
        backgroundImage: `url(${lastPageBg})`,
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
          zIndex: 1,
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

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
      </div>

      <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
        <FooterPreview footer={footerDetails} pageNumber={pageNumber} totalPages={totalPages} lastPage />
      </div>
    </div>
  );
}
