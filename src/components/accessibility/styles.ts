export const accessibilityStyles = `
/* ==========================================================================
   ENTERPRISE ACCESSIBILITY WIDGET STYLES
   Modern, Professional, Clean & Portable (WCAG 2.1 AA Compliant)
   ========================================================================== */

/* --- High-Legibility / Dyslexia Font Support --- */
@import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=Lexend:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* ==========================================================================
   PAGE-LEVEL A11Y OVERRIDES (Applied dynamically to <html> via data-attributes)
   ========================================================================== */

/* --- Font Scaling --- */
html[data-a11y-font-scale="110"] {
  font-size: 110% !important;
}
html[data-a11y-font-scale="120"] {
  font-size: 120% !important;
}
html[data-a11y-font-scale="130"] {
  font-size: 130% !important;
}
html[data-a11y-font-scale="140"] {
  font-size: 140% !important;
}
html[data-a11y-font-scale="150"] {
  font-size: 150% !important;
}

/* --- Line Height --- */
html[data-a11y-line-height="1.8"] body,
html[data-a11y-line-height="1.8"] p,
html[data-a11y-line-height="1.8"] li,
html[data-a11y-line-height="1.8"] span,
html[data-a11y-line-height="1.8"] a {
  line-height: 1.85 !important;
}
html[data-a11y-line-height="2.2"] body,
html[data-a11y-line-height="2.2"] p,
html[data-a11y-line-height="2.2"] li,
html[data-a11y-line-height="2.2"] span,
html[data-a11y-line-height="2.2"] a {
  line-height: 2.2 !important;
}

/* --- Letter Spacing --- */
html[data-a11y-letter-spacing="wide"] body,
html[data-a11y-letter-spacing="wide"] * {
  letter-spacing: 0.08em !important;
}
html[data-a11y-letter-spacing="extra-wide"] body,
html[data-a11y-letter-spacing="extra-wide"] * {
  letter-spacing: 0.16em !important;
}

/* --- Text Alignment --- */
html[data-a11y-align="left"] body,
html[data-a11y-align="left"] p,
html[data-a11y-align="left"] h1,
html[data-a11y-align="left"] h2,
html[data-a11y-align="left"] h3,
html[data-a11y-align="left"] h4,
html[data-a11y-align="left"] h5,
html[data-a11y-align="left"] h6 {
  text-align: left !important;
}
html[data-a11y-align="center"] body,
html[data-a11y-align="center"] p,
html[data-a11y-align="center"] h1,
html[data-a11y-align="center"] h2,
html[data-a11y-align="center"] h3,
html[data-a11y-align="center"] h4,
html[data-a11y-align="center"] h5,
html[data-a11y-align="center"] h6 {
  text-align: center !important;
}
html[data-a11y-align="right"] body,
html[data-a11y-align="right"] p,
html[data-a11y-align="right"] h1,
html[data-a11y-align="right"] h2,
html[data-a11y-align="right"] h3,
html[data-a11y-align="right"] h4,
html[data-a11y-align="right"] h5,
html[data-a11y-align="right"] h6 {
  text-align: right !important;
}
html[data-a11y-align="justify"] body,
html[data-a11y-align="justify"] p {
  text-align: justify !important;
}

/* --- Dyslexia & High-Legibility Font --- */
html[data-a11y-dyslexia="true"] body,
html[data-a11y-dyslexia="true"] p,
html[data-a11y-dyslexia="true"] h1,
html[data-a11y-dyslexia="true"] h2,
html[data-a11y-dyslexia="true"] h3,
html[data-a11y-dyslexia="true"] h4,
html[data-a11y-dyslexia="true"] h5,
html[data-a11y-dyslexia="true"] h6,
html[data-a11y-dyslexia="true"] span,
html[data-a11y-dyslexia="true"] a,
html[data-a11y-dyslexia="true"] button,
html[data-a11y-dyslexia="true"] input {
  font-family: 'Lexend', 'Atkinson Hyperlegible', sans-serif !important;
}

/* --- Highlight Links --- */
html[data-a11y-highlight-links="true"] a:not(.a11y-widget-root *) {
  background-color: #fef08a !important;
  color: #0f172a !important;
  text-decoration: underline !important;
  text-decoration-thickness: 2px !important;
  text-underline-offset: 3px !important;
  border-radius: 3px !important;
  padding: 1px 4px !important;
  font-weight: 700 !important;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
}

/* --- Highlight Titles --- */
html[data-a11y-highlight-titles="true"] h1:not(.a11y-widget-root *),
html[data-a11y-highlight-titles="true"] h2:not(.a11y-widget-root *),
html[data-a11y-highlight-titles="true"] h3:not(.a11y-widget-root *),
html[data-a11y-highlight-titles="true"] h4:not(.a11y-widget-root *),
html[data-a11y-highlight-titles="true"] h5:not(.a11y-widget-root *),
html[data-a11y-highlight-titles="true"] h6:not(.a11y-widget-root *) {
  background-color: rgba(254, 240, 138, 0.35) !important;
  border-left: 4px solid #F0C04A !important;
  padding-left: 10px !important;
  border-radius: 0 4px 4px 0 !important;
}

/* --- Contrast Modes --- */
html[data-a11y-contrast="dark"] {
  background-color: #090d16 !important;
  color: #f8fafc !important;
}
html[data-a11y-contrast="dark"] body {
  background-color: #090d16 !important;
  color: #f8fafc !important;
}
html[data-a11y-contrast="dark"] *:not(.a11y-widget-root *):not(svg):not(path):not(img):not(video) {
  background-color: #111827 !important;
  color: #f8fafc !important;
  border-color: #374151 !important;
}
html[data-a11y-contrast="dark"] a:not(.a11y-widget-root *) {
  color: #60a5fa !important;
}

html[data-a11y-contrast="light"] {
  background-color: #ffffff !important;
  color: #000000 !important;
}
html[data-a11y-contrast="light"] body {
  background-color: #ffffff !important;
  color: #000000 !important;
}
html[data-a11y-contrast="light"] *:not(.a11y-widget-root *):not(svg):not(path):not(img):not(video) {
  background-color: #ffffff !important;
  color: #000000 !important;
  border-color: #000000 !important;
}
html[data-a11y-contrast="light"] a:not(.a11y-widget-root *) {
  color: #0000ee !important;
}

html[data-a11y-contrast="invert"] {
  filter: invert(100%) hue-rotate(180deg) !important;
}
html[data-a11y-contrast="invert"] img,
html[data-a11y-contrast="invert"] video,
html[data-a11y-contrast="invert"] iframe,
html[data-a11y-contrast="invert"] .a11y-widget-root {
  filter: invert(100%) hue-rotate(180deg) !important;
}

html[data-a11y-contrast="monochrome"] {
  filter: grayscale(100%) !important;
}

/* --- Saturation --- */
html[data-a11y-saturation="low"] {
  filter: saturate(40%) !important;
}
html[data-a11y-saturation="high"] {
  filter: saturate(190%) !important;
}

/* --- Stop Animations --- */
html[data-a11y-stop-animations="true"] *,
html[data-a11y-stop-animations="true"] *::before,
html[data-a11y-stop-animations="true"] *::after {
  animation-duration: 0.001s !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.001s !important;
  scroll-behavior: auto !important;
}

/* --- Big Cursors --- */
html[data-a11y-cursor="white"],
html[data-a11y-cursor="white"] * {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 24 24' fill='%23ffffff' stroke='%23000000' stroke-width='1.8'%3E%3Cpath d='M3 3l7 18 3-7 7-3L3 3z'/%3E%3C/svg%3E"), auto !important;
}
html[data-a11y-cursor="black"],
html[data-a11y-cursor="black"] * {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 24 24' fill='%23000000' stroke='%23ffffff' stroke-width='1.8'%3E%3Cpath d='M3 3l7 18 3-7 7-3L3 3z'/%3E%3C/svg%3E"), auto !important;
}

/* ==========================================================================
   READING AIDS OVERLAYS (Reading Mask & Reading Ruler Guide)
   Hardware-accelerated with 0ms lag tracking
   ========================================================================== */

.a11y-reading-mask-top,
.a11y-reading-mask-bottom {
  position: fixed;
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.78);
  pointer-events: none;
  z-index: 99998;
  will-change: height;
  transition: none !important;
}

.a11y-reading-mask-top {
  top: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
}

.a11y-reading-mask-bottom {
  bottom: 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.45);
}

.a11y-reading-guide-line {
  position: fixed;
  left: 0;
  right: 0;
  height: 3px;
  background: #F0C04A;
  box-shadow: 0 0 14px rgba(240, 192, 74, 0.85);
  pointer-events: none;
  z-index: 99998;
  will-change: top;
  transition: none !important;
}

/* Text Magnifier Tooltip */
.a11y-text-magnifier {
  position: fixed;
  left: 0;
  top: 0;
  padding: 12px 18px;
  background: #0f172a;
  color: #f8fafc;
  border-radius: 10px;
  font-size: 20px;
  line-height: 1.45;
  font-weight: 600;
  max-width: 480px;
  pointer-events: none;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
  border: 1.5px solid #F0C04A;
  z-index: 99998;
  will-change: transform;
  transition: none !important;
}

/* ==========================================================================
   WIDGET UI COMPONENTS (Scoped to .a11y-widget-root)
   ========================================================================== */

.a11y-widget-root {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #0f172a;
  font-size: 14px;
  line-height: 1.5;
  box-sizing: border-box;
}

.a11y-widget-root *,
.a11y-widget-root *::before,
.a11y-widget-root *::after {
  box-sizing: border-box;
}

/* --- Floating Launcher Button (Draggable) --- */
.a11y-trigger-btn {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: grab;
  touch-action: none;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.25), 0 2px 6px rgba(0, 0, 0, 0.12);
  transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease;
  outline: none;
  user-select: none;
  will-change: left, top, transform;
}

.a11y-trigger-btn:hover:not(.a11y-trigger-btn--dragging) {
  transform: scale(1.08) translateY(-2px);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.35);
}

.a11y-trigger-btn--dragging {
  cursor: grabbing !important;
  transform: scale(1.12) !important;
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.45) !important;
  transition: none !important;
}

.a11y-trigger-btn:focus-visible {
  outline: 3px solid #F0C04A;
  outline-offset: 3px;
}

.a11y-trigger-badge {
  position: absolute;
  top: -3px;
  right: -3px;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 10px;
  background: #10b981;
  color: #ffffff;
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.45);
  border: 2px solid #ffffff;
}

/* --- Backdrop & Modal Panel --- */
.a11y-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  animation: a11yFadeIn 0.2s ease-out;
}

.a11y-panel {
  position: fixed;
  width: 440px;
  max-width: calc(100vw - 32px);
  max-height: min(680px, calc(100vh - 48px));
  height: auto;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 24px 60px -12px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(226, 232, 240, 0.85);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: a11ySlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Positioning Modifiers */
.a11y-panel--bottom-left {
  bottom: 24px;
  left: 24px;
}
.a11y-panel--bottom-right {
  bottom: 24px;
  right: 24px;
}
.a11y-panel--top-left {
  top: 24px;
  left: 24px;
}
.a11y-panel--top-right {
  top: 24px;
  right: 24px;
}

/* --- Panel Header --- */
.a11y-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(135deg, #142544 0%, #1f3864 100%);
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.a11y-header-title-box {
  display: flex;
  align-items: center;
  gap: 12px;
}

.a11y-header-icon-badge {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(176, 141, 87, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.a11y-header-titles {
  display: flex;
  flex-direction: column;
}

.a11y-header-titles h3 {
  margin: 0;
  font-size: 15.5px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #ffffff !important;
  line-height: 1.2;
}

.a11y-header-subtitle {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 2px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.a11y-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.a11y-active-pill {
  padding: 3px 8px;
  border-radius: 20px;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.4);
  color: #34d399;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
}

.a11y-active-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px #10b981;
}

.a11y-btn-icon {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  color: #f1f5f9;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.a11y-btn-icon:hover {
  background: rgba(255, 255, 255, 0.22);
  color: #ffffff;
}

/* --- Tab Navigation (Segmented Pill Bar) --- */
.a11y-tabs {
  display: flex;
  background: #f8fafc;
  padding: 6px 12px;
  border-bottom: 1px solid #e2e8f0;
  gap: 6px;
}

.a11y-tab-btn {
  flex: 1;
  padding: 8px 10px;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 12.5px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.18s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.a11y-tab-btn:hover:not(.a11y-tab-btn--active) {
  color: #1e293b;
  background: rgba(241, 245, 249, 0.8);
}

.a11y-tab-btn--active {
  background: #ffffff;
  color: #1f3864;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.8);
}

/* --- Panel Scroll Content --- */
.a11y-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.a11y-body::-webkit-scrollbar {
  width: 5px;
}
.a11y-body::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

/* --- Section Heading --- */
.a11y-section-title {
  font-size: 11.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
  margin: 4px 0 8px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* --- Profiles Grid --- */
.a11y-profiles-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.a11y-profile-card {
  padding: 12px 14px;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 94px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.a11y-profile-card:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
}

.a11y-profile-card--active {
  background: #f0f7ff;
  border-color: #1f3864;
  box-shadow: 0 0 0 1px #1f3864, 0 4px 14px rgba(31, 56, 100, 0.1);
}

.a11y-profile-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.a11y-profile-icon-wrap {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: #f1f5f9;
  color: #1f3864;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.a11y-profile-card--active .a11y-profile-icon-wrap {
  background: #1f3864;
  color: #ffffff;
}

.a11y-status-switch {
  width: 32px;
  height: 18px;
  border-radius: 10px;
  background: #e2e8f0;
  position: relative;
  transition: background 0.2s ease;
}

.a11y-status-switch--active {
  background: #10b981;
}

.a11y-status-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffffff;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
}

.a11y-status-switch--active .a11y-status-thumb {
  transform: translateX(14px);
}

.a11y-profile-card-title {
  font-weight: 700;
  font-size: 12.5px;
  color: #0f172a;
  line-height: 1.25;
}

.a11y-profile-card-sub {
  font-size: 11px;
  color: #64748b;
  line-height: 1.3;
  margin-top: 3px;
}

/* --- Section Containers & Tool Tiles --- */
.a11y-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.a11y-tools-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

/* Stepper Box (Font scaling) */
.a11y-stepper-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.a11y-stepper-btn {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  cursor: pointer;
  transition: all 0.15s ease;
}

.a11y-stepper-btn:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.a11y-stepper-value {
  font-size: 15px;
  font-weight: 800;
  color: #1f3864;
  min-width: 50px;
  text-align: center;
}

.a11y-chip-group {
  display: flex;
  gap: 6px;
  margin-top: 10px;
}

.a11y-chip {
  flex: 1;
  padding: 5px 0;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  text-align: center;
  transition: all 0.15s ease;
}

.a11y-chip:hover {
  background: #f1f5f9;
}

.a11y-chip--active {
  background: #1f3864;
  color: #ffffff;
  border-color: #1f3864;
}

/* Multi-Choice Option Bar */
.a11y-choice-group {
  display: flex;
  background: #f1f5f9;
  border-radius: 8px;
  padding: 3px;
  gap: 3px;
}

.a11y-choice-btn {
  flex: 1;
  border: none;
  background: transparent;
  padding: 7px 6px;
  font-size: 11.5px;
  font-weight: 600;
  color: #64748b;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.a11y-choice-btn--active {
  background: #ffffff;
  color: #1f3864;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
  font-weight: 700;
}

/* Feature Toggle Row Card */
.a11y-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.18s ease;
  text-align: left;
}

.a11y-toggle-row:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
}

.a11y-toggle-row--active {
  border-color: #1f3864;
  background: #f0f7ff;
}

.a11y-toggle-row-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.a11y-toggle-row-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #f1f5f9;
  color: #1f3864;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.a11y-toggle-row--active .a11y-toggle-row-icon {
  background: #1f3864;
  color: #ffffff;
}

.a11y-toggle-row-text h4 {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.25;
}

.a11y-toggle-row-text p {
  margin: 2px 0 0 0;
  font-size: 11px;
  color: #64748b;
  line-height: 1.3;
}

/* Color Theme Swatch Cards */
.a11y-theme-cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.a11y-theme-card {
  padding: 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.18s ease;
}

.a11y-theme-card:hover {
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.a11y-theme-card--active {
  border-color: #1f3864;
  background: #f0f7ff;
  box-shadow: 0 0 0 1px #1f3864;
}

.a11y-theme-preview {
  height: 42px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.a11y-theme-preview--dark {
  background: #090d16;
  color: #60a5fa;
}

.a11y-theme-preview--light {
  background: #ffffff;
  color: #0f172a;
  border-color: #cbd5e1;
}

.a11y-theme-preview--invert {
  background: linear-gradient(135deg, #090d16 50%, #ffffff 50%);
  color: #F0C04A;
}

.a11y-theme-preview--mono {
  background: #475569;
  color: #f8fafc;
}

.a11y-theme-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.a11y-theme-card-title {
  font-size: 12px;
  font-weight: 700;
  color: #0f172a;
}

/* TTS Player Banner */
.a11y-tts-card {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.a11y-tts-btn {
  background: #1f3864;
  color: #ffffff;
  border: none;
  padding: 9px 16px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.15s ease;
  box-shadow: 0 2px 6px rgba(31, 56, 100, 0.2);
}

.a11y-tts-btn:hover {
  background: #16294a;
  transform: scale(1.02);
}

/* --- Panel Footer --- */
.a11y-footer {
  padding: 12px 20px;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.a11y-btn-reset {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.a11y-btn-reset:hover {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #dc2626;
}

.a11y-compliance-badge {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* --- Mobile Drag Indicator Handle --- */
.a11y-drag-indicator {
  width: 38px;
  height: 4.5px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 3px;
  margin: 0 auto 10px auto;
  display: none;
}

/* --- Keyframe Animations --- */
@keyframes a11yFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes a11ySlideIn {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes a11ySlideUpMobile {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ==========================================================================
   MOBILE RESPONSIVENESS (Screens <= 640px)
   Native Mobile Bottom-Sheet & Touch-Friendly Sizing
   ========================================================================== */
@media (max-width: 640px) {
  .a11y-drag-indicator {
    display: block;
  }

  .a11y-panel {
    width: 100vw !important;
    max-width: 100vw !important;
    height: min(84vh, 680px) !important;
    max-height: 86vh !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    top: auto !important;
    border-radius: 24px 24px 0 0 !important;
    border: none !important;
    box-shadow: 0 -10px 40px rgba(15, 23, 42, 0.3) !important;
    animation: a11ySlideUpMobile 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }

  .a11y-header {
    padding: 12px 18px 14px 18px !important;
    flex-direction: column !important;
    align-items: stretch !important;
    gap: 8px;
  }

  .a11y-header-top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .a11y-tabs {
    padding: 6px 10px !important;
    gap: 4px !important;
  }

  .a11y-tab-btn {
    padding: 7px 4px !important;
    font-size: 11.5px !important;
    gap: 3px !important;
  }

  .a11y-body {
    padding: 14px 16px !important;
    gap: 14px !important;
  }

  .a11y-profiles-grid {
    grid-template-columns: 1fr !important;
    gap: 8px !important;
  }

  .a11y-tools-grid {
    grid-template-columns: 1fr !important;
    gap: 8px !important;
  }

  .a11y-chip-group {
    flex-wrap: wrap !important;
  }

  .a11y-chip {
    flex: 1 1 calc(33.333% - 6px) !important;
    min-height: 32px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .a11y-choice-group {
    flex-wrap: wrap !important;
  }

  .a11y-choice-btn {
    padding: 8px 4px !important;
    font-size: 11px !important;
  }

  .a11y-toggle-row {
    padding: 10px 12px !important;
  }

  .a11y-footer {
    padding: 12px 18px max(16px, env(safe-area-inset-bottom, 16px)) 18px !important;
  }

  .a11y-trigger-btn {
    width: 50px !important;
    height: 50px !important;
  }
}
`
