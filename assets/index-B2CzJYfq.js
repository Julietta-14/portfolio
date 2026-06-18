const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Navbar-DL7IwSCi.js","assets/rolldown-runtime-BYbx6iT9.js","assets/framer-motion-MgzspWX6.js","assets/react-vendor-Cl8qYI4e.js","assets/theme.config-ByPX7Uso.js","assets/Hero-BgFXrVFo.js","assets/right-arrow-Bp5TIJxC.js","assets/Skills-B2PxZVrS.js","assets/Projects-DjQ275JI.js","assets/Stats-BBFI2wmY.js","assets/Timeline-C2l5gLtT.js","assets/Appreciation-CuxqQeW6.js","assets/Contact-D-fydZJZ.js","assets/Footer-D0hBQSjN.js","assets/ProjectsSection-Btp7J4XG.js"])))=>i.map(i=>d[i]);
import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{a as t,c as n,l as r,n as i,o as a}from"./framer-motion-MgzspWX6.js";import{f as o}from"./react-vendor-Cl8qYI4e.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var s=e(r(),1),c=o(),l=n(),u=(0,s.createContext)(null);function d({children:e}){let[t,n]=(0,s.useState)(()=>localStorage.getItem(`portfolio-theme`)||(window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`));return(0,s.useEffect)(()=>{document.documentElement.setAttribute(`data-theme`,t)},[t]),(0,s.useEffect)(()=>{let e=window.matchMedia(`(prefers-color-scheme: dark)`),t=e=>{localStorage.getItem(`portfolio-theme`)||n(e.matches?`dark`:`light`)};return e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]),(0,l.jsx)(u.Provider,{value:{theme:t,toggleTheme:()=>{n(e=>{let t=e===`dark`?`light`:`dark`;return localStorage.setItem(`portfolio-theme`,t),t})},isDark:t===`dark`},children:e})}function f(){let e=(0,s.useContext)(u);if(!e)throw Error(`useTheme must be used inside ThemeProvider`);return e}function p(){let e=(0,s.useRef)(null),t=(0,s.useRef)(null),n=(0,s.useRef)({x:-100,y:-100}),r=(0,s.useRef)({x:-100,y:-100});return(0,s.useEffect)(()=>{let e,i=()=>{r.current.x+=(n.current.x-r.current.x)*.18,r.current.y+=(n.current.y-r.current.y)*.18,t.current&&(t.current.style.transform=`translate(${r.current.x-20}px, ${r.current.y-20}px)`),e=requestAnimationFrame(i)};return e=requestAnimationFrame(i),()=>cancelAnimationFrame(e)},[]),(0,s.useEffect)(()=>{let t=t=>{n.current.x=t.clientX,n.current.y=t.clientY,e.current&&(e.current.style.transform=`translate(${t.clientX-4}px, ${t.clientY-4}px)`)};return window.addEventListener(`mousemove`,t,{passive:!0}),()=>window.removeEventListener(`mousemove`,t)},[]),(0,s.useEffect)(()=>{let n=`a, button, [data-cursor="hover"], input, textarea, select, label`,r=e=>{e.target.closest(n)&&t.current?.classList.add(`cursor-hovered`)},i=e=>{e.target.closest(n)&&t.current?.classList.remove(`cursor-hovered`)},a=()=>{e.current?.classList.add(`cursor-clicked`),t.current?.classList.add(`cursor-clicked`)},o=()=>{e.current?.classList.remove(`cursor-clicked`),t.current?.classList.remove(`cursor-clicked`)};return document.addEventListener(`mouseover`,r,{passive:!0}),document.addEventListener(`mouseout`,i,{passive:!0}),window.addEventListener(`mousedown`,a),window.addEventListener(`mouseup`,o),()=>{document.removeEventListener(`mouseover`,r),document.removeEventListener(`mouseout`,i),window.removeEventListener(`mousedown`,a),window.removeEventListener(`mouseup`,o)}},[]),typeof window<`u`&&window.matchMedia(`(pointer: coarse)`).matches?null:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(`div`,{ref:e,className:`cursor-dot fixed top-0 left-0 pointer-events-none`,style:{zIndex:9999,width:8,height:8,borderRadius:`50%`,background:`#fff`,mixBlendMode:`difference`,transform:`translate(-100px, -100px)`}}),(0,l.jsx)(`div`,{ref:t,className:`cursor-ring fixed top-0 left-0 pointer-events-none`,style:{zIndex:9998,width:40,height:40,borderRadius:`50%`,border:`1.5px solid rgba(255,255,255,0.45)`,willChange:`transform`,transform:`translate(-100px, -100px)`}})]})}function m(){let e=(0,s.useRef)(null);return(0,s.useEffect)(()=>{let t=e.current;if(!t)return;t.style.transform=`scaleY(1)`;let n=setTimeout(()=>{t.style.transform=`scaleY(0)`},50);return()=>clearTimeout(n)},[]),(0,l.jsx)(`div`,{ref:e,className:`fixed inset-0 z-9990 origin-top pointer-events-none`,style:{background:`var(--color-bg-base)`,transition:`transform 700ms var(--ease-out-expo)`,transform:`scaleY(1)`}})}function h(){let{scrollYProgress:e}=t(),n=i(e,{stiffness:100,damping:30,restDelta:.001});return(0,l.jsx)(a.div,{className:`fixed top-0 left-0 right-0 h-2px origin-left z-9999 pointer-events-none`,style:{scaleX:n,background:`linear-gradient(90deg, var(--color-accent-violet), var(--color-accent-cyan), var(--color-tertiary))`,boxShadow:`0 0 8px rgba(139,92,246,0.6)`}})}var g=`https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/05/28/04/20260528043511-6CNJUNQ6.json`;function _(){let[e,t]=(0,s.useState)({w:window.innerWidth,h:window.innerHeight});return(0,s.useEffect)(()=>{let e=()=>t({w:window.innerWidth,h:window.innerHeight});return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),e}var v=480,y=768;function b(){let[e,t]=(0,s.useState)(!1),[n,r]=(0,s.useState)(!1),[i,a]=(0,s.useState)(!0),o=(0,s.useRef)(null),{w:c,h:u}=_(),d=c<=v,f=c>v&&c<=y,p=d?52:60,m=d?16:28,h=d?16:28,b=d?c:f?c-32:380,x=d?u*.88:Math.min(f?u-100:u-120,600),S=d?0:f?16:h,C=d?0:m+p+12,w=d?`20px 20px 0 0`:`20px`;(0,s.useEffect)(()=>{if(e)r(!0),a(!1),d&&(document.body.style.overflow=`hidden`);else{d&&(document.body.style.overflow=``);let e=setTimeout(()=>r(!1),300);return()=>clearTimeout(e)}return()=>{document.body.style.overflow=``}},[e,d]);let T=(0,s.useCallback)(e=>{let n=e.target;o.current&&!o.current.contains(n)&&!n.closest?.(`.cw-btn`)&&t(!1)},[]);return(0,s.useEffect)(()=>(document.addEventListener(`mousedown`,T),()=>document.removeEventListener(`mousedown`,T)),[T]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(`style`,{children:`
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
      `}),(0,l.jsxs)(`div`,{className:`cw-root`,children:[d&&n&&(0,l.jsx)(`div`,{className:`cw-backdrop ${e?`show`:``}`,onClick:()=>t(!1)}),n&&(0,l.jsxs)(`div`,{ref:o,className:`${e?`cw-panel open`:`cw-panel closing`} ${d?`mobile-anim`:`desktop-anim`}`,style:{width:b,height:x,right:S,bottom:C,borderRadius:w},children:[(0,l.jsxs)(`div`,{className:`cw-header`,style:{paddingTop:d?20:13},children:[d&&(0,l.jsx)(`div`,{className:`cw-drag-handle`}),(0,l.jsx)(`div`,{className:`cw-avatar`,children:(0,l.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,children:[(0,l.jsx)(`circle`,{cx:`12`,cy:`12`,r:`5`,fill:`white`,opacity:`0.9`}),(0,l.jsx)(`path`,{d:`M9 10.5C9 9.12 10.12 8 11.5 8h1C13.88 8 15 9.12 15 10.5v.5H9v-.5z`,fill:`#6c63ff`}),(0,l.jsx)(`rect`,{x:`9`,y:`11`,width:`6`,height:`3.5`,rx:`0.5`,fill:`#6c63ff`}),(0,l.jsx)(`path`,{d:`M11 14.5h2v1.5h-2z`,fill:`#6c63ff`})]})}),(0,l.jsxs)(`div`,{className:`cw-header-info`,children:[(0,l.jsx)(`div`,{className:`cw-header-name`,children:`AI Assistant`}),(0,l.jsxs)(`div`,{className:`cw-header-status`,children:[(0,l.jsx)(`span`,{className:`cw-status-dot`}),`Online · Ready to help`]})]}),(0,l.jsx)(`button`,{className:`cw-close-btn`,onClick:()=>t(!1),"aria-label":`Close chat`,children:(0,l.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,children:[(0,l.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,l.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})})]}),(0,l.jsx)(`div`,{className:`cw-iframe-wrap`,children:(0,l.jsx)(`iframe`,{src:g,title:`AI Chatbot`,allow:`microphone; clipboard-write`})})]}),(0,l.jsxs)(`button`,{className:`cw-btn ${e?`open`:``} ${i?`pulse`:``}`,onClick:()=>t(e=>!e),"aria-label":e?`Close chat`:`Open chat`,style:{width:p,height:p,bottom:m,right:h,boxShadow:`0 4px 24px rgba(99,85,255,0.45), 0 2px 8px rgba(0,0,0,0.18)`},children:[(0,l.jsx)(`span`,{className:`cw-icon cw-icon-chat`,children:(0,l.jsxs)(`svg`,{width:d?22:26,height:d?22:26,viewBox:`0 0 24 24`,fill:`none`,children:[(0,l.jsx)(`path`,{d:`M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z`,fill:`white`}),(0,l.jsx)(`circle`,{cx:`8`,cy:`11`,r:`1.2`,fill:`#6c63ff`}),(0,l.jsx)(`circle`,{cx:`12`,cy:`11`,r:`1.2`,fill:`#6c63ff`}),(0,l.jsx)(`circle`,{cx:`16`,cy:`11`,r:`1.2`,fill:`#6c63ff`})]})}),(0,l.jsx)(`span`,{className:`cw-icon cw-icon-close`,children:(0,l.jsxs)(`svg`,{width:d?20:22,height:d?20:22,viewBox:`0 0 24 24`,fill:`none`,stroke:`white`,strokeWidth:`2.5`,strokeLinecap:`round`,children:[(0,l.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,l.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})}),!e&&(0,l.jsx)(`span`,{className:`cw-notif`,"aria-hidden":`true`})]})]})]})}var x=`modulepreload`,S=function(e){return`/portfolio/`+e},C={},w=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=S(t,n),t in C)return;C[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:x,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},T=(0,s.lazy)(()=>w(()=>import(`./Navbar-DL7IwSCi.js`),__vite__mapDeps([0,1,2,3,4]))),E=(0,s.lazy)(()=>w(()=>import(`./Hero-BgFXrVFo.js`),__vite__mapDeps([5,1,2,4,3,6]))),D=(0,s.lazy)(()=>w(()=>import(`./Skills-B2PxZVrS.js`),__vite__mapDeps([7,1,2,4,3])));(0,s.lazy)(()=>w(()=>import(`./Projects-DjQ275JI.js`),__vite__mapDeps([8,1,2,3,4,6])));var O=(0,s.lazy)(()=>w(()=>import(`./Stats-BBFI2wmY.js`),__vite__mapDeps([9,1,2,3,4]))),k=(0,s.lazy)(()=>w(()=>import(`./Timeline-C2l5gLtT.js`),__vite__mapDeps([10,1,2,4,3,6]))),A=(0,s.lazy)(()=>w(()=>import(`./Appreciation-CuxqQeW6.js`),__vite__mapDeps([11,1,2]))),j=(0,s.lazy)(()=>w(()=>import(`./Contact-D-fydZJZ.js`),__vite__mapDeps([12,1,2,3,4]))),M=(0,s.lazy)(()=>w(()=>import(`./Footer-D0hBQSjN.js`),__vite__mapDeps([13,1,2,3,4]))),N=(0,s.lazy)(()=>w(()=>import(`./ProjectsSection-Btp7J4XG.js`),__vite__mapDeps([14,1,2,3,4,6])));function P(){return(0,l.jsx)(`div`,{className:`w-full py-24 flex items-center justify-center`,children:(0,l.jsx)(`div`,{className:`w-8 h-8 rounded-full border-2 border-t-transparent animate-spin`,style:{borderColor:`var(--color-accent-violet)`,borderTopColor:`transparent`}})})}function F(){return(0,l.jsx)(d,{children:(0,l.jsxs)(`div`,{className:`noise relative min-h-dvh cursor-none`,children:[(0,l.jsx)(m,{}),(0,l.jsx)(h,{}),(0,l.jsx)(p,{}),(0,l.jsxs)(`div`,{className:`fixed inset-0 pointer-events-none overflow-hidden -z-10`,children:[(0,l.jsx)(`div`,{className:`absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[140px] opacity-20`,style:{background:`var(--color-accent-violet)`}}),(0,l.jsx)(`div`,{className:`absolute bottom-[10%] right-[-10%] w-[50%] h-[60%] rounded-full blur-[140px] opacity-15`,style:{background:`var(--color-accent-cyan)`}})]}),(0,l.jsx)(s.Suspense,{fallback:null,children:(0,l.jsx)(T,{})}),(0,l.jsxs)(`main`,{id:`main-content`,children:[(0,l.jsx)(s.Suspense,{fallback:(0,l.jsx)(P,{}),children:(0,l.jsx)(E,{})}),(0,l.jsx)(s.Suspense,{fallback:(0,l.jsx)(P,{}),children:(0,l.jsx)(D,{})}),(0,l.jsx)(s.Suspense,{fallback:(0,l.jsx)(P,{}),children:(0,l.jsx)(N,{})}),(0,l.jsx)(s.Suspense,{fallback:(0,l.jsx)(P,{}),children:(0,l.jsx)(k,{})}),(0,l.jsx)(s.Suspense,{fallback:(0,l.jsx)(P,{}),children:(0,l.jsx)(A,{})}),(0,l.jsx)(s.Suspense,{fallback:(0,l.jsx)(P,{}),children:(0,l.jsx)(O,{})}),(0,l.jsx)(s.Suspense,{fallback:(0,l.jsx)(P,{}),children:(0,l.jsx)(j,{})})]}),(0,l.jsx)(s.Suspense,{fallback:null,children:(0,l.jsx)(M,{})}),(0,l.jsx)(s.Suspense,{fallback:null,children:(0,l.jsx)(b,{})})]})})}(0,c.createRoot)(document.getElementById(`root`)).render((0,l.jsx)(s.StrictMode,{children:(0,l.jsx)(F,{})}));export{f as t};