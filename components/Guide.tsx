import React from 'react';

export const Guide: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* How profiles work */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">How profiles work</h2>
        <p className="text-sm text-gray-600 mb-4">
          iOS configuration profiles are settings bundles you install on iPhone, iPad, and other Apple devices to configure behavior without changing each setting manually.
        </p>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">What is a .mobileconfig file?</h3>
            <p className="text-sm text-gray-600">
              A configuration profile is an XML plist file that iOS recognizes by extension and content. It contains:
            </p>
            <ul className="mt-2 ml-4 list-disc text-sm text-gray-600 space-y-1">
              <li><strong>Root metadata</strong> — Display name, organization, identifier, UUID</li>
              <li><strong>PayloadContent</strong> — An array of payloads (Wi‑Fi, VPN, restrictions, etc.)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Where profiles appear on device</h3>
            <p className="text-sm text-gray-600">
              After installation, profiles are stored under <strong>Settings → General → VPN &amp; Device Management</strong> (or <strong>Profiles</strong> on older iOS). You can remove a profile from there to revert its settings.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Supervised vs unsupervised</h3>
            <p className="text-sm text-gray-600">
              Many restrictions and options (e.g. silent app installs, home screen layout) only apply to <strong>supervised</strong> devices. Supervision is enabled via Apple Configurator 2 or Automatic Device Enrollment. User-owned devices are typically unsupervised.
            </p>
          </div>
        </div>
      </div>

      {/* How to install on iOS */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">How to install on iOS</h2>
        <p className="text-sm text-gray-600 mb-4">
          Follow these steps to install a profile on your iPhone or iPad.
        </p>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <ol className="space-y-3 list-decimal list-inside text-sm text-gray-700">
            <li><strong>Download</strong> the <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">.mobileconfig</code> file from this app (or open a link that serves it).</li>
            <li><strong>Open</strong> the file on your iPhone/iPad — via Mail, Files, Safari, AirDrop, or another app.</li>
            <li>iOS shows the <strong>Install Profile</strong> screen with organization, name, and payload summary.</li>
            <li>Tap <strong>Install</strong> and enter your device passcode if prompted.</li>
            <li>Tap <strong>Install</strong> again to confirm.</li>
            <li>The profile appears under <strong>Settings → General → VPN &amp; Device Management</strong>.</li>
          </ol>
          <p className="mt-4 text-xs text-gray-600">
            <strong>Tip:</strong> For install-from-URL, iOS requires HTTPS. Use Safari on the device for the best native install prompt; some browsers may download the file instead.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">FAQ</h2>
        <p className="text-sm text-gray-600 mb-4">
          Common questions about iOS configuration profiles.
        </p>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
          <div className="p-5">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">Why does it say &quot;Not Verified&quot;?</h4>
            <p className="text-sm text-gray-600">
              The profile is unsigned. Signing is optional; unsigned profiles work but show as &quot;Not Verified&quot; on the device. Use a valid certificate to sign profiles if you need them to show as verified.
            </p>
          </div>
          <div className="p-5">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">How do I remove a profile?</h4>
            <p className="text-sm text-gray-600">
              Go to <strong>Settings → General → VPN &amp; Device Management</strong>, select the profile, then tap <strong>Remove Profile</strong>. You may need to enter your passcode.
            </p>
          </div>
          <div className="p-5">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">Can I have multiple profiles?</h4>
            <p className="text-sm text-gray-600">
              Yes. Profiles are additive. A device can have multiple configuration profiles; conflicting settings are usually resolved by installation order or payload type rules.
            </p>
          </div>
          <div className="p-5">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">Why won&apos;t the profile install?</h4>
            <p className="text-sm text-gray-600">
              Common causes: HTTP instead of HTTPS (iOS blocks most HTTP profile installs), wrong MIME type when serving from a URL, empty or null optional values in the plist, or corrupted XML. Use Safari on the device and ensure the file is served with <code className="px-1 py-0.5 bg-gray-100 rounded text-xs">application/x-apple-aspen-config</code>.
            </p>
          </div>
          <div className="p-5">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">What&apos;s the difference between supervised and unsupervised?</h4>
            <p className="text-sm text-gray-600">
              Supervised devices (typically organization-owned) support full restrictions, silent app installs, and home screen layout control. Unsupervised (user-owned) devices have limited restriction options. Supervision is enabled via Apple Configurator 2 or Automatic Device Enrollment.
            </p>
          </div>
          <div className="p-5">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">Is my data sent to a server?</h4>
            <p className="text-sm text-gray-600">
              No. This app runs entirely in your browser. Profiles are built and downloaded locally. No data is sent to any server.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
