// ─── PRESENTATION SLIDE DESIGN TOKENS ────────────────────────────────────────
// All values are in design-px (canvas = 1280 × 720).
// Never use vh/vw/% for font-sizes or spacing — use fixed px so scale() works.

export const T = {
  void:     '#03040A',
  ink:      '#070B15',
  lift:     '#0C1120',
  glass:    'rgba(255,255,255,0.030)',
  glassHi:  'rgba(255,255,255,0.060)',
  line:     'rgba(255,255,255,0.055)',
  lineHi:   'rgba(255,255,255,0.11)',

  violet:   '#7C3AED',
  violetLo: 'rgba(124,58,237,0.12)',
  violetB:  'rgba(124,58,237,0.30)',
  violetHi: '#A78BFA',
  mint:     '#10F5A0',
  mintLo:   'rgba(16,245,160,0.08)',
  mintB:    'rgba(16,245,160,0.22)',
  gold:     '#F0A500',
  goldLo:   'rgba(240,165,0,0.10)',
  goldB:    'rgba(240,165,0,0.25)',
  cyan:     '#06B6D4',
  cyanLo:   'rgba(6,182,212,0.10)',
  cyanB:    'rgba(6,182,212,0.25)',
  rose:     '#F43F5E',

  hi:       '#ECEEF8',
  mid:      '#A9AFCA',
  muted:    '#5E6580',
  ghost:    '#2E3348',

  display:  "'Clash Display', 'Syne', sans-serif",
  body:     "'DM Sans', 'Plus Jakarta Sans', sans-serif",
  mono:     "'DM Mono', 'JetBrains Mono', monospace",
}

// Canvas size — slide components are authored at exactly this size
export const CANVAS_W = 1280
export const CANVAS_H = 720