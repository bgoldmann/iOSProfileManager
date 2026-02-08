import React from 'react';
import { CardSim } from 'lucide-react';

export const ESimGuide: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">eSIM: how it works, how it’s made, how to push</h2>
        <p className="text-sm text-gray-600 mb-4">
          A short technical overview of embedded SIM (eSIM): the main components, how profiles are created and delivered, and the ways carriers “push” or activate eSIMs on your device.
        </p>
      </div>

      {/* How it works */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">How eSIM works</h3>
        <p className="text-sm text-gray-600 mb-3">
          In one sentence: <strong>the LPA on your phone uses your EID to fetch an eSIM profile from an SM-DP+ server.</strong> It’s a <em>pull</em> model: the device requests the profile; the server doesn’t send it unsolicited.
        </p>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-1">SM-DP+ (Subscription Manager – Data Preparation+)</h4>
            <p className="text-sm text-gray-600">
              The secure backend server where eSIM profiles are prepared, encrypted, and hosted. Carriers/MNOs use it to create and store profiles. When your device activates, it talks to this server to download the right profile.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-1">LPA (Local Profile Assistant)</h4>
            <p className="text-sm text-gray-600">
              Software built into iOS and Android that manages eSIM operations: download, install, enable, disable, delete. When you scan a QR code or enter details manually, the LPA contacts the SM-DP+ and runs the secure download and install flow.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-1">EID (eUICC Identifier)</h4>
            <p className="text-sm text-gray-600">
              A unique ID for your device’s eSIM chip (the eUICC). Like a serial number for the embedded SIM. Carriers sometimes need your EID to “push” a profile or re-enable a download. Find it on iPhone: <strong>Settings → General → About → EID</strong>.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-1">SM-DS (Subscription Manager – Discovery Server)</h4>
            <p className="text-sm text-gray-600">
              Optional. Lets the device discover available profiles (e.g. “you have a new plan ready”) so the LPA can pull from the right SM-DP+ without the user scanning a QR. Used for push-style and operator-initiated flows (especially in IoT, per GSMA SGP.31).
            </p>
          </div>
        </div>
      </div>

      {/* How it's made */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">How eSIM is made</h3>
        <p className="text-sm text-gray-600 mb-3">
          Profiles are created and packaged by the carrier (or their SM-DP+ provider) according to GSMA specs (e.g. SGP.22). They are not something you build in an app like this one; they run on the cellular eUICC, not as iOS configuration profiles.
        </p>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-3">
          <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
            <li><strong>Profile package</strong> — Contains telecom credentials, network config, and policy rules. Types include unprotected, protected (encrypted), and bound (tied to a specific eUICC/EID).</li>
            <li><strong>Bound profile package</strong> — For a specific device. SM-DP+ binds the profile to that EID so only that eUICC can install it.</li>
            <li><strong>Security</strong> — PKI (certificates), mutual authentication between eUICC and SM-DP+, and encryption. GSMA defines the certificate chains (e.g. GSMA root CI).</li>
            <li><strong>Download flow</strong> — Typically: mutual authentication → PrepareDownload → GetBoundProfilePackage → secure channel → install on eUICC.</li>
          </ul>
          <p className="text-xs text-gray-600 pt-1">
            This app creates <strong>iOS configuration profiles</strong> (.mobileconfig) for Wi‑Fi, VPN, restrictions, etc. Those are different from eSIM profiles; eSIM lives on the cellular chip and is provisioned via SM-DP+/LPA, not via a .mobileconfig file.
          </p>
        </div>
      </div>

      {/* How to push */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">How to “push” (deliver) an eSIM</h3>
        <p className="text-sm text-gray-600 mb-3">
          From the user’s point of view, “push” usually means “get the plan onto my phone without swapping a physical SIM.” Technically, the device still <em>pulls</em> the profile; the “push” is how the user or network triggers that pull.
        </p>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
          <div className="p-5">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">1. QR code (most common)</h4>
            <p className="text-sm text-gray-600">
              The QR encodes an <strong>LPA URI</strong> (e.g. <code className="px-1 py-0.5 bg-gray-100 rounded text-xs">LPA:1$SM-DP+Address$ActivationCode</code>). When you scan it, the LPA gets the SM-DP+ address and activation code, then connects and downloads the profile. Fast and user-friendly.
            </p>
          </div>
          <div className="p-5">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">2. Manual entry</h4>
            <p className="text-sm text-gray-600">
              User enters <strong>SM-DP+ address</strong> (server hostname) and <strong>activation code</strong> in device settings (e.g. Settings → Cellular → Add eSIM → Enter details manually). Same secure download as QR; no camera needed.
            </p>
          </div>
          <div className="p-5">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">3. Carrier / provider app</h4>
            <p className="text-sm text-gray-600">
              The app may show a QR to scan, open a deep link that hands off to the LPA, or (on some networks) use SM-DS so the device discovers “a profile is ready” and the LPA pulls it. Some carriers also use your <strong>EID</strong> to prepare a profile for your device and then send you the QR or link.
            </p>
          </div>
          <div className="p-5">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">4. Operator-initiated (push in the strict sense)</h4>
            <p className="text-sm text-gray-600">
              The operator registers your EID and tells the SM-DP+ to prepare a profile for that EID. The device can then discover it via <strong>SM-DS</strong> (LPA periodically checks or gets notified) and pull the profile without the user scanning anything. Common in IoT (SGP.31); on phones, often combined with an app or SMS that tells the user “your eSIM is ready” and may still provide a QR or link as fallback.
            </p>
          </div>
        </div>
      </div>

      {/* Quick reference */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Quick reference</h3>
        <dl className="text-sm text-gray-700 space-y-1.5">
          <div><dt className="font-medium inline">SM-DP+</dt><dd className="inline"> — Server that hosts and prepares eSIM profiles.</dd></div>
          <div><dt className="font-medium inline">LPA</dt><dd className="inline"> — On-device app (iOS/Android) that downloads and installs profiles.</dd></div>
          <div><dt className="font-medium inline">EID</dt><dd className="inline"> — Unique eSIM chip ID; carriers may ask for it to target your device.</dd></div>
          <div><dt className="font-medium inline">Activation code</dt><dd className="inline"> — Tells SM-DP+ which profile to prepare; often paired with SM-DP+ address in QR or manual entry.</dd></div>
          <div><dt className="font-medium inline">GSMA SGP.21 / SGP.22</dt><dd className="inline"> — Consumer eSIM architecture and profile packaging (SGP.31 for IoT).</dd></div>
        </dl>
      </div>
    </div>
  );
};
