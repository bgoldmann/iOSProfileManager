import React from 'react';

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

export const iPhoneCodes: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">iPhone dial codes</h2>
        <p className="text-sm text-gray-600 mb-4">
          Codes you can enter in the <strong>Phone</strong> app dialer. Open Phone, tap the keypad, enter the code, then press Call (or they may run when you type the final #). Availability depends on carrier and iOS version.
        </p>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          {CODES_BY_CATEGORY.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">{section.title}</h3>
              <ul className="space-y-2">
                {section.codes.map((item) => (
                  <li key={item.code} className="text-sm text-gray-600 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <code className="font-mono text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded text-xs shrink-0">
                      {item.code}
                    </code>
                    <span>{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-xs text-gray-600 pt-2 border-t border-gray-100">
            <strong>Note:</strong> Many codes are carrier-specific or no longer supported. <code className="px-1 py-0.5 bg-gray-100 rounded">*#06#</code> and Field Test <code className="px-1 py-0.5 bg-gray-100 rounded">*3001#12345#*</code> are widely supported on iPhone.
          </p>
        </div>
      </div>
    </div>
  );
};
