import React from 'react';
import { SettingsRestrictionsPayload } from '../../types';
import { Switch } from '../ui/Switch';
import { Sliders, AlertTriangle } from 'lucide-react';

interface Props {
  payload: SettingsRestrictionsPayload;
  onChange: (payload: SettingsRestrictionsPayload) => void;
}

export const SettingsRestrictionsForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof SettingsRestrictionsPayload, value: boolean) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-start gap-4">
        <div>
            <h2 className="text-xl font-semibold text-gray-900">Settings Restrictions</h2>
            <p className="text-sm text-gray-500 mt-1">
            Prevent users from modifying system settings, accounts, and configurations.
            </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
             <div className="bg-amber-50 p-4 rounded-lg mb-6 border border-amber-100 flex items-start gap-3">
                 <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                 <p className="text-sm text-amber-800">
                     Most of these settings require the device to be <strong>Supervised</strong> (via Apple Configurator or DEP). 
                     If the device is not supervised, these settings may be ignored.
                 </p>
            </div>

            <div className="space-y-1">
                <Switch
                    label="Allow Account Modification"
                    description="Prevent adding, removing, or modifying email and iCloud accounts"
                    checked={payload.allowAccountModification}
                    onChange={(checked) => handleChange('allowAccountModification', checked)}
                />

                <Switch
                    label="Allow Passcode Modification"
                    description="Prevent changing the device passcode"
                    checked={payload.allowPasscodeModification}
                    onChange={(checked) => handleChange('allowPasscodeModification', checked)}
                />

                <Switch
                    label="Allow Device Name Modification"
                    description="Prevent changing the device name in Settings > General"
                    checked={payload.allowDeviceNameModification}
                    onChange={(checked) => handleChange('allowDeviceNameModification', checked)}
                />

                <Switch
                    label="Allow Wallpaper Modification"
                    description="Prevent changing the Lock Screen or Home Screen wallpaper"
                    checked={payload.allowWallpaperModification}
                    onChange={(checked) => handleChange('allowWallpaperModification', checked)}
                />
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
             <div className="flex items-center gap-2 mb-4">
                 <Sliders className="w-5 h-5 text-gray-500" />
                 <h3 className="text-lg font-medium text-gray-900">Connectivity & System</h3>
            </div>
            
            <div className="space-y-1">
                 <Switch
                    label="Allow Bluetooth Modification"
                    description="Allow turning Bluetooth on or off"
                    checked={payload.allowBluetoothModification}
                    onChange={(checked) => handleChange('allowBluetoothModification', checked)}
                />

                 <Switch
                    label="Allow Personal Hotspot Modification"
                    description="Allow changing Personal Hotspot settings"
                    checked={payload.allowPersonalHotspotModification}
                    onChange={(checked) => handleChange('allowPersonalHotspotModification', checked)}
                />

                <Switch
                    label="Allow Installing Config Profiles"
                    description="Allow user to install profiles manually via Settings"
                    checked={payload.allowUIConfigurationProfileInstallation}
                    onChange={(checked) => handleChange('allowUIConfigurationProfileInstallation', checked)}
                />

                <div className="h-px bg-gray-100 my-4" />

                <Switch
                    label="Allow Erase Content & Settings"
                    description="Allow user to factory reset the device"
                    checked={payload.allowEraseContentAndSettings}
                    onChange={(checked) => handleChange('allowEraseContentAndSettings', checked)}
                />
            </div>
        </div>
      </div>
    </div>
  );
};