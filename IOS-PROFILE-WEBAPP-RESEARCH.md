# iOS Profile Webapp — Research Report

**Report date:** February 6, 2025  
**Topic:** How to build a webapp to create, edit, and modify iOS configuration profiles (.mobileconfig)

---

## 1. Executive Summary

A webapp for creating, editing, and modifying iOS configuration profiles is feasible by:

1. **Generating plist XML** — `.mobileconfig` files are XML plists with a known structure.
2. **Using JavaScript/Node libraries** — `plist` (npm) for parse/build; optionally `mobileconfig` for signing.
3. **Serving with correct MIME type** — `application/x-apple-aspen-config` so iOS Safari triggers the native “Install Profile” flow.
4. **Referencing payload schemas** — MacAdmins Profile Reference and Apple docs define payload types and keys.

This report covers architecture options, required formats, libraries, and implementation considerations.

---

## 2. File Format and Structure

### 2.1 What Is a .mobileconfig File?

A `.mobileconfig` file is an **XML plist** (property list) that iOS recognizes by both extension and content. The structure is:

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <!-- Root profile metadata -->
  <key>PayloadContent</key>
  <array>
    <!-- One or more payload dictionaries -->
  </array>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadIdentifier</key>
  <string>com.example.myprofile</string>
  <key>PayloadUUID</key>
  <string>...</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
  <key>PayloadDisplayName</key>
  <string>My Profile</string>
  <key>PayloadOrganization</key>
  <string>My Org</string>
</dict>
</plist>
```

### 2.2 Required Root Keys

| Key | Type | Description |
|-----|------|-------------|
| `PayloadContent` | array | Array of payload dictionaries |
| `PayloadType` | string | Always `Configuration` for root |
| `PayloadIdentifier` | string | Reverse-DNS identifier (e.g. `com.example.myprofile`) |
| `PayloadUUID` | string | UUID v4 |
| `PayloadVersion` | integer | Typically `1` |
| `PayloadDisplayName` | string | User-visible name |
| `PayloadOrganization` | string | Optional; org name |

### 2.3 Payload Structure (e.g. Wi-Fi)

Each payload in `PayloadContent` has:

- `PayloadType` — e.g. `com.apple.wifi.managed`, `com.apple.vpn.managed`, `com.apple.profile.restrictions`
- `PayloadIdentifier` — unique within profile
- `PayloadUUID` — UUID for the payload
- `PayloadVersion` — typically `1`
- `PayloadDisplayName` — optional display name
- Type-specific keys (e.g. `SSID_STR`, `Password`, `EncryptionType` for Wi-Fi)

---

## 3. Architecture Options

### 3.1 Option A: Client-Only (Static Site / SPA)

- **Pros:** No server; runs fully in the browser.
- **Cons:** Cannot serve `.mobileconfig` with correct MIME type directly. Users typically download XML and must open it manually, or use a data URI (which may not trigger native “Install Profile” on iOS).
- **Best for:** Preview, copy XML to clipboard, or generate for later hosting elsewhere.

### 3.2 Option B: Backend + Static Frontend

- **Pros:** Can serve generated profiles with correct MIME type; supports signing; secure handling of secrets (certs, keys).
- **Cons:** Requires a server (Node.js, Python, etc.).
- **Best for:** Production use, signed profiles, distribution via URL.

### 3.3 Option C: Serverless / Edge Functions

- **Pros:** No persistent server; can serve with correct headers.
- **Cons:** May have limits on response size or signing workflows.
- **Best for:** Lightweight distribution without a full backend.

**Recommendation:** For a real “create → install on device” experience, use **Option B** so profiles are served over HTTPS with the correct MIME type.

---

## 4. Libraries and Tools

### 4.1 Plist (JavaScript/Node.js)

**npm:** `plist`  
**Repository:** [TooTallNate/plist.js](https://github.com/TooTallNate/plist.js)

```javascript
const plist = require('plist');

