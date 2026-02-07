# iOS Shortcuts — Research Report

**Report date:** February 6, 2025  
**Topic:** What the iOS Shortcuts app is, how it works, and what you can do with it.

---

## 1. Executive Summary

**iOS Shortcuts** (formerly Workflow) is Apple’s built‑in automation app that lets users chain **actions** into reusable workflows. Users can run shortcuts by tapping, via Siri, from Control Center, widgets, Apple Watch, or when certain events occur. Shortcuts support personal automation (time, location, settings), home automation (HomeKit), Web APIs, JSON, URL schemes, and custom logic. It runs on iPhone, iPad, Apple Watch, and macOS.

---

## 2. What Is iOS Shortcuts?

### 2.1 Definition

- A **shortcut** is a quick way to accomplish one or more tasks with your apps—with a tap or by asking Siri.
- An **action** is a single step in a shortcut (e.g. “Get Latest Photos”, “Make GIF”, “Send Message”).
- Shortcuts are built by combining actions; content flows between connected actions.
- Siri can suggest shortcuts based on app usage, browser, email, and messaging history.

### 2.2 History and Evolution

| Year | Milestone |
|------|-----------|
| **2014** | Workflow founded at University of Michigan (MHacks); wins Best iOS App. |
| **2015** | Named Apple App of the Year; wins Apple Design Award. |
| **2017** | Apple acquires Workflow; app becomes free; Maps/Translator integrations. |
| **2018** | Apple announces Shortcuts at WWDC; launches with iOS 12 (Sept 17). |
| **2019** | Shortcuts becomes a default app on iOS 13. |
| **2020** | watchOS Shortcuts app introduced. |
| **2021** | macOS Shortcuts app released. |
| **2024+** | Continued evolution with iOS 18 and beyond (e.g. iOS 26). |

---

## 3. How Shortcuts Work

### 3.1 Actions and Flow

- Actions are the building blocks; each performs one function.
- Actions run in sequence; output of one can feed into the next.
- **Content Graph engine** intelligently connects actions.
- Control flow: conditions, menus, repeats, variables.
- Supports variables, lists, dictionaries, JSON, date/time formatting.

### 3.2 Shortcut Collections (Organization)

- **All Shortcuts** — All shortcuts plus app shortcuts.
- **My Shortcuts** — User-created shortcuts only.
- **Share Sheet** — Shortcuts available in the share sheet.
- **Apple Watch** — Shortcuts available on watch.
- **App Shortcuts** — Shortcuts exposed by other apps.

---

## 4. Ways to Run Shortcuts

| Method | Description |
|--------|-------------|
| **Shortcuts app** | Run directly from the app. |
| **Siri** | Say the shortcut name after “Hey Siri” or activating Siri. |
| **Control Center** | Add shortcuts to Control Center. |
| **Action button** | Assign to Action button on compatible devices (e.g. iPhone 15 Pro). |
| **Apple Pencil Pro** | Gestures on compatible iPads. |
| **Home Screen widget** | Shortcuts widget for quick access. |
| **Search screen** | Spotlight/Search. |
| **Home Screen icon** | Add a shortcut as an app icon. |
| **Share sheet** | From another app’s share menu. |
| **Apple Watch** | Run from watch app or Siri on watch. |
| **Back tap** | Double/triple tap on back of iPhone ( accessibility ). |
| **App shortcuts** | Other apps can expose and invoke shortcuts. |
| **URL scheme** | Open and run via `shortcuts://` and x-callback-url. |

---

## 5. Personal Automation

**Personal automation** runs shortcuts automatically based on events instead of manual launch.

### 5.1 Trigger Types

- **Event triggers** — Time of day, calendar events, alarms, etc.
- **Travel triggers** — Arriving at or leaving a location.
- **Communication triggers** — Calls, messages, FaceTime.
- **Transaction trigger** — Apple Pay / Apple Card transactions.
- **Setting triggers** — Low Power Mode, Wi‑Fi on/off, Do Not Disturb, etc.

### 5.2 Behavior

- When the trigger fires, the user can receive a **notification** asking to run the automation.
- Automations can be edited to **run without asking** (where allowed).
- Personal automation is **device-specific**; stored in iCloud backup but not synced to other devices.

---

## 6. Home Automation

- **Home automation** in Shortcuts controls **HomeKit** accessories.
- Triggers include time, arrival/leave, accessory state, etc.
- Runs in the Home app ecosystem; works with Apple Watch, iPhone, iPad, HomePod.

---

## 7. Advanced Capabilities

### 7.1 Variables and Logic

- Variables: types, get/set, “Ask Each Time”.
- List actions, Choose from Menu, If, Repeat.
- Find and Filter actions with parameters.

### 7.2 Prompts and Input

- Ask for Input (text, number, date, etc.).
- Show Alert, Show Notification.
- Receive onscreen items (iOS 15+).
- Input types and limits.

### 7.3 Web and APIs

- **Run JavaScript on Webpage** — Execute JS in Safari.
- **URL schemes** — `shortcuts://`, x-callback-url, third‑party schemes.
- **Web APIs** — HTTP requests, JSON parsing, dictionaries, dates.

### 7.4 Sharing and Distribution

- Share shortcuts via files or links.
- Import questions for shared shortcuts.
- Sync via iCloud (user shortcuts); personal automations do not sync across devices.

---

## 8. Privacy and Security

- Shortcuts can access data (photos, location, contacts, etc.).
- **Privacy settings** can be adjusted per shortcut.
- User must approve access when shortcuts run.

---

## 9. Platforms

| Platform | Support |
|----------|---------|
| **iOS** | Full support (default app since iOS 13). |
| **iPadOS** | Full support. |
| **watchOS** | Shortcuts app; subset of actions. |
| **macOS** | Shortcuts app (since 2021). |

---

## 10. References

- [Shortcuts User Guide — Apple Support](https://support.apple.com/guide/shortcuts/toc/ios)
- [Intro to Shortcuts on iPhone and iPad](https://support.apple.com/guide/shortcuts/intro-to-shortcuts-apdf22b0444c/ios)
- [Intro to personal automation](https://support.apple.com/guide/shortcuts/intro-to-personal-automation-apd690170742/ios)
- [Shortcuts (Apple) — Wikipedia](https://en.wikipedia.org/wiki/Shortcuts_(Apple))
- [The Comprehensive History of Apple Shortcuts — RoutineHub](https://blog.routinehub.co/the-comprehensive-history-of-apple-shortcuts)

---

*End of report.*
