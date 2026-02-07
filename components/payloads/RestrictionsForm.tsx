import React from 'react';
import { RestrictionsPayload } from '../../types';
import { Switch } from '../ui/Switch';
import { Select } from '../ui/Select';

interface Props {
  payload: RestrictionsPayload;
  onChange: (payload: RestrictionsPayload) => void;
}

export const RestrictionsForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof RestrictionsPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Restrictions</h2>
        <p className="text-sm text-gray-500 mt-1">
          Control which features and applications are available on the device.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 divide-y divide-gray-100">
        
        {/* Device Functionality */}
        <div className="pb-6">
            <h3 className="text-sm font-medium text-gray-900 pb-4">Device Functionality</h3>
            <div className="space-y-1">
                <Switch
                    label="Allow Camera"
                    checked={payload.allowCamera}
                    onChange={(checked) => handleChange('allowCamera', checked)}
                />
                <Switch
                    label="Allow Screenshots"
                    checked={payload.allowScreenShot}
                    onChange={(checked) => handleChange('allowScreenShot', checked)}
                />
                <Switch
                    label="Allow Voice Dialing"
                    checked={payload.allowVoiceDialing}
                    onChange={(checked) => handleChange('allowVoiceDialing', checked)}
                />
                 <Switch
                    label="Allow Siri (Assistant)"
                    checked={payload.allowAssistant}
                    onChange={(checked) => handleChange('allowAssistant', checked)}
                />
                <Switch
                    label="Allow AirDrop"
                    checked={payload.allowAirDrop}
                    onChange={(checked) => handleChange('allowAirDrop', checked)}
                />
            </div>
        </div>

        {/* Apps & Store */}
        <div className="py-6">
            <h3 className="text-sm font-medium text-gray-900 pb-4">Apps & Store</h3>
            <div className="space-y-1">
                <Switch
                    label="Allow Safari"
                    checked={payload.allowSafari}
                    onChange={(checked) => handleChange('allowSafari', checked)}
                />
                <Switch
                    label="Allow App Installation"
                    description="Allow installing apps from App Store"
                    checked={payload.allowAppInstallation}
                    onChange={(checked) => handleChange('allowAppInstallation', checked)}
                />
                 <Switch
                    label="Allow App Removal"
                    description="Allow deleting apps"
                    checked={payload.allowAppRemoval}
                    onChange={(checked) => handleChange('allowAppRemoval', checked)}
                />
                <Switch
                    label="Allow Automatic App Downloads"
                    description="Automatically download apps purchased on other devices"
                    checked={payload.allowAutomaticAppDownloads ?? true}
                    onChange={(checked) => handleChange('allowAutomaticAppDownloads', checked)}
                />
                <Switch
                    label="Allow In-App Purchases"
                    checked={payload.allowInAppPurchases}
                    onChange={(checked) => handleChange('allowInAppPurchases', checked)}
                />
                 <Switch
                    label="Allow iTunes Store"
                    checked={payload.allowiTunes}
                    onChange={(checked) => handleChange('allowiTunes', checked)}
                />
                 <Switch
                    label="Allow iBooks Store"
                    checked={payload.allowBookstore}
                    onChange={(checked) => handleChange('allowBookstore', checked)}
                />
            </div>
        </div>

        {/* Safari Settings */}
        {payload.allowSafari && (
            <div className="py-6 animate-fadeIn">
                <h3 className="text-sm font-medium text-gray-900 pb-4">Safari Settings</h3>
                <div className="space-y-1">
                    <Switch
                        label="Allow AutoFill"
                        checked={payload.safariAllowAutoFill ?? true}
                        onChange={(checked) => handleChange('safariAllowAutoFill', checked)}
                    />
                     <Switch
                        label="Force Fraud Warning"
                        checked={payload.safariForceFraudWarning ?? true}
                        onChange={(checked) => handleChange('safariForceFraudWarning', checked)}
                    />
                    <Switch
                        label="Enable JavaScript"
                        checked={payload.safariAllowJavaScript ?? true}
                        onChange={(checked) => handleChange('safariAllowJavaScript', checked)}
                    />
                    <Switch
                        label="Allow Pop-ups"
                        checked={payload.safariAllowPopups ?? true}
                        onChange={(checked) => handleChange('safariAllowPopups', checked)}
                    />
                    <div className="mt-4">
                        <Select
                            label="Accept Cookies"
                            value={payload.safariAcceptCookies ?? 2}
                            onChange={(e) => handleChange('safariAcceptCookies', parseInt(e.target.value))}
                            options={[
                                { label: 'Always', value: 0 },
                                { label: 'Never', value: 1 },
                                { label: 'From visited sites', value: 2 },
                            ]}
                        />
                    </div>
                </div>
            </div>
        )}

        {/* iCloud & Content */}
        <div className="py-6">
            <h3 className="text-sm font-medium text-gray-900 pb-4">iCloud & Content</h3>
             <div className="space-y-1">
                <Switch
                    label="Allow Explicit Content"
                    checked={payload.allowExplicitContent}
                    onChange={(checked) => handleChange('allowExplicitContent', checked)}
                />
                <Switch
                    label="Allow iCloud Backup"
                    checked={payload.allowCloudBackup}
                    onChange={(checked) => handleChange('allowCloudBackup', checked)}
                />
             </div>
        </div>

        {/* Game Center */}
        <div className="pt-6">
             <h3 className="text-sm font-medium text-gray-900 pb-4">Game Center</h3>
             <div className="space-y-1">
                <Switch
                    label="Allow Game Center"
                    checked={payload.allowGameCenter}
                    onChange={(checked) => handleChange('allowGameCenter', checked)}
                />
                <Switch
                    label="Allow Multiplayer Gaming"
                    checked={payload.allowMultiplayerGaming}
                    onChange={(checked) => handleChange('allowMultiplayerGaming', checked)}
                />
                <Switch
                    label="Allow Adding Friends"
                    checked={payload.allowAddingGameCenterFriends}
                    onChange={(checked) => handleChange('allowAddingGameCenterFriends', checked)}
                />
             </div>
        </div>

      </div>
    </div>
  );
};