import React from 'react';

const FAQ_ITEMS = [
  {
    question: 'Why does it say "Not Verified"?',
    answer: 'The profile is unsigned. Signing is optional; unsigned profiles work but show as "Not Verified" on the device. Use a valid certificate to sign profiles if you need them to show as verified.',
  },
  {
    question: 'How do I remove a profile?',
    answer: 'Go to Settings → General → VPN & Device Management, select the profile, then tap Remove Profile. You may need to enter your passcode.',
  },
  {
    question: 'Can I have multiple profiles?',
    answer: 'Yes. Profiles are additive. A device can have multiple configuration profiles; conflicting settings are usually resolved by installation order or payload type rules.',
  },
  {
    question: "Why won't the profile install?",
    answer: 'Common causes: HTTP instead of HTTPS (iOS blocks most HTTP profile installs), wrong MIME type when serving from a URL, empty or null optional values in the plist, or corrupted XML. Use Safari on the device and ensure the file is served with application/x-apple-aspen-config.',
  },
  {
    question: "What's the difference between supervised and unsupervised?",
    answer: 'Supervised devices (typically organization-owned) support full restrictions, silent app installs, and home screen layout control. Unsupervised (user-owned) devices have limited restriction options. Supervision is enabled via Apple Configurator 2 or Automatic Device Enrollment.',
  },
  {
    question: 'Is my data sent to a server?',
    answer: 'No. This app runs entirely in your browser. Profiles are built and downloaded locally. No data is sent to any server.',
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="flex-shrink-0 border-t border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6">
        <section aria-labelledby="footer-faq-heading">
          <h3 id="footer-faq-heading" className="text-sm font-semibold text-gray-900 mb-3">
            FAQ
          </h3>
          <div className="space-y-0 rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm">
            {FAQ_ITEMS.map((item, i) => (
              <details
                key={i}
                className="group border-b border-gray-100 last:border-b-0"
              >
                <summary className="flex items-center justify-between gap-2 list-none cursor-pointer px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ios-blue [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span className="shrink-0 text-gray-500 group-open:rotate-180 transition-transform" aria-hidden>
                    ▼
                  </span>
                </summary>
                <div className="px-4 pb-3 pt-0 text-sm text-gray-600 border-t border-gray-50">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
          <span className="font-medium text-gray-800">iOS Profile Manager</span>
          <a
            href="https://support.apple.com/guide/deployment/payload-list-for-iphone-and-ipad-depdca795ebd/web"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ios-blue hover:underline"
          >
            Apple payload list
          </a>
          <a
            href="https://mosen.github.io/profiledocs/payloads/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ios-blue hover:underline"
          >
            ProfileDocs
          </a>
        </div>
      </div>
    </footer>
  );
};
