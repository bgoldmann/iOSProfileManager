# iOS Profile Manager

A professional web app to create, edit, and export **iOS configuration profiles** (`.mobileconfig`) directly in the browser. No server required—build Wi‑Fi, VPN, restrictions, Single App Mode (kiosk), and 31+ payload types, then download a valid profile for iPhone and iPad.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)

---

## Features

- **Visual profile builder** — General metadata (name, organization, identifier, description) plus a sidebar of configured payloads
- **31+ payload types** — Add, configure, reorder, and remove payloads with forms that map to Apple’s schema
- **Download `.mobileconfig`** — Generates valid XML and triggers a download; install on device via Settings or MDM
- **Responsive UI** — Sidebar collapses on mobile, search for payload types, iOS-style colors (e.g. `#007AFF`)
- **Client-side only** — No data is sent to any server; profiles are built and downloaded locally
- **In-app Guide** — Built-in guide explains how profiles work, how to install on iOS, and answers common questions (FAQ)
- **iPhone Codes** — Reference page of secret dial codes (e.g. `*#06#` for IMEI, Field Test Mode) with copy-to-clipboard
- **Iran USSD** — USSD codes for Iranian carriers (Irancell, MCI/Hamrah-e Aval, Rightel): balance, data packages, top-up, and more
- **eSIM Guide** — How eSIM works (LPA, SM-DP+, EID), how profiles are made, and how to push/deliver eSIMs (QR, manual, carrier app, operator-initiated)

### Supported payload types

| Category | Payloads |
|----------|----------|
| **Network** | Wi‑Fi, VPN (IKEv2, L2TP, IPSec), Encrypted DNS, Global HTTP Proxy, Cellular (APN) |
| **Security** | Passcode policy, Certificate, Restrictions, Web Content Filter |
| **Accounts** | Email (IMAP/POP), Exchange ActiveSync, CalDAV, CardDAV (Contacts), Subscribed Calendar, LDAP, Google Account |
| **Device** | Single App Mode (App Lock), MDM, App Store, Find My, Phone & Siri, Settings Lock, Camera, Bluetooth, Notification Settings |
| **Other** | Web Clip, Lock Screen Message, Safari (homepage & bookmarks), SCEP, Domains, AirPrint, Fonts, Single Sign-On (SSO) |

---

## Tech stack

- **React 19** + **TypeScript**
- **Vite 6** (build tool)
- **Tailwind CSS** (via CDN in `index.html`; custom `ios` colors)
- **Lucide React** (icons)
- No backend; export runs in the browser via `utils/plistGenerator.ts`

---

## Quick start

### Prerequisites

- **Node.js** 18+ (recommend 20+)
- **npm** (or pnpm / yarn)

### Install and run

```bash
git clone https://github.com/YOUR_USERNAME/ios-profile-manager.git
cd ios-profile-manager
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit the profile, add payloads, then click **Download Profile** to get a `.mobileconfig` file.

### Build for production

```bash
npm run build
npm run preview   # optional: serve dist/ locally
```

Output is in `dist/` (static assets). Use that folder (or deploy the repo) for Vercel or any static host.

---

## Deploy on Vercel

The app is a **Vite SPA**: build once, serve static files. Vercel works well for this.

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/ios-profile-manager)

Replace `YOUR_USERNAME` with your GitHub username (or use the Vercel dashboard and import the repo).

### Manual setup

1. Push the repo to GitHub (or GitLab/Bitbucket).
2. In [Vercel](https://vercel.com), click **Add New** → **Project** and import the repo.
3. Use the default settings:
   - **Framework Preset:** Vite  
   - **Build Command:** `npm run build`  
   - **Output Directory:** `dist`  
   - **Install Command:** `npm install`
4. Deploy. Vercel will run `npm run build` and serve the contents of `dist/`.

### SEO and production URL (optional)

For correct canonical URLs, sitemap, and Open Graph image links in search and social previews, set the production origin as an environment variable:

- **Vercel:** Project → Settings → Environment Variables → add `VITE_APP_URL` = `https://your-app.vercel.app` (use your actual deployment URL).
- **Other hosts:** Set `VITE_APP_URL` at build time to your site’s public URL.

If unset, the build uses `https://example.com` as a fallback. See `.env.example` for reference.

### SPA routing (optional)

If you add client-side routes later, configure rewrites so every path serves `index.html`. A `vercel.json` is included:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

This keeps the app working when users refresh or open a deep link.

---

See [Apple’s payload list](https://support.apple.com/guide/deployment/payload-list-for-iphone-and-ipad-depdca795ebd/web) and [ProfileDocs](https://mosen.github.io/profiledocs/payloads/) for more payload types.

---

## Project structure

```
ios-profile-manager/
├── App.tsx                 # Main app: sidebar, payload list, add/remove, download
├── index.html               # Entry HTML, Tailwind + import map
├── index.tsx                # React root
├── types.ts                 # Payload types and Profile / ProfileMetadata
├── metadata.json            # App metadata (name, description)
├── vite.config.ts           # Vite config (port, aliases)
├── utils/
│   └── plistGenerator.ts   # Builds .mobileconfig XML from Profile
├── components/
│   ├── GeneralSettings.tsx  # Profile display name, org, identifier, description
│   ├── Guide.tsx            # In-app guide: how profiles work, install steps, FAQ
│   ├── iPhoneCodes.tsx      # iPhone dial codes reference (*#06#, Field Test, etc.)
│   ├── IranUSSDCodes.tsx    # USSD codes for Iranian carriers (Irancell, MCI, Rightel)
│   ├── ESimGuide.tsx       # eSIM: how it works, how it's made, how to push
│   ├── ui/                  # Input, Select, Switch
│   └── payloads/            # One form per payload type (WifiForm, VPNForm, …)
├── public/                   # Static assets (copied to dist/ root)
│   ├── robots.txt            # Crawler rules; sitemap URL set at build from VITE_APP_URL
│   ├── sitemap.xml           # Generated at build with canonical URL
│   └── og-image.png          # Social share image (1200×630)
├── README.md
├── CHANGELOG.md
└── vercel.json              # SPA rewrites for Vercel
```

---

## How it works

1. **State** — A single `Profile` (metadata + array of `Payload`) is held in React state.
2. **UI** — You edit **General** (metadata) or a payload in the sidebar; each payload type has a dedicated form component.
3. **Export** — **Download Profile** calls `downloadMobileConfig(profile)` in `utils/plistGenerator.ts`, which:
   - Builds a valid Apple-style plist XML (payloads, identifiers, UUIDs)
   - Wraps it in a `Blob` with type `application/x-apple-aspen-config`
   - Triggers a download with a safe filename from the profile display name.

Profiles can be installed on iOS/iPadOS via **Settings → General → VPN & Device Management** (or by opening the `.mobileconfig` from Mail/Files if allowed).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (default port 3000) |
| `npm run build` | Build for production → `dist/` |
| `npm run preview` | Serve `dist/` locally |

---

## License

MIT (or your chosen license).

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and updates.
