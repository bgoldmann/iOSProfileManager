# iOS Configuration Profile — Research Report

**Report date:** February 6, 2025  
**Topic:** What iOS profiles are, how they work, and what you can do with them.

---

## 1. Executive Summary

**iOS configuration profiles** (often called “profiles”) are settings bundles that you install on iPhone, iPad, and other Apple devices to configure behavior, security, and connectivity without touching every setting by hand. They are the main mechanism for **device management** (MDM), **enterprise deployment**, **education**, and **manual provisioning** of WiFi, VPN, certificates, and restrictions.

This report explains what profiles are, how they work, what they can do, and how they are created, distributed, and managed.

---

## 2. What Is an iOS Profile?

### 2.1 Definition

- A **configuration profile** is a file (or set of settings) that describes **what** should be configured on the device.
- It contains one or more **payloads**. Each payload targets a specific area: WiFi, VPN, restrictions, certificates, email, etc.
- On iOS, profiles are commonly distributed as **`.mobileconfig`** files (signed or unsigned).
- They can be created manually, with **Apple Configurator 2**, with **Profile Manager** (or similar MDM), or by scripting/automation.

### 2.2 How the Device Treats a Profile

- When a user (or MDM) installs a profile, iOS applies the payloads and stores the profile in **Settings → General → VPN & Device Management** (or **Profiles** on older iOS).
- The user can **remove** a profile; when removed, the settings from that profile are reverted (where applicable).
- A device can have **multiple** configuration profiles; they are additive. Conflicting settings are typically resolved by installation order or by payload type rules (e.g., later-installed or more specific wins).
- **Enrollment profiles** (MDM) are special: a device usually has only **one** MDM enrollment profile. Removing it unenrolls the device and can remove all managed apps and settings from that MDM.

---

## 3. How iOS Profiles Work

### 3.1 Structure: Payloads

- A profile is a **container** for **payloads**.
- Each payload has:
  - **Type** (e.g. `com.apple.wifi.managed`, `com.apple.vpn.managed`, `com.apple.profile.restrictions`).
  - **Identifier** (unique within the profile).
  - **Version** (for change tracking).
  - **Payload-specific keys** (e.g. SSID, encryption, VPN type, restriction flags).

Profiles are often represented as **plist/XML**; the `.mobileconfig` file is typically a plist in a specific format that iOS recognizes.

### 3.2 Installation Flow

1. **Delivery:** Profile is provided to the user (link, email, MDM push, Apple Configurator, etc.).
2. **Download:** User opens the link/file or the MDM server pushes the profile.
3. **Prompt:** iOS shows a **Profile Installation** screen describing what will be installed (organization, name, and a summary of payloads).
4. **Consent:** User taps **Install** and may need to enter passcode or Apple ID.
5. **Application:** iOS applies each payload (WiFi networks, VPN configs, restrictions, certificates, etc.).
6. **Storage:** The profile is stored and listed under **Settings → General → VPN & Device Management**.

Removal is done from the same place: select the profile → **Remove Profile** (and often confirm with passcode).

### 3.3 Signing and Encryption

- Profiles can be **signed** (so the device can verify who issued them).
- They can be **encrypted** so that only a specific device (or class of devices) can install them.
- **Best practice:** Sign profiles in enterprise/managed scenarios so users and admins can trust the source.

---

## 4. What You Can Do With iOS Profiles

### 4.1 Connectivity & Network

| Payload / Area      | What you can do |
|---------------------|------------------|
| **WiFi**            | Preconfigure WiFi networks (SSID, security type, password, 802.1X, proxy). Users get the network without typing settings. |
| **VPN**             | Deploy VPN configs (IKEv2, IPSec, L2TP, etc.), including Per-App VPN for specific apps. |
| **Cellular**        | Configure carrier / APN-style settings where supported. |
| **DNS / Proxy**     | Push DNS or proxy settings (e.g. for filtering or corporate access). |

Use cases: corporate WiFi, always-on or per-app VPN, guest networks, filtered DNS.

### 4.2 Certificates & Security

| Payload / Area   | What you can do |
|------------------|------------------|
| **Certificates** | Install root CAs or client certificates (e.g. for WiFi EAP-TLS, VPN, or app trust). |
| **SCEP**         | Automate certificate enrollment from a PKI (device gets a cert without manual steps). |
| **Passcode**     | Enforce passcode policy (length, complexity, expiry, grace period). |

Use cases: corporate PKI, secure WiFi/VPN, compliance (strong passcode).

### 4.3 Restrictions & Compliance

| Payload / Area   | What you can do |
|------------------|------------------|
| **Restrictions** | Allow or disallow: camera, FaceTime, Safari, App Store, iCloud, backups, account changes, etc. Many options apply only to **supervised** devices. |
| **Web filter**   | Restrict allowed/blocked URLs or use a content filter. |
| **App restrictions** | Restrict which apps can run (stronger on supervised). |

Use cases: schools (lock down to learning), kiosks, shared devices, compliance (disable camera, control backups).

### 4.4 Accounts & Data

| Payload / Area | What you can do |
|----------------|------------------|
| **Mail / Exchange** | Preconfigure mail and Exchange (IMAP/POP/ActiveSync). |
| **CalDAV / CardDAV** | Add calendar and contacts accounts. |
| **LDAP**             | Add directory accounts. |
| **Single Sign-On**   | Deploy SSO / identity provider settings. |

Use cases: corporate email/calendar/contacts and SSO without manual account setup.

### 4.5 Apps & Home Screen

| Payload / Area     | What you can do |
|--------------------|------------------|
| **Web clips**      | Add home-screen bookmarks (icons that open a URL). |
| **Home screen layout** | Define which apps and pages appear (mainly **supervised**). |
| **Managed apps**   | With MDM, install/remove apps; with supervision, silent install. |

Use cases: kiosks, guided access, standard “company” or “school” layout.

### 4.6 Other

- **AirPrint:** Preconfigure printers.
- **AirPlay:** Restrict or allow AirPlay destinations (e.g. **supervised**).
- **Notifications:** Configure notification behavior for apps.
- **Education / Shared iPad:** Class and exam configurations (often with **supervised** + MDM).

---

## 5. Supervised vs Unsupervised

Many powerful options only apply when the device is **supervised**.

| Aspect              | Unsupervised                     | Supervised                                |
|---------------------|----------------------------------|-------------------------------------------|
| **Typical owner**   | User-owned (BYOD)               | Organization-owned                        |
| **Restrictions**    | Basic; many restrictions N/A   | Full restriction set (camera, VPN, etc.)  |
| **App install**     | User must approve               | Silent install/update possible (with MDM)  |
| **Home screen**     | User controls                   | Can be locked / defined by profile         |
| **Enrollment**      | User enrolls (e.g. MDM app)      | Often Automatic Device Enrollment (ADE)    |

- **Supervision** is enabled by:
  - **Apple Configurator 2** (tethered to a Mac), or
  - **Automatic Device Enrollment** (ADE) via Apple Business Manager / Apple School Manager.
- **Configuration profiles** can be used on both supervised and unsupervised devices; **which** payloads and restrictions apply depends on supervision and sometimes on enrollment type (MDM vs manual).

---

## 6. MDM and Profiles

### 6.1 Role of MDM

- **Mobile Device Management (MDM)** uses **configuration profiles** to push settings and uses a special **MDM enrollment profile** to register the device with the server.
- The server can then:
  - Send more configuration profiles.
  - Send **commands** (lock, wipe, query, install app).
  - Revoke or update profiles over the air.

### 6.2 What MDM Can and Cannot See

- MDM **cannot** access: iMessage content, Safari history, photos, personal email content, or other private user data.
- MDM **can** manage: installed profiles, installed apps (if managed), compliance state, device identifier, OS version, and similar metadata and management-related data.
- Apple documents and constrains what MDM APIs can do so that management stays separate from user privacy.

### 6.3 Enrollment Profile

- **One** MDM enrollment profile per device.
- Removing it **unenrolls** the device and typically removes all managed apps and configuration profiles delivered by that MDM.

---

## 7. Creating and Distributing Profiles

### 7.1 Tools

| Method                     | Typical use case                          |
|----------------------------|-------------------------------------------|
| **Apple Configurator 2**   | Create/edit `.mobileconfig` on Mac; USB or same-network install. |
| **Profile Manager / MDM**  | Create and push profiles over the air to enrolled devices.      |
| **Scripts / automation**  | Generate plist/.mobileconfig for WiFi, VPN, certificates.      |
| **Manual plist editing**   | Advanced; must match Apple’s payload keys and structure.         |

### 7.2 File Format and Distribution

- **Format:** `.mobileconfig` (do not rename or compress; iOS recognizes by extension and content).
- **Distribution:**  
  - Link or email: user opens link/file on the device → install.  
  - MDM: server pushes profile to enrolled devices.  
  - Apple Configurator 2: install via USB or local network.

During install, the user may need to enter a passcode or certificate password if the profile includes locked or encrypted items.

---

## 8. Use Cases Summary

| Scenario              | What profiles provide                                      |
|-----------------------|------------------------------------------------------------|
| **Corporate BYOD**    | WiFi, VPN, email, certificates, light restrictions.         |
| **Corporate owned**   | Above + supervision, strong restrictions, silent apps.    |
| **Education**         | WiFi, restrictions, home screen, class/exam modes.       |
| **Kiosks / shared**   | Locked-down restrictions, single-app or guided access.    |
| **Guests / events**   | WiFi-only profile for event network.                      |
| **Compliance**        | Passcode policy, restrictions, managed apps.                |

---

## 9. References and Further Reading

- **Apple:** [Install or remove configuration profiles on iPhone](https://support.apple.com/guide/iphone/install-or-remove-configuration-profiles-iph6c493b19/ios)
- **Apple:** [Plan your configuration profiles for Apple devices](https://support.apple.com/guide/deployment/plan-your-configuration-profiles-dep9a318a393/web)
- **Apple:** [Intro to device management profiles](https://support.apple.com/guide/deployment/intro-to-device-management-profiles-depc0aadd3fe/web)
- **Apple:** [Device management restrictions for supervised Apple devices](https://support.apple.com/guide/deployment/restrictions-for-supervised-devices-dep6b5ae23e9/web)
- **Apple:** [Create and edit configuration profiles in Apple Configurator 2](https://support.apple.com/guide/apple-configurator-2/create-and-edit-configuration-profiles-pmd85719196/mac)
- **Payload docs (community):** [Configuration Profile Reference (e.g. VPN, Wi-Fi, iOS payloads)](https://mosen.github.io/profiledocs/)

---

## 10. Conclusion

**iOS configuration profiles** are the standard way to configure iPhones and iPads in bulk or with consistency. They work by installing **payloads** (WiFi, VPN, restrictions, certificates, accounts, etc.) that the system applies and keeps until the profile is removed. What you can do depends on whether the device is **supervised** and whether it’s managed by **MDM**. Used correctly, profiles enable secure, scalable deployment for enterprise, education, and specialized use cases while respecting Apple’s privacy boundaries for user data.
