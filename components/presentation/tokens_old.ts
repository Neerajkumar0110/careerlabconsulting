// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
export const T = {
  base:      '#020408',
  surface:   '#080D18',
  raised:    '#0E1525',
  border:    'rgba(255,255,255,0.07)',
  borderHi:  'rgba(255,255,255,0.14)',

  violet:    '#7C3AED',
  violetMid: '#9B6BF7',
  violetHi:  '#C4A8FF',
  violetBg:  'rgba(124,58,237,0.09)',
  violetRim: 'rgba(124,58,237,0.24)',

  emerald:   '#10B981',
  emeraldHi: '#34D399',
  emeraldBg: 'rgba(16,185,129,0.08)',
  emeraldRim:'rgba(16,185,129,0.22)',

  amber:     '#D97706',
  amberHi:   '#FBBF24',
  amberBg:   'rgba(217,119,6,0.09)',
  amberRim:  'rgba(217,119,6,0.24)',

  rose:      '#F43F5E',
  roseBg:    'rgba(244,63,94,0.09)',
  roseRim:   'rgba(244,63,94,0.24)',

  cyan:      '#22D3EE',
  cyanBg:    'rgba(34,211,238,0.08)',
  cyanRim:   'rgba(34,211,238,0.22)',

  t1: '#F4F6FF',
  t2: '#BCC4DC',
  t3: '#6C7693',
  t4: '#3A4160',
  t5: '#1e2130',

  white10: 'rgba(255,255,255,0.10)',
  white04: 'rgba(255,255,255,0.04)',
  white02: 'rgba(255,255,255,0.02)',
}

export const FONT_DISPLAY = "'Clash Display', sans-serif"
export const FONT_BODY    = "'DM Sans', sans-serif"
export const FONT_MONO    = "'DM Mono', monospace"

export const CSS_INJECT = `
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=dm-sans@300,400,500&f[]=dm-mono@400,500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body { overflow: hidden; background: ${T.base}; }

.pres-root {
  font-family: 'DM Sans', sans-serif;
  background: ${T.base};
  color: ${T.t1};
  user-select: none;
}

.slide-enter-right { animation: slideInR 0.48s cubic-bezier(0.22,1,0.36,1) both; }
.slide-enter-left  { animation: slideInL 0.48s cubic-bezier(0.22,1,0.36,1) both; }
.slide-exit-left   { animation: slideOutL 0.36s cubic-bezier(0.55,0,1,0.45) both; }
.slide-exit-right  { animation: slideOutR 0.36s cubic-bezier(0.55,0,1,0.45) both; }

@keyframes slideInR   { from{transform:translateX(5%);opacity:0} to{transform:none;opacity:1} }
@keyframes slideInL   { from{transform:translateX(-5%);opacity:0} to{transform:none;opacity:1} }
@keyframes slideOutL  { from{transform:none;opacity:1} to{transform:translateX(-3%);opacity:0} }
@keyframes slideOutR  { from{transform:none;opacity:1} to{transform:translateX(3%);opacity:0} }

@keyframes revealUp   { from{transform:translateY(14px);opacity:0} to{transform:none;opacity:1} }
@keyframes revealFade { from{opacity:0} to{opacity:1} }
@keyframes scaleIn    { from{transform:scale(0.96);opacity:0} to{transform:scale(1);opacity:1} }
@keyframes pulseDot   { 0%,100%{opacity:1} 50%{opacity:0.3} }
@keyframes spinRing   { to{transform:rotate(360deg)} }
@keyframes rotDevice  { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(90deg)} }
@keyframes float      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes shimmer    { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
@keyframes dash       { to{stroke-dashoffset:0} }
@keyframes orbitRing  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes barGrow    { from{transform:scaleX(0)} to{transform:scaleX(1)} }
@keyframes countUp    { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }

.r1 { animation: revealUp 0.52s cubic-bezier(0.22,1,0.36,1) 0.04s both; }
.r2 { animation: revealUp 0.52s cubic-bezier(0.22,1,0.36,1) 0.12s both; }
.r3 { animation: revealUp 0.52s cubic-bezier(0.22,1,0.36,1) 0.20s both; }
.r4 { animation: revealUp 0.52s cubic-bezier(0.22,1,0.36,1) 0.28s both; }
.r5 { animation: revealUp 0.52s cubic-bezier(0.22,1,0.36,1) 0.36s both; }
.r6 { animation: revealUp 0.52s cubic-bezier(0.22,1,0.36,1) 0.44s both; }
.rf { animation: revealFade 0.45s ease 0.06s both; }
.si { animation: scaleIn 0.42s cubic-bezier(0.22,1,0.36,1) both; }

.lift { transition: transform 0.18s ease, box-shadow 0.18s ease; }
.lift:hover { transform: translateY(-2px); }

button { cursor: pointer; font-family: 'DM Sans', sans-serif; }

::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: ${T.violet}55; border-radius: 2px; }

@media (orientation: portrait) and (max-width: 768px) {
  .portrait-lock { display: flex !important; }
  .pres-content  { display: none !important; }
}
@media (orientation: landscape), (min-width: 769px) {
  .portrait-lock { display: none !important; }
  .pres-content  { display: flex !important; }
}

input, select, textarea { font-family: 'DM Sans', sans-serif; outline: none; }
input::placeholder, textarea::placeholder { color: ${T.t3}; }
`