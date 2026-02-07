# iOS Shortcuts (US-013, US-014, US-016)

Use iOS Shortcuts to install profiles, open the Profile Manager, and automate profile installation.

## Deep links

Replace `https://yourapp.com` with your deployed app URL (e.g. Vercel).

| Purpose | URL |
|--------|-----|
| Create profile | `https://yourapp.com/create` |
| Edit profile (upload/paste) | `https://yourapp.com/edit` |
| Install profile (landing) | `https://yourapp.com/p/[id]` |
| Install profile (direct) | `https://yourapp.com/api/p/[id]/install` |

Opening the **direct** install URL in Safari on iOS triggers the native “Install Configuration Profile” flow.

---

## Pre-built shortcuts

### 1. Install Profile from URL (US-013)

- **Action:** Open URL  
- **URL:** Your profile install link (e.g. `https://yourapp.com/api/p/abc12345/install`)  
- **Use:** Run the shortcut to install a specific profile (e.g. from Siri or a widget).  
- **Share:** Export the shortcut and share via iCloud link or RoutineHub; document that the user must set the URL to their own profile install link.

**Steps:**

1. Shortcuts app → New Shortcut.  
2. Add action **Open URL**.  
3. Set URL to your profile install link (from “Get install link” in the webapp).  
4. Name the shortcut (e.g. “Install Office Wi‑Fi”).  
5. Optionally add to Home Screen or Siri.

### 2. Open Profile Manager (US-014)

- **Action:** Open URL  
- **URL:** `https://yourapp.com/create`  
- **Use:** Opens the webapp create page in Safari.

**Steps:**

1. New Shortcut → **Open URL** → `https://yourapp.com/create`.  
2. Name: “Open Profile Manager”.

### 3. List My Profiles (US-014)

- **Action:** Open URL  
- **URL:** Dashboard URL if you add a “List profiles” page (e.g. `https://yourapp.com/dashboard`).  
- **Status:** If no dashboard exists yet, use “Open Profile Manager” to go to create/edit; document “List My Profiles” as coming later.

---

## Shortcut recipes (US-016)

### Recipe 1: When I arrive at Office, open profile install URL

1. Shortcuts → Automation → **Personal Automation**.  
2. Trigger: **Arrive** → choose your Office location.  
3. Action: **Open URL** → set URL to your office profile install link.  
4. Turn off “Ask before running” if you want automatic install when you arrive.

### Recipe 2: Ask for profile URL, then open it

1. New Shortcut.  
2. Add **Ask for Input** → Text → prompt: “Profile install URL”.  
3. Add **Open URL** → URL = **Provided Input** (from step 2).  
4. Run the shortcut, paste any profile install link when asked, and it opens in Safari to install.

### Recipe 3: Siri – “Install my work profile”

1. Create a shortcut that **Open URL** with your work profile install link.  
2. Name it “Install my work profile”.  
3. Say “Hey Siri, Install my work profile” to run it.

---

## Step-by-step setup (summary)

1. **Create a profile** in the webapp (e.g. Wi‑Fi or VPN).  
2. Click **Get install link** and copy the URL.  
3. In Shortcuts, create a new shortcut with **Open URL** and paste that URL.  
4. Name the shortcut and optionally add to Home Screen or Siri.  
5. On your iPhone/iPad, run the shortcut to open the link in Safari and install the profile.

---

## Reverse integration

To open a specific Shortcut from the webapp (e.g. “Run Shortcut” link), use the URL scheme:

- `shortcuts://run-shortcut?name=Shortcut%20Name`  
- Replace the shortcut name with your shortcut’s name (URL-encoded).

Document this in your help if you add “Run Shortcut” links.
