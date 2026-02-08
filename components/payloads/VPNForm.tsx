import React from 'react';
import { VpnPayload } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface Props {
  payload: VpnPayload;
  onChange: (payload: VpnPayload) => void;
}

/** VPN presets: free or well-known providers. Server/remote ID are filled; user must add credentials (shared secret or certificate) per provider. */
const VPN_PRESETS = [
  { id: 'custom', name: 'Custom / Corporate', server: 'vpn.example.com', remoteId: 'vpn.example.com', vpnType: 'IKEv2' as const },
  { id: 'vpnjantit', name: 'VPN Jantit (Free)', server: 'sggs4.vpnjantit.com', remoteId: 'sggs4.vpnjantit.com', vpnType: 'IKEv2' as const },
  { id: 'surfshark', name: 'Surfshark (IKEv2)', server: 'your-server.surfshark.com', remoteId: 'your-server.surfshark.com', vpnType: 'IKEv2' as const },
];

export const VPNForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof VpnPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const presetId = e.target.value;
    if (!presetId) return;
    const preset = VPN_PRESETS.find(p => p.id === presetId);
    if (preset) {
      onChange({
        ...payload,
        userDefinedName: preset.name,
        vpnType: preset.vpnType,
        server: preset.server,
        remoteIdentifier: preset.remoteId,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">VPN Configuration</h2>
        <p className="text-sm text-gray-600 mt-1">
          Configure Virtual Private Network settings.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Quick Load Preset */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex flex-col gap-1.5">
            <label id="vpn-preset-label" className="text-sm font-medium text-blue-900 ml-1">Quick Load Preset</label>
            <div className="relative">
              <select
                id="vpn-preset"
                aria-labelledby="vpn-preset-label"
                onChange={handlePresetChange}
                defaultValue=""
                className="w-full appearance-none px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ios-blue focus:border-transparent text-gray-700 pr-8 cursor-pointer"
              >
                <option value="" disabled>Select a provider...</option>
                {VPN_PRESETS.map(p => (
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
              Preset fills connection name, type, server, and remote ID. Add your credentials (shared secret or certificate) below. Free tier: VPN Jantit; get server from provider for Surfshark.
            </p>
          </div>
        </div>

        <Input
          label="Connection Name"
          value={payload.userDefinedName}
          onChange={(e) => handleChange('userDefinedName', e.target.value)}
          placeholder="Corporate VPN"
        />

        <Select
          label="Connection Type"
          value={payload.vpnType}
          onChange={(e) => handleChange('vpnType', e.target.value)}
          options={[
            { label: 'IKEv2', value: 'IKEv2' },
            { label: 'L2TP', value: 'L2TP' },
            { label: 'IPSec (Cisco)', value: 'IPSec' },
          ]}
        />
        
        <Input
            label="Server"
            value={payload.server}
            onChange={(e) => handleChange('server', e.target.value)}
            placeholder="vpn.example.com"
        />
        
        {/* IKEv2 Specifics */}
        {payload.vpnType === 'IKEv2' && (
            <div className="space-y-2 mt-4 border-t pt-4 animate-fadeIn">
                 <h3 className="text-sm font-medium text-gray-900 mb-2">IKEv2 Settings</h3>
                 <Input
                    label="Remote Identifier"
                    value={payload.remoteIdentifier || ''}
                    onChange={(e) => handleChange('remoteIdentifier', e.target.value)}
                    placeholder="vpn.example.com"
                />
                 <Input
                    label="Local Identifier"
                    value={payload.localIdentifier || ''}
                    onChange={(e) => handleChange('localIdentifier', e.target.value)}
                    placeholder="client.example.com"
                />
                 <Select
                    label="Authentication Method"
                    value={payload.authenticationMethod}
                    onChange={(e) => handleChange('authenticationMethod', e.target.value)}
                    options={[
                        { label: 'Shared Secret', value: 'SharedSecret' },
                        { label: 'Certificate', value: 'Certificate' },
                    ]}
                />
                {payload.authenticationMethod === 'SharedSecret' && (
                     <Input
                        label="Shared Secret"
                        type="password"
                        value={payload.sharedSecret || ''}
                        onChange={(e) => handleChange('sharedSecret', e.target.value)}
                    />
                )}
            </div>
        )}

        {/* L2TP Specifics */}
        {payload.vpnType === 'L2TP' && (
             <div className="space-y-4 mt-4 border-t pt-4 animate-fadeIn">
                <h3 className="text-sm font-medium text-gray-900 mb-2">L2TP Settings</h3>
                <Input
                    label="Account / Username"
                    value={payload.username || ''}
                    onChange={(e) => handleChange('username', e.target.value)}
                    placeholder="username"
                />
                <Input
                    label="Password"
                    type="password"
                    value={payload.password || ''}
                    onChange={(e) => handleChange('password', e.target.value)}
                />
                 <Input
                    label="Shared Secret"
                    type="password"
                    value={payload.sharedSecret || ''}
                    onChange={(e) => handleChange('sharedSecret', e.target.value)}
                    placeholder="Pre-Shared Key"
                />
             </div>
        )}

        {/* IPSec Specifics */}
        {payload.vpnType === 'IPSec' && (
             <div className="space-y-4 mt-4 border-t pt-4 animate-fadeIn">
                <h3 className="text-sm font-medium text-gray-900 mb-2">IPSec Settings</h3>
                <Input
                    label="Account / Username"
                    value={payload.username || ''}
                    onChange={(e) => handleChange('username', e.target.value)}
                    placeholder="username"
                />
                <Input
                    label="Password"
                    type="password"
                    value={payload.password || ''}
                    onChange={(e) => handleChange('password', e.target.value)}
                />
                 <Input
                    label="Group Name"
                    value={payload.groupName || ''}
                    onChange={(e) => handleChange('groupName', e.target.value)}
                    placeholder="groupname"
                />
                 <Input
                    label="Shared Secret"
                    type="password"
                    value={payload.sharedSecret || ''}
                    onChange={(e) => handleChange('sharedSecret', e.target.value)}
                    placeholder="Group Secret"
                />
             </div>
        )}
      </div>
    </div>
  );
};