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
        padding: '15mm 17mm 8mm',
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
          display: 'flex',
          alignItems: 'center',
          gap: '14pt',
          paddingBottom: '11pt',
          marginBottom: '12pt',
          borderBottom: `1.6pt solid ${C.accent}`,
          flexShrink: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ flex: 1, height: '65px' }} />
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
        <FooterPreview footer={footerDetails} pageNumber={pageNumber} totalPages={totalPages} />
      </div>
    </div>
  );
}