// Build plist from object
const xml = plist.build({
  PayloadType: 'Configuration',
  PayloadVersion: 1,
  PayloadIdentifier: 'com.example.profile',
  PayloadUUID: '...',
  PayloadContent: [/* payloads */],
  PayloadDisplayName: 'My Profile'
});

// Parse plist to object (for editing)
const obj = plist.parse(xmlString);
```

Use `plist.build()` to generate the `.mobileconfig` XML from a JavaScript object.

### 4.2 mobileconfig (Node.js, Signing)

**npm:** `mobileconfig`  
**Repository:** [zone-eu/mobileconfig](https://github.com/zone-eu/mobileconfig)

- Creates and **signs** iOS mobileconfig files.
- Built-in helpers for:
  - Email (IMAP)
  - CardDAV / CalDAV
  - Wi-Fi
- Generic `getSignedConfig(plistData, keys, callback)` for any payload.
- Uses `jsrsasign` for signing; works on Windows too (no native crypto required).
- Signing is optional; unsigned profiles work but show as “Not Verified” on device.

### 4.3 Existing Web-Based Generators (Reference)

| Project | Description |
|---------|-------------|
| [mobile-config.github.io](https://github.com/mobile-config/mobile-config.github.io) | Create iOS configuration profiles online |
| [MarkusAndersons/mobileconfig](https://github.com/MarkusAndersons/mobileconfig) | Node web app with templates and routing |
| [adrian2793.github.io/mobileconfig](https://adrian2793.github.io/mobileconfig/) | Wi-Fi profile generator with live preview |
| [rohit-chouhan/mobile-config-installer](https://github.com/rohit-chouhan/mobile-config-installer) | Upload, link, or paste XML; serves with correct MIME type in browser |
| [JosephShenton/Open-Source-Mobileconfig-Generator](https://github.com/JosephShenton/Open-Source-Mobileconfig-Generator) | WebClip mobileconfig generator (JS) |

---

## 5. Serving Profiles for iOS Installation

### 5.1 Required HTTP Headers

To trigger the native “Install Configuration Profile” flow in iOS Safari:

| Header | Value |
|--------|-------|
| `Content-Type` | `application/x-apple-aspen-config` |
| `Content-Disposition` | `attachment; filename="profile.mobileconfig"` |

### 5.2 Important Notes

- **HTTPS required** — iOS will not install profiles from plain HTTP in most cases.
- **MIME type is critical** — Without `application/x-apple-aspen-config`, Safari may show XML instead of prompting to install.
- **Data URIs / client-side download** — May result in a generic download rather than the native install prompt. Best to serve from a real URL.
- **Empty/null values** — Optional plist keys with empty values can cause “unknown error” during install. Omit or use valid defaults.

---

## 6. Payload Types and Schemas

### 6.1 Documentation Sources

- **MacAdmins Profile Reference:** [mosen.github.io/profiledocs](https://mosen.github.io/profiledocs/)  
  - Wi-Fi, VPN, WebClip, Restrictions, Passcode, Certificates, Email, CalDAV, CardDAV, etc.
- **Apple:** [Configuration Profile Reference](https://developer.apple.com/library/content/featuredarticles/iPhoneConfigurationProfileRef/Introduction/Introduction.html) (legacy but still useful)

### 6.2 Common Payload Types for a Webapp

| PayloadType | Use Case |
|-------------|----------|
| `com.apple.wifi.managed` | Wi-Fi networks (SSID, password, encryption, 802.1X) |
| `com.apple.vpn.managed` | VPN (IKEv2, IPSec, L2TP, etc.) |
| `com.apple.webClip.managed` | Home screen web clips (bookmarks) |
| `com.apple.profile.restrictions` | Device restrictions |
| `com.apple.mail.managed` | Email accounts |
| `com.apple.caldav.account` | CalDAV calendars |
| `com.apple.carddav.account` | CardDAV contacts |
| `com.apple.security.passcode` | Passcode policy |
| `com.apple.globalHttpProxy` | HTTP proxy |

### 6.3 Example: Wi-Fi Payload

```xml
<dict>
  <key>PayloadType</key>
  <string>com.apple.wifi.managed</string>
  <key>PayloadIdentifier</key>
  <string>com.example.wifi.abc123</string>
  <key>PayloadUUID</key>
  <string>...</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
  <key>SSID_STR</key>
  <string>MyNetwork</string>
  <key>EncryptionType</key>
  <string>WPA2</string>
  <key>Password</key>
  <string>...</string>
  <key>AutoJoin</key>
  <true/>
