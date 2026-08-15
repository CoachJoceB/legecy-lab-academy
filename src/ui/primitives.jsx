import React, { useState } from "react";

// Shared, theme-token-driven UI primitives. Originally written inside
// AthleteDevelopmentApp, extracted here because they're generic enough for
// any part of the app to use, not specific to athlete development at all.
// Each takes an `S` theme-token object ({ card, card2, border, text, sub })
// so callers control light/dark and brand colors without these components
// needing to know about theming themselves.

export function Bar({ v, color, h = 8, bg }) {
  return (
    <div style={{ background: bg || '#1a1a1a', borderRadius: 99, height: h, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(100, Math.max(0, v))}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 0.6s ease' }} />
    </div>
  );
}

export function Card({ children, style = {}, S, accent }) {
  return (
    <div className="ll-fadein" style={{ background: S.card, border: `1px solid ${S.border}`, borderLeft: accent ? `4px solid ${accent}` : undefined, borderRadius: 12, padding: 20, ...style }}>
      {children}
    </div>
  );
}

export function Chip({ label, color }) {
  return (
    <span style={{ background: color + '22', color, border: `1px solid ${color}44`, borderRadius: 5, padding: '2px 10px', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
      {label}
    </span>
  );
}

export function Btn({ children, onClick, color, outline = false, full = false, sm = false, style = {}, disabled = false }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: outline ? 'transparent' : h ? '#a00e18' : color, color: outline ? color : '#fff', border: `2px solid ${color}`, borderRadius: 8, padding: sm ? '8px 18px' : '14px 28px', fontSize: sm ? 12 : 15, fontWeight: 700, fontFamily: "Verdana, Geneva, sans-serif", cursor: disabled ? 'not-allowed' : 'pointer', letterSpacing: 1.2, transition: 'all 0.18s', textTransform: 'uppercase', width: full ? '100%' : undefined, opacity: disabled ? 0.5 : 1, ...style }}>
      {children}
    </button>
  );
}

export function Input({ value, onChange, placeholder, type = 'text', style = {}, S }) {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{ background: S.card2, border: `1px solid ${S.border}`, borderRadius: 8, padding: '12px 14px', color: S.text, fontFamily: "Verdana, Geneva, sans-serif", fontSize: 15, width: '100%', ...style }}
    />
  );
}

export function Select({ value, onChange, options, S, style = {} }) {
  return (
    <select value={value} onChange={onChange}
      style={{ background: S.card2, border: `1px solid ${S.border}`, borderRadius: 8, padding: '12px 14px', color: S.text, fontFamily: "Verdana, Geneva, sans-serif", fontSize: 14, width: '100%', ...style }}>
      {options.map(o => <option key={o.v || o} value={o.v || o}>{o.l || o}</option>)}
    </select>
  );
}

export function Label({ children, S }) {
  return <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: S.sub, marginBottom: 10, textTransform: 'uppercase' }}>{children}</div>;
}

export function SectionTitle({ children }) {
  return <div style={{ fontFamily: "Verdana, Geneva, sans-serif", fontSize: 36, letterSpacing: 2, marginBottom: 4 }}>{children}</div>;
}
