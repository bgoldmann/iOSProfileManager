import React from 'react';
import { GlobalHttpProxyPayload } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { Network, AlertTriangle } from 'lucide-react';

interface Props {
  payload: GlobalHttpProxyPayload;
  onChange: (payload: GlobalHttpProxyPayload) => void;
}

export const GlobalHttpProxyForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof GlobalHttpProxyPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-start gap-4">
        <div>
            <h2 className="text-xl font-semibold text-gray-900">Global HTTP Proxy</h2>
            <p className="text-sm text-gray-500 mt-1">
            Configure a device-wide HTTP proxy that forces all traffic through a specific server.
            </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-start gap-3">
             <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
             <p className="text-sm text-amber-800">
                 <strong>Supervised Only:</strong> This payload is only supported on supervised devices. 
                 Global Proxy forces <strong>all</strong> network traffic (Wi-Fi and Cellular) through the proxy server.
             </p>
        </div>

        <Select
            label="Proxy Type"
            value={payload.proxyType}
            onChange={(e) => handleChange('proxyType', e.target.value)}
            options={[
                { label: 'Manual', value: 'Manual' },
                { label: 'Automatic (PAC)', value: 'Auto' },
            ]}
        />

        {payload.proxyType === 'Manual' && (
            <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3">
                        <Input
                            label="Proxy Server"
                            value={payload.proxyServer || ''}
                            onChange={(e) => handleChange('proxyServer', e.target.value)}
                            placeholder="proxy.example.com"
                        />
                    </div>
                    <div>
                         <Input
                            label="Port"
                            type="number"
                            value={payload.proxyPort || ''}
                            onChange={(e) => handleChange('proxyPort', parseInt(e.target.value))}
                            placeholder="8080"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <Input
                        label="Username (Optional)"
                        value={payload.proxyUsername || ''}
                        onChange={(e) => handleChange('proxyUsername', e.target.value)}
                    />
                     <Input
                        label="Password (Optional)"
                        type="password"
                        value={payload.proxyPassword || ''}
                        onChange={(e) => handleChange('proxyPassword', e.target.value)}
                    />
                </div>
                
                <div className="pt-2">
                    <Switch
                        label="Allow Captive Network Login"
                        description="Bypass proxy for captive portal logins (e.g., hotel Wi-Fi)"
                        checked={payload.proxyCaptiveLoginAllowed}
                        onChange={(checked) => handleChange('proxyCaptiveLoginAllowed', checked)}
                    />
                </div>
            </div>
        )}

        {payload.proxyType === 'Auto' && (
             <div className="space-y-4 animate-fadeIn">
                <Input
                    label="PAC URL"
                    value={payload.proxyPacUrl || ''}
                    onChange={(e) => handleChange('proxyPacUrl', e.target.value)}
                    placeholder="http://wpad/wpad.dat"
                />

                <div className="pt-2">
                    <Switch
                        label="Allow Direct Connection Fallback"
                        description="If the PAC file is unreachable, allow direct connection"
                        checked={payload.proxyPacFallbackAllowed}
                        onChange={(checked) => handleChange('proxyPacFallbackAllowed', checked)}
                    />
                     <Switch
                        label="Allow Captive Network Login"
                        description="Bypass proxy for captive portal logins"
                        checked={payload.proxyCaptiveLoginAllowed}
                        onChange={(checked) => handleChange('proxyCaptiveLoginAllowed', checked)}
                    />
                </div>
             </div>
        )}
      </div>
    </div>
  );
};