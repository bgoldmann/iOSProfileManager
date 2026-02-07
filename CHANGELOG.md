# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

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
