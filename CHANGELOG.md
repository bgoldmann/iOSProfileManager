# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- **Footer with FAQ** — New footer component at bottom of main content with accordion FAQ (same 6 questions as Guide), using native `<details>`/`<summary>`. Includes links to Apple payload list and ProfileDocs plus iOS Profile Manager branding.
- **SEO (footer & meta)** — `og:site_name` set to "iOS Profile Manager" for social previews; explicit `meta name="robots" content="index, follow"` for crawlers.
- **SEO (2026 follow-up)** — HowTo JSON-LD schema for “How to install on iOS” steps (6 steps mirroring Guide content) to improve AI Overview visibility. Organization schema enhanced with `description`. Font preload and `fetchpriority="high"` for Inter stylesheet to improve LCP. Sitemap now includes `<lastmod>` with build date. `robots.txt` and `sitemap.xml` removed from `public/` (plugin generates both at build); README and project structure updated.
- **SEO (2026)** — Open Graph image dimensions (`og:image:width`, `og:image:height`) and alt text (`og:image:alt`, `twitter:image:alt`) for predictable social previews. Preconnect hints for Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) to improve LCP. Organization JSON-LD schema for site-wide identity. New `index.css` for root layout and font-family (referenced in HTML). Guide: “Privacy & trust” section with client-side-only explanation and links to Apple payload list and ProfileDocs. Payload form components are lazy-loaded (code-split) so the initial bundle is smaller and INP improves; a “Loading…” fallback is shown while a form chunk loads. `.env.example` updated to state that `VITE_APP_URL` is required for production SEO.
- **Global HTTP Proxy Quick Load Preset** — Global HTTP Proxy payload now has a “Quick Load Preset” dropdown: **Custom / Corporate (Manual)** (proxy.example.com:8080), **Local testing (Manual)** (127.0.0.1:8888), and **Automatic (PAC URL)** (http://wpad/wpad.dat). Helper text notes that public proxy lists change often and to use a stable corporate or trusted proxy.
- **VPN Quick Load Preset** — VPN Configuration payload now has a “Quick Load Preset” dropdown (like DNS): **Custom / Corporate**, **VPN Jantit (Free)** (public IKEv2 server hostname), and **Surfshark (IKEv2)**. Preset fills connection name, type, server, and remote ID; user adds credentials (shared secret or certificate) as required by the provider.

### Fixed

- **iPhone Codes** — Simplified to match Guide: single intro (h2 + paragraph), one white card with all categories as plain lists (code + description). Removed copy buttons, per-section icons, and amber note box; note moved to bottom of card.
- **WCAG 2 AA contrast & heading order** — Sidebar section labels “Settings” and “Configured Payloads” changed from `<h3>` to `<p role="text">` so the document heading order is correct (no skipped levels). Inactive sidebar nav and payload buttons use `text-gray-900` for higher contrast (fixes `button[data-section="iphone-codes"] > .font-medium` and similar). Download button uses `bg-blue-600` so white text meets 4.5:1.
- **WCAG 2 AA contrast** — Sidebar section headings (Settings, Configured Payloads, Add New Payload), payload subtitles, empty states, search icon, and header “Editing” label use `text-gray-600` instead of `text-gray-400`/`text-gray-500` for minimum 4.5:1 contrast on light backgrounds. Sidebar nav and payload buttons use `text-gray-800` when inactive (fixes iPhone Codes and other `.font-medium` labels). Download button uses `bg-blue-600` so white text (`.sm\:inline`) meets 4.5:1. Guide, General Settings, iPhone Codes, Iran USSD, and eSIM Guide body and secondary text updated to `text-gray-600` where needed.
- **iPhone Codes** — Page now appears when selected: iPhone Codes moved to second position in Settings sidebar (below General) so it is visible without scrolling; main content area given min-height so it does not collapse; Hash icon in component renamed to HashIcon to avoid possible name conflicts.

### Added

- **DNS payload expansion** — Encrypted DNS payload now supports: **Allow Failover** (iOS 26+), **Payload Certificate UUID** (TLS client auth, iOS 16+), and **On-Demand Rules** (when to apply DNS: Connect / Disconnect / EvaluateConnection with optional SSID match, interface type match, URL probe). Same semantics as VPN on-demand (e.g. apply only on specific Wi‑Fi).
- **eSIM Guide** page — Explains how eSIM works (LPA, SM-DP+, EID, SM-DS), how profiles are made (GSMA SGP.22, bound profile packages), and how to deliver/push eSIMs (QR, manual entry, carrier app, operator-initiated/SM-DS). Accessible from sidebar (CardSim icon).
- **Iran USSD** page — USSD codes for Iranian carriers: Irancell (ایرانسل), Hamrah-e Aval / MCI (همراه اول), and Rightel (رایتل). Balance, top-up, data packages, internet activation, and other services per carrier. Copy-to-clipboard; accessible from sidebar (Flag icon).
- **iPhone Codes** page — reference list of iPhone dial codes (e.g. `*#06#` for IMEI, `*3001#12345#*` for Field Test Mode). Categories: device info, network & signal, call forwarding, call features, carrier/billing. Copy-to-clipboard for each code; accessible from sidebar (Hash icon).
- Professional GitHub README with feature list, tech stack, and project structure.
- Deploy on Vercel section: one-click deploy button, manual setup, and SPA routing notes.
- `vercel.json` with rewrites so the SPA works on refresh and deep links when deployed on Vercel.
- This CHANGELOG.md for version history.
- **CardDAV (Contacts)** payload — add CardDAV account (host, username, SSL, optional principal URL and password) for contacts; exports as `com.apple.carddav.account`.
- **Lock Screen Message** payload — custom message on the device lock screen (e.g. “If lost, return to…”); exports as `com.apple.lockscreen` with `LockScreenMessage` key.
- **Exchange ActiveSync** — `com.apple.eas.account`; email, host, SSL, sync days, prevent move.
- **Safari** — `com.apple.safari`; homepage, managed bookmarks, AutoFill/JavaScript/popups options.
- **SCEP** — `com.apple.security.scep`; URL, name, challenge, keysize (1024/2048), retries/retry delay.
- **Domains** — `com.apple.domains`; email domains, web domains, Safari password autofill domains.
- **AirPrint** — `com.apple.airprint`; list of printers (IP, resource path, port, ForceTLS).
- **Notification Settings** — `com.apple.notificationsettings`; allow notifications, allow modification.
- **Google Account** — `com.apple.google.account`; account description, optional account name and hide system setup.
- **Fonts** — `com.apple.font`; install custom fonts (name + base64 data).
- **Single Sign-On (SSO)** — `com.apple.extensibility.sso`; name, team ID, extension type, bundle IDs.
- **In-app Guide** — Guide section in the webapp sidebar: how profiles work, how to install on iOS, and FAQ. Accessible via the Guide button (HelpCircle icon) alongside General and payloads.
- **Caller ID** payload — control “Show My Caller ID” via restriction `allowShowCallerID`; exports as `com.apple.applicationaccess`.
- **SEO** — Meta description, Open Graph and Twitter Card meta tags, canonical URL, and theme-color in `index.html`. JSON-LD structured data: WebApplication and FAQPage (from in-app FAQ) for rich results. `public/robots.txt` and build-time `sitemap.xml` (canonical URL from `VITE_APP_URL`). Optional `public/og-image.png` (1200×630) for social previews. Vite plugin replaces `__BASE_URL__` at build and writes `robots.txt`/`sitemap.xml` to `dist/`. Single `<h1>` per page (sidebar: “iOS Profile Manager”; mobile header section title is `<h2>`). README and `.env.example` document optional `VITE_APP_URL` for production SEO.
