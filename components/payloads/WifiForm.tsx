import React from 'react';
import { WifiPayload } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';

interface Props {
  payload: WifiPayload;
  onChange: (payload: WifiPayload) => void;
}

export const WifiForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof WifiPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  const handleEapChange = (field: string, value: any) => {
      const currentEap = payload.eapClientConfiguration || { eapType: 'TLS' };
      onChange({
          ...payload,
          eapClientConfiguration: {
              ...currentEap,
              [field]: value
          }
      });
  };

  const eapType = payload.eapClientConfiguration?.eapType || 'TLS';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Wi-Fi Configuration</h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure wireless network settings.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <Input
          label="SSID (Network Name)"
          value={payload.ssid}
          onChange={(e) => handleChange('ssid', e.target.value)}
          placeholder="MyNetwork"
        />
        
        <Select
          label="Security Type"
          value={payload.encryptionType}
          onChange={(e) => handleChange('encryptionType', e.target.value)}
          options={[
            { label: 'WPA/WPA2/WPA3 (Personal)', value: 'WPA' },
            { label: 'WPA2 Enterprise (802.1X)', value: 'WPA2' },
            { label: 'WEP', value: 'WEP' },
            { label: 'No Encryption', value: 'None' },
            { label: 'Any (Personal)', value: 'Any' },
          ]}
        />

        {/* Standard Password for Personal Networks */}
        {(payload.encryptionType === 'WPA' || payload.encryptionType === 'WEP' || payload.encryptionType === 'Any') && (
          <Input
            label="Password"
            type="password"
            value={payload.password || ''}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Network Password"
          />
        )}

        {/* EAP Configuration */}
        {payload.encryptionType === 'WPA2' && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fadeIn space-y-4">
                <h3 className="text-sm font-medium text-gray-900 border-b pb-2">802.1X Authentication</h3>
                
                <Select
                    label="EAP Type"
                    value={eapType}
                    onChange={(e) => handleEapChange('eapType', e.target.value)}
                    options={[
                        { label: 'EAP-TLS (Certificate)', value: 'TLS' },
                        { label: 'EAP-PEAP (Username/Password)', value: 'PEAP' },
                    ]}
                />

                <Input
                    label="Username / Identity"
                    value={payload.eapClientConfiguration?.username || ''}
                    onChange={(e) => handleEapChange('username', e.target.value)}
                    placeholder={eapType === 'PEAP' ? "user@example.com" : "Certificate Identity"}
                />

                {eapType === 'PEAP' && (
                    <Input
                        label="Password (Optional)"
                        type="password"
                        value={payload.eapClientConfiguration?.password || ''}
                        onChange={(e) => handleEapChange('password', e.target.value)}
                        placeholder="Leave empty to prompt user"
                    />
                )}

                {eapType === 'TLS' && (
                    <>
                    <Input
                        label="Identity Certificate UUID"
                        value={payload.eapClientConfiguration?.userCertificateUUID || ''}
                        onChange={(e) => handleEapChange('userCertificateUUID', e.target.value)}
                        placeholder="UUID of a PKCS#12 Certificate Payload"
                        className="font-mono text-xs"
                    />
                    <p className="text-xs text-gray-500 -mt-2 ml-1">Copy the UUID from a Certificate payload added to this profile.</p>
                    </>
                )}

                <Input
                     label="Trusted Root Certificate UUIDs"
                     value={payload.eapClientConfiguration?.trustedServerCertificateUUIDs?.join(',') || ''}
                     onChange={(e) => handleEapChange('trustedServerCertificateUUIDs', e.target.value.split(',').map(s => s.trim()))}
                     placeholder="UUID1, UUID2"
                     className="font-mono text-xs"
                />
                 <p className="text-xs text-gray-500 -mt-2 ml-1">Comma-separated UUIDs of Root CA payloads to trust the RADIUS server.</p>

                 <Input
                    label="TLS Trusted Common Name (Optional)"
                    value={payload.eapClientConfiguration?.tlsCertificateCommonName || ''}
                    onChange={(e) => handleEapChange('tlsCertificateCommonName', e.target.value)}
                    placeholder="radius.example.com"
                />
            </div>
        )}

        <div className="mt-4 space-y-1">
            <Switch
                label="Auto Join"
                description="Automatically join this network when in range"
                checked={payload.autoJoin}
                onChange={(checked) => handleChange('autoJoin', checked)}
            />
            <Switch
                label="Hidden Network"
                description="Network does not broadcast its SSID"
                checked={payload.hiddenNetwork}
                onChange={(checked) => handleChange('hiddenNetwork', checked)}
            />
            <Switch
                label="Disable MAC Randomization"
                description="Use the device's actual hardware MAC address (Private Wi-Fi Address off)"
                checked={payload.disableAssociationMACRandomization}
                onChange={(checked) => handleChange('disableAssociationMACRandomization', checked)}
            />
        </div>

        {/* Proxy Settings */}
        <div className="mt-6 border-t border-gray-100 pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Proxy Configuration</h3>
            <Select
                label="Proxy Type"
                value={payload.proxyType || 'None'}
                onChange={(e) => handleChange('proxyType', e.target.value)}
                options={[
                    { label: 'None', value: 'None' },
                    { label: 'Manual', value: 'Manual' },
                    { label: 'Automatic (PAC)', value: 'Auto' },
                ]}
            />

            {payload.proxyType === 'Manual' && (
                <div className="space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-3">
                            <Input
                                label="Server"
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
            )}

            {payload.proxyType === 'Auto' && (
                <div className="animate-fadeIn">
                     <Input
                        label="PAC URL"
                        value={payload.proxyUrl || ''}
                        onChange={(e) => handleChange('proxyUrl', e.target.value)}
                        placeholder="http://wpad/wpad.dat"
                    />
                </div>
            )}
        </div>
      </div>
    </div>
  );
};