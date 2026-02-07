import React from 'react';
import { VpnPayload } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface Props {
  payload: VpnPayload;
  onChange: (payload: VpnPayload) => void;
}

export const VPNForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof VpnPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">VPN Configuration</h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure Virtual Private Network settings.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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