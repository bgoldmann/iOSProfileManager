import React from 'react';
import { DnsPayload } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';

interface Props {
  payload: DnsPayload;
  onChange: (payload: DnsPayload) => void;
}

const PRESETS = [
    { id: 'google', name: 'Google Public DNS', ips: '8.8.8.8, 8.8.4.4', doh: 'https://dns.google/dns-query', dot: 'dns.google' },
    { id: 'cloudflare', name: 'Cloudflare', ips: '1.1.1.1, 1.0.0.1', doh: 'https://cloudflare-dns.com/dns-query', dot: '1dot1dot1dot1.cloudflare-dns.com' },
    { id: 'quad9', name: 'Quad9', ips: '9.9.9.9, 149.112.112.112', doh: 'https://dns.quad9.net/dns-query', dot: 'dns.quad9.net' },
    { id: 'adguard', name: 'AdGuard Default', ips: '94.140.14.14, 94.140.15.15', doh: 'https://dns.adguard-dns.com/dns-query', dot: 'dns.adguard-dns.com' },
    { id: 'nextdns', name: 'NextDNS (Generic)', ips: '45.90.28.0, 45.90.30.0', doh: 'https://dns.nextdns.io', dot: 'dns.nextdns.io' },
];

export const DnsForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof DnsPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const presetId = e.target.value;
      if (!presetId) return;

      const preset = PRESETS.find(p => p.id === presetId);
      if (preset) {
          onChange({ 
              ...payload, 
              serverAddresses: preset.ips,
              serverUrl: preset.doh,
              serverName: preset.dot
          });
      }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Encrypted DNS</h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure DNS-over-HTTPS (DoH) or DNS-over-TLS (DoT).
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        
        {/* Presets Section */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
             <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-blue-900 ml-1">Quick Load Preset</label>
                <div className="relative">
                    <select
                        onChange={handlePresetChange}
                        defaultValue=""
                        className="w-full appearance-none px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ios-blue focus:border-transparent text-gray-700 pr-8 cursor-pointer"
                    >
                        <option value="" disabled>Select a provider...</option>
                        {PRESETS.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <p className="text-xs text-blue-600/80 ml-1">
                    Selecting a preset will overwrite the URL, Hostname, and Server Addresses below.
                </p>
             </div>
        </div>

        <Select
          label="Protocol"
          value={payload.dnsProtocol}
          onChange={(e) => handleChange('dnsProtocol', e.target.value)}
          options={[
            { label: 'HTTPS (DoH)', value: 'HTTPS' },
            { label: 'TLS (DoT)', value: 'TLS' },
          ]}
        />
        
        {payload.dnsProtocol === 'HTTPS' && (
             <Input
                label="Server URL"
                value={payload.serverUrl || ''}
                onChange={(e) => handleChange('serverUrl', e.target.value)}
                placeholder="https://dns.example.com/query"
            />
        )}

        {payload.dnsProtocol === 'TLS' && (
             <Input
                label="Server Name"
                value={payload.serverName || ''}
                onChange={(e) => handleChange('serverName', e.target.value)}
                placeholder="dns.example.com"
            />
        )}

        <div className="space-y-4 pt-2">
            <Input
                label="Server Addresses (Optional)"
                value={payload.serverAddresses}
                onChange={(e) => handleChange('serverAddresses', e.target.value)}
                placeholder="203.0.113.1, 203.0.113.2"
                className="font-mono"
            />
            <p className="text-xs text-gray-500 -mt-2 ml-1">Comma-separated list of IP addresses for bootstrapping.</p>

            <Input
                label="Supplemental Match Domains"
                value={payload.supplementalMatchDomains}
                onChange={(e) => handleChange('supplementalMatchDomains', e.target.value)}
                placeholder="example.com, internal.local"
                className="font-mono"
            />
            <p className="text-xs text-gray-500 -mt-2 ml-1">Comma-separated domains to use this DNS server for. Leave empty for global (system-wide).</p>
        </div>
        
        <div className="mt-6 border-t border-gray-100 pt-4">
             <Switch
                label="Prohibit Disablement"
                description="Prevent user from disabling these DNS settings"
                checked={payload.prohibitDisablement}
                onChange={(checked) => handleChange('prohibitDisablement', checked)}
            />
        </div>
      </div>
    </div>
  );
};