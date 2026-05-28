import { useState, useEffect, useRef, useCallback } from "react";

const CHATBOT_URL =
    "https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/05/28/04/20260528043511-6CNJUNQ6.json";

function useWindowSize() {
    const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
    useEffect(() => {
        const handler = () => setSize({ w: window.innerWidth, h: window.innerHeight });
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);
    return size;
}

// Breakpoints
const BP_MOBILE = 480;   // full-screen bottom sheet
const BP_TABLET = 768;   // wider panel, centered-ish

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [pulse, setPulse] = useState(true);
    const panelRef = useRef<HTMLDivElement>(null);
    const { w, h } = useWindowSize();

    const isMobile = w <= BP_MOBILE;
    const isTablet = w > BP_MOBILE && w <= BP_TABLET;

    // Derived panel dimensions
    const btnSize = isMobile ? 52 : 60;
    const btnBottom = isMobile ? 16 : 28;
    const btnRight = isMobile ? 16 : 28;

    const panelWidth = isMobile ? w : isTablet ? w - 32 : 380;
    const panelHeight = isMobile
        ? h * 0.88                        // 88 vh bottom sheet on mobile
        : isTablet
            ? Math.min(h - 100, 600)
            : Math.min(h - 120, 600);
    const panelRight = isMobile ? 0 : isTablet ? 16 : btnRight;
    const panelBottom = isMobile ? 0 : btnBottom + btnSize + 12;
    const panelRadius = isMobile ? "20px 20px 0 0" : "20px";

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setPulse(false);
            // Prevent body scroll on mobile when chat open
            if (isMobile) document.body.style.overflow = "hidden";
        } else {
            if (isMobile) document.body.style.overflow = "";
            const t = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(t);
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen, isMobile]);

    const handleOutside = useCallback((e: MouseEvent) => {
        const target = e.target as Element;
        if (
            panelRef.current &&
            !panelRef.current.contains(target as Node) &&
            !target.closest?.(".cw-btn")
        ) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, [handleOutside]);

    // Panel animation classes
    const panelClass = isOpen ? "cw-panel open" : "cw-panel closing";

    return (
        <>
            <style>{`
        /* ─── Backdrop (mobile only) ─── */
        .cw-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 9990;
          animation: cwFadeIn 0.2s ease;
        }
        .cw-backdrop.show { display: block; }

        @keyframes cwFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes cwFadeOut { from { opacity: 1 } to { opacity: 0 } }

        /* ─── Panel ─── */
        .cw-panel {
          position: fixed;
          z-index: 9995;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: var(--color-surface);
          box-shadow: 0 16px 56px rgba(0,0,0,0.24), 0 2px 12px rgba(0,0,0,0.12);
          transform-origin: bottom right;
          /* default hidden */
          opacity: 0;
          pointer-events: none;
          transition:
            opacity 0.28s cubic-bezier(.4,0,.2,1),
            transform 0.3s cubic-bezier(.34,1.2,.64,1);
        }

        /* Desktop / tablet: scale from corner */
        .cw-panel.desktop-anim {
          transform: scale(0.82) translateY(18px);
        }
        .cw-panel.desktop-anim.open {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: all;
        }
        .cw-panel.desktop-anim.closing {
          opacity: 0;
          transform: scale(0.86) translateY(14px);
          pointer-events: none;
        }

        /* Mobile: slide up from bottom */
        .cw-panel.mobile-anim {
          transform: translateY(100%);
          transform-origin: bottom center;
        }
        .cw-panel.mobile-anim.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }
        .cw-panel.mobile-anim.closing {
          opacity: 0;
          transform: translateY(60px);
          pointer-events: none;
        }

        /* ─── Header ─── */
        .cw-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 16px;
          background: linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-violet-dim));
          color: var(--color-text-primary);
          flex-shrink: 0;
          user-select: none;
        }

        /* Mobile drag handle */
        .cw-drag-handle {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 36px;
          height: 4px;
          border-radius: 2px;
          background: rgba(255,255,255,0.45);
        }

        .cw-avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: var(--color-surface-high);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .cw-header-info { flex: 1; }

        .cw-header-name {
          font-size: 14px; font-weight: 600;
          letter-spacing: 0.01em; line-height: 1.3;
        }

        .cw-header-status {
          font-size: 11.5px; opacity: 0.85;
          display: flex; align-items: center; gap: 5px;
          color: var(--color-text-secondary);
        }

        .cw-status-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--color-secondary);
          box-shadow: 0 0 8px color-mix(in srgb, var(--color-secondary) 60%, transparent);
        }

        .cw-close-btn {
          background: none; border: none; cursor: pointer;
          color: var(--color-text-primary);
          padding: 6px; border-radius: 8px;
          display: flex; align-items: center;
          transition: background 0.15s, color 0.15s;
          -webkit-tap-highlight-color: transparent;
        }
        .cw-close-btn:hover { background: color-mix(in srgb, var(--color-surface-high) 35%, transparent); color: #fff; }

        /* ─── iframe ─── */
        .cw-iframe-wrap {
          flex: 1;
          min-height: 0;          /* critical — allows flex child to shrink */
          overflow: hidden;
          background: var(--color-surface-dim);
        }
        .cw-iframe-wrap iframe {
          width: 100%; height: 100%;
          border: none; display: block;
        }

        /* ─── Floating Button ─── */
        .cw-btn {
          position: fixed;
          z-index: 9999;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-violet-dim));
          display: flex; align-items: center; justify-content: center;
          transition:
            transform 0.25s cubic-bezier(.34,1.56,.64,1),
            box-shadow 0.2s;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .cw-btn:hover  { transform: scale(1.1); }
        .cw-btn:active { transform: scale(0.93); }

        /* Pulse */
        .cw-btn.pulse::before {
          content: '';
          position: absolute; inset: -6px; border-radius: 50%;
          background: color-mix(in srgb, var(--color-accent-violet) 35%, transparent);
          animation: cwPulse 1.8s ease-out infinite;
        }
        @keyframes cwPulse {
          0%  { transform: scale(0.9); opacity: 0.8; }
          70% { transform: scale(1.45); opacity: 0; }
          100%{ transform: scale(1.45); opacity: 0; }
        }

        /* Icon swap */
        .cw-icon {
          position: absolute;
          transition: opacity 0.2s, transform 0.22s;
          display: flex; align-items: center; justify-content: center;
        }
        .cw-icon-chat  { opacity: 1; transform: scale(1) rotate(0deg); }
        .cw-icon-close { opacity: 0; transform: scale(0.5) rotate(-90deg); }
        .cw-btn.open .cw-icon-chat  { opacity: 0; transform: scale(0.5) rotate(90deg); }
        .cw-btn.open .cw-icon-close { opacity: 1; transform: scale(1) rotate(0deg); }

        /* Notif dot */
        .cw-notif {
          position: absolute; top: 2px; right: 2px;
          width: 13px; height: 13px; border-radius: 50%;
          background: var(--color-error);
          border: 2px solid var(--color-surface);
        }
      `}</style>

            <div className="cw-root">
                {/* Backdrop for mobile */}
                {isMobile && isVisible && (
                    <div
                        className={`cw-backdrop ${isOpen ? "show" : ""}`}
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {/* Chat Panel */}
                {isVisible && (
                    <div
                        ref={panelRef}
                        className={`${panelClass} ${isMobile ? "mobile-anim" : "desktop-anim"}`}
                        style={{
                            width: panelWidth,
                            height: panelHeight,
                            right: panelRight,
                            bottom: panelBottom,
                            borderRadius: panelRadius,
                        }}
                    >
                        <div className="cw-header" style={{ paddingTop: isMobile ? 20 : 13 }}>
                            {isMobile && <div className="cw-drag-handle" />}
                            <div className="cw-avatar">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="5" fill="white" opacity="0.9" />
                                    <path d="M9 10.5C9 9.12 10.12 8 11.5 8h1C13.88 8 15 9.12 15 10.5v.5H9v-.5z" fill="#6c63ff" />
                                    <rect x="9" y="11" width="6" height="3.5" rx="0.5" fill="#6c63ff" />
                                    <path d="M11 14.5h2v1.5h-2z" fill="#6c63ff" />
                                </svg>
                            </div>
                            <div className="cw-header-info">
                                <div className="cw-header-name">AI Assistant</div>
                                <div className="cw-header-status">
                                    <span className="cw-status-dot" />
                                    Online · Ready to help
                                </div>
                            </div>
                            <button
                                className="cw-close-btn"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close chat"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        <div className="cw-iframe-wrap">
                            <iframe
                                src={CHATBOT_URL}
                                title="AI Chatbot"
                                allow="microphone; clipboard-write"
                            />
                        </div>
                    </div>
                )}

                {/* Floating button */}
                <button
                    className={`cw-btn ${isOpen ? "open" : ""} ${pulse ? "pulse" : ""}`}
                    onClick={() => setIsOpen(v => !v)}
                    aria-label={isOpen ? "Close chat" : "Open chat"}
                    style={{
                        width: btnSize,
                        height: btnSize,
                        bottom: btnBottom,
                        right: btnRight,
                        boxShadow: `0 4px 24px rgba(99,85,255,0.45), 0 2px 8px rgba(0,0,0,0.18)`,
                    }}
                >
                    <span className="cw-icon cw-icon-chat">
                        <svg width={isMobile ? 22 : 26} height={isMobile ? 22 : 26} viewBox="0 0 24 24" fill="none">
                            <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="white" />
                            <circle cx="8" cy="11" r="1.2" fill="#6c63ff" />
                            <circle cx="12" cy="11" r="1.2" fill="#6c63ff" />
                            <circle cx="16" cy="11" r="1.2" fill="#6c63ff" />
                        </svg>
                    </span>
                    <span className="cw-icon cw-icon-close">
                        <svg width={isMobile ? 20 : 22} height={isMobile ? 20 : 22} viewBox="0 0 24 24"
                            fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </span>
                    {!isOpen && <span className="cw-notif" aria-hidden="true" />}
                </button>
            </div>
        </>
    );
}