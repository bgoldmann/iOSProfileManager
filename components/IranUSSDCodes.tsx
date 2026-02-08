import React, { useState } from 'react';
import { Flag, Copy, Check } from 'lucide-react';

export interface USSDEntry {
  code: string;
  description: string;
}

export interface CarrierSection {
  carrier: string;
  subtitle?: string;
  categories: { title: string; codes: USSDEntry[] }[];
}

const IRAN_CARRIERS: CarrierSection[] = [
  {
    carrier: 'Irancell',
    subtitle: 'ایرانسل',
    categories: [
      {
        title: 'Language',
        codes: [
          { code: '*555*4*3*1#', description: 'Switch menu language to Farsi' },
          { code: '*555*4*3*2#', description: 'Switch menu language to English' },
        ],
      },
      {
        title: 'Balance & top-up',
        codes: [
          { code: '*555*1*2#', description: 'Balance inquiry' },
          { code: '*141*[16-digit code]#', description: 'Top-up with voucher code' },
          { code: '*142*1#', description: 'Set password for P2P top-up (send to others)' },
          { code: '*555*1*1*5#', description: 'Load voucher with damaged PIN' },
          { code: '*815#', description: 'Emergency charge / emergency data' },
          { code: '*46#', description: 'Credit service enquiry and pay debt' },
        ],
      },
      {
        title: 'Data & internet',
        codes: [
          { code: '*555*5#', description: 'Purchase data packages' },
          { code: '*555*1*4#', description: 'Enquiry of active packages' },
          { code: '*555*4*2#', description: 'Request mobile internet configuration' },
          { code: '*555*8#', description: 'Purchase TD packages' },
          { code: '*4444#', description: 'Irancell offered packages' },
          { code: '*20#', description: 'Check data coverage for your location' },
          { code: '*555*3*8#', description: 'Current data plan' },
        ],
      },
      {
        title: 'Products & services',
        codes: [
          { code: '*555*5*5#', description: 'Purchase combo packages (Boom & Boom+)' },
          { code: '*555*55#', description: 'Purchase voice packages' },
          { code: '*555*56#', description: 'Purchase SMS packages' },
          { code: '*555*10*3#', description: 'Check favorite number availability' },
          { code: '*555*16*1#', description: 'Purchase Irancell SIM cards' },
          { code: '*555*22#', description: 'Order tracking' },
          { code: '*555*34#', description: '3G to 4G upgrade' },
          { code: '*555*6#', description: 'Seasonal festivals / offers' },
        ],
      },
      {
        title: 'Other',
        codes: [
          { code: '*555*1*9#', description: 'Pre2Post transfer (prepaid to postpaid)' },
          { code: '*70#', description: 'Pre2Post transfer (alternative)' },
          { code: '*555*4*5*1#', description: 'Voice mail activation' },
          { code: '*555*4*5*2#', description: 'Missed calls notification activation' },
          { code: '*555*4*5*3#', description: 'Voice mail deactivation / Who Called activation' },
          { code: '*555*4*5*4#', description: 'Deactivate all messaging services' },
          { code: '*800#', description: 'Activate/deactivate promotional messages' },
          { code: '*6101#', description: 'Phone tracking service' },
          { code: '*1111#', description: 'Irancell roaming services' },
          { code: '*155#', description: 'Return to network announcement service' },
          { code: '*45#', description: 'Get MyIrancell app download link' },
        ],
      },
    ],
  },
  {
    carrier: 'Hamrah-e Aval (MCI)',
    subtitle: 'همراه اول',
    categories: [
      {
        title: 'Balance & recharge',
        codes: [
          { code: '*141*11#', description: 'Check remaining credit' },
          { code: '*140*[voucher code]#', description: 'Recharge with classic voucher' },
          { code: '*1*1#', description: 'Direct recharge' },
          { code: '*1*12#', description: 'Super recharge' },
          { code: '*1*13#', description: 'Custom amount recharge' },
        ],
      },
      {
        title: 'Data / internet inquiry',
        codes: [
          { code: '#11*140#', description: 'Prepaid: credit & data (SMS reply)' },
          { code: '#121*10#', description: 'Prepaid data inquiry (alternative)' },
          { code: '#0*100#', description: 'Permanent SIM: data inquiry' },
          { code: '#320*10#', description: 'Permanent SIM: data inquiry (alternative)' },
        ],
      },
      {
        title: 'Internet packages',
        codes: [
          { code: '*100*111#', description: 'Activate internet' },
          { code: '*100*112#', description: 'Deactivate internet' },
          { code: '*100*10#', description: 'Package status inquiry' },
          { code: '*100*31#', description: '1-day package' },
          { code: '*100*32#', description: '7-day package' },
          { code: '*100*2#', description: '30-day package' },
          { code: '*100*4#', description: 'Long-term package' },
          { code: '*100*33#', description: 'Night / special hours package' },
          { code: '*100*5#', description: 'Combo package' },
          { code: '*100*61#', description: 'Special packages' },
          { code: '*100*18#', description: 'Cancel auto-renewal' },
          { code: '*100*12#', description: 'Internet settings' },
        ],
      },
    ],
  },
  {
    carrier: 'Rightel',
    subtitle: 'رایتل',
    categories: [
      {
        title: 'Balance & account',
        codes: [
          { code: '*140#', description: 'Check remaining credit (prepaid) or bill (postpaid)' },
          { code: '*200#', description: 'Main menu — balance, packages, recharge, bills' },
          { code: '*5*200#', description: 'Account management & package balance' },
          { code: '*1*5*200#', description: 'Prepaid credit balance' },
          { code: '*2*5*200#', description: 'Internet package balance' },
          { code: '*3*5*200#', description: 'Call package balance' },
        ],
      },
    ],
  },
];

function CodeRow({
  code,
  description,
  onCopy,
}: {
  code: string;
  description: string;
  onCopy: (code: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const toCopy = code.replace(/\[.*?\]/g, '').trim();
    onCopy(toCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-start gap-3 py-3 first:pt-0 last:pb-0 border-b border-gray-100 last:border-0">
      <code className="shrink-0 font-mono text-sm bg-gray-100 text-gray-800 px-2.5 py-1.5 rounded-lg break-all">
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
        aria-label={`Copy ${code.replace(/\[.*?\]/g, '').trim()} to clipboard`}
      >
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

export const IranUSSDCodes: React.FC = () => {
  const [lastCopied, setLastCopied] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    setLastCopied(code);
    void navigator.clipboard.writeText(code);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">USSD codes — Iranian carriers</h2>
        <p className="text-sm text-gray-600 mb-4">
          USSD codes for Irancell, Hamrah-e Aval (MCI), and Rightel. Dial these in the Phone app; availability may depend on your plan and region. Codes are typically free.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> Some codes use <code className="px-1 py-0.5 bg-amber-100 rounded">#</code> at the start (e.g. <code className="px-1 py-0.5 bg-amber-100 rounded">#11*140#</code>). Replace placeholders like <code className="px-1 py-0.5 bg-amber-100 rounded">[16-digit code]</code> or <code className="px-1 py-0.5 bg-amber-100 rounded">[voucher code]</code> with your actual value.
          </p>
        </div>
      </div>

      {IRAN_CARRIERS.map((section) => (
        <div key={section.carrier} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Flag className="w-5 h-5 text-gray-500" />
            {section.carrier}
            {section.subtitle && (
              <span className="text-sm font-normal text-gray-500">({section.subtitle})</span>
            )}
          </h3>
          {section.categories.map((cat) => (
            <div key={cat.title}>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {cat.title}
              </h4>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 divide-y divide-gray-100">
                {cat.codes.map((item) => (
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
        </div>
      ))}

      {lastCopied && (
        <p className="text-xs text-gray-600 text-center">
          Copied <code className="bg-gray-100 px-1 rounded">{lastCopied}</code> — paste in the Phone keypad.
        </p>
      )}
    </div>
  );
};