</dict>
```

---

## 7. Implementation Outline

### 7.1 Core Workflow

1. **Create** — User fills a form (e.g. SSID, password, encryption for Wi-Fi).
2. **Build** — Backend or client builds a plist object and converts to XML with `plist.build()`.
3. **Optional: Sign** — Use `mobileconfig` + PEM key/cert to sign the profile.
4. **Serve** — Return the file with `Content-Type: application/x-apple-aspen-config` and `Content-Disposition: attachment; filename="profile.mobileconfig"`.

### 7.2 Edit / Modify Existing Profile

1. **Parse** — Use `plist.parse(xmlString)` to get a JS object.
2. **Edit** — Modify keys (e.g. `PayloadContent[0].SSID_STR`, `PayloadContent[0].Password`).
3. **Rebuild** — Use `plist.build(editedObject)` to generate new XML.
4. **Serve** — Same as create flow.

### 7.3 Tech Stack Suggestions

| Layer | Option 1 | Option 2 |
|-------|----------|----------|
| Frontend | React / Vue / Svelte | Plain HTML/JS |
| Backend | Node.js (Express/Fastify) | Python (Flask) |
| Plist | `plist` (npm) | `plistlib` (Python stdlib) |
| Signing | `mobileconfig` (Node) | `security` / `codesign` (macOS) or OpenSSL |
| Hosting | Vercel + API route / Cloudflare Workers | Any HTTPS host |

---

## 8. Security Considerations

- **Passwords / secrets** — Stored in profiles in plaintext (by design). Use HTTPS for transport; consider signing so users can verify source.
- **Signing** — Use a valid cert (e.g. from your org) so profiles show as “Verified” on device.
- **Input validation** — Sanitize user input to avoid malformed plist or injection.
- **CORS** — If serving from a different domain, ensure proper CORS if the frontend fetches profiles from an API.

---

## 9. References

- [Apple: Install configuration profiles](https://support.apple.com/guide/iphone/install-or-remove-configuration-profiles-iph6c493b19/ios)
- [Apple: Over-the-Air Profile Delivery](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/iPhoneOTAConfiguration/Introduction/Introduction.html)
- [MacAdmins Profile Reference](https://mosen.github.io/profiledocs/)
- [plist - npm](https://www.npmjs.com/package/plist)
- [mobileconfig - npm (zone-eu)](https://www.npmjs.com/package/mobileconfig)
- [Stack Overflow: Distributing mobileconfig over the web](https://stackoverflow.com/questions/6569256/distributing-a-mobileconfig-file-over-the-web)

---

## 10. Conclusion

A webapp to create, edit, and modify iOS profiles can be built by:

1. Using the **plist** library to build/parse the `.mobileconfig` XML.
2. Implementing forms/UI for common payloads (Wi-Fi, VPN, WebClip, restrictions, etc.) based on MacAdmins Profile Reference.
3. Serving profiles over HTTPS with `Content-Type: application/x-apple-aspen-config` so iOS triggers the native install flow.
4. Optionally using the **mobileconfig** library for signing and built-in helpers for Email, Wi-Fi, CalDAV, CardDAV.

A backend (Node.js or similar) is recommended for correct distribution; client-only generation is possible for preview and clipboard export but may not trigger the native install prompt on iOS.
