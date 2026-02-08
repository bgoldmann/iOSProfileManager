import React, { useState } from 'react';
import { Hash as HashIcon, Copy, Check } from 'lucide-react';

export interface DialCode {
  code: string;
  description: string;
}

const CODES_BY_CATEGORY: { title: string; codes: DialCode[] }[] = [
  {
    title: 'Device information',
    codes: [
      { code: '*#06#', description: 'Display IMEI, MEID, and serial number' },
      { code: '*#07#', description: 'Legal & regulatory (SAR / RF exposure)' },
    ],
  },
  {
    title: 'Network & signal',
    codes: [
      { code: '*3001#12345#*', description: 'Field Test Mode — cellular signal (dBm), network and cell tower info' },
      { code: '*#43#', description: 'Check call waiting status (on/off)' },
      { code: '*#5005*7672#', description: 'SMS centre number' },
    ],
  },
  {
    title: 'Call forwarding & status',
    codes: [
      { code: '*#21#', description: 'Call forwarding status and manage forwarding' },
      { code: '*#61#', description: 'Missed-call forwarding number and status' },
      { code: '*#62#', description: 'Forwarding when unreachable' },
      { code: '*#67#', description: 'Call forwarding number when busy or rejected' },
      { code: '*#76#', description: 'Connected line identification' },
      { code: '*#77#', description: 'Anonymous call rejection status' },
      { code: '*#90#', description: 'Forwarding when unreachable' },
      { code: '*#002#', description: 'Disable all call forwarding' },
      { code: '*#31#', description: 'Caller ID display (hide number) status' },
      { code: '*#33#', description: 'Call barring / disabled services status' },
    ],
  },
  {
    title: 'Call features (prefix before dialing)',
    codes: [
      { code: '*67', description: 'Hide your caller ID for the next call' },
      { code: '*82', description: 'Show your caller ID for the next call' },
      { code: '*43#', description: 'Enable call waiting' },
      { code: '#43#', description: 'Disable call waiting' },
      { code: '*3370#', description: 'Enable Enhanced Full Rate (EFR) — may improve voice quality' },
      { code: '*4720#', description: 'Enable Half Rate Mode' },
    ],
  },
  {
    title: 'Carrier & billing (carrier-dependent)',
    codes: [
      { code: '*225#', description: 'Account balance (many US carriers)' },
      { code: '*646#', description: 'Remaining minutes (e.g. AT&T post-paid)' },
      { code: '*777#', description: 'Prepaid account balance (some carriers)' },
      { code: '*611', description: 'Carrier customer service (many US carriers)' },
      { code: '*228', description: 'Activate or update (some US carriers)' },
    ],
  },
  {
    title: 'Other',
    codes: [
      { code: '*#0*#', description: 'LCD / hardware test (some models; may not work on all iPhones)' },
    ],
  },
];

function CodeRow({ code, description, onCopy }: { code: string; description: string; onCopy: (code: string) => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-start gap-3 py-3 first:pt-0 last:pb-0 border-b border-gray-100 last:border-0">
      <code className="shrink-0 font-mono text-sm bg-gray-100 text-gray-800 px-2.5 py-1.5 rounded-lg">
        {code}
      </code>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700">{description}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-ios-blue transition-colors"
        title="Copy code"
        aria-label={`Copy ${code} to clipboard`}
      >
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

export const iPhoneCodes: React.FC = () => {
  const [lastCopied, setLastCopied] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    setLastCopied(code);
    void navigator.clipboard.writeText(code);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">iPhone dial codes</h2>
        <p className="text-sm text-gray-500 mb-4">
          Secret codes you can enter in the <strong>Phone</strong> app dialer. Open Phone, tap the keypad, enter the code exactly, then press Call (or they may run when you type the final #). Availability depends on carrier and iOS version.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> Many codes are carrier-specific or no longer supported. Device-info codes like <code className="px-1 py-0.5 bg-amber-100 rounded">*#06#</code> and Field Test <code className="px-1 py-0.5 bg-amber-100 rounded">*3001#12345#*</code> are widely supported on iPhone.
          </p>
        </div>
      </div>

      {CODES_BY_CATEGORY.map((section) => (
        <div key={section.title}>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
            <HashIcon className="w-4 h-4" />
            {section.title}
          </h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100 px-4">
            {section.codes.map((item) => (
              <CodeRow
                key={item.code}
                code={item.code}
                description={item.description}
                onCopy={handleCopy}
              />
            ))}
          </div>
        </div>
      ))}

      {lastCopied && (
        <p className="text-xs text-gray-400 text-center">
          Copied <code className="bg-gray-100 px-1 rounded">{lastCopied}</code> to clipboard — paste in the Phone keypad.
        </p>
      )}
    </div>
  );
};
