import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '96px',
          background: 'radial-gradient(circle at 20% 20%, rgba(0,255,209,0.2), transparent 60%), radial-gradient(circle at 80% 30%, rgba(0,255,209,0.1), transparent 55%)',
          backgroundColor: '#040404',
          color: '#f5f5f5',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            padding: '12px 20px',
            borderRadius: '9999px',
            border: '1px solid rgba(0,255,209,0.4)',
            backgroundColor: 'rgba(0,255,209,0.08)',
            fontSize: '20px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '28px',
          }}
        >
          Creative Technologist
        </div>
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Nicky Bruno
        </h1>
        <p
          style={{
            fontSize: '28px',
            marginTop: '24px',
            maxWidth: '720px',
            color: 'rgba(245,245,245,0.78)',
            lineHeight: 1.4,
          }}
        >
          Designing intelligent experiences at the intersection of design, code, and AI automation.
        </p>
      </div>
    ),
    size
  );
}
