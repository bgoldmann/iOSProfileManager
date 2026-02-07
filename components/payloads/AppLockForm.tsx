import React from 'react';
import { AppLockPayload } from '../../types';
import { Input } from '../ui/Input';
import { Switch } from '../ui/Switch';
import { Select } from '../ui/Select';
import { Smartphone } from 'lucide-react';

interface Props {
  payload: AppLockPayload;
  onChange: (payload: AppLockPayload) => void;
}

const COMMON_APPS = [
    { label: 'Select a common app...', value: '' },
    { label: 'Safari', value: 'com.apple.mobilesafari' },
    { label: 'Calculator', value: 'com.apple.calculator' },
    { label: 'Camera', value: 'com.apple.camera' },
    { label: 'Files', value: 'com.apple.DocumentsApp' },
    { label: 'Maps', value: 'com.apple.Maps' },
    { label: 'Music', value: 'com.apple.Music' },
    { label: 'Photos', value: 'com.apple.mobileslideshow' },
    { label: 'Notes', value: 'com.apple.mobilenotes' },
    { label: 'Settings', value: 'com.apple.Preferences' },
];

export const AppLockForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof AppLockPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  const handlePresetApp = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value;
      if (val) {
          handleChange('appBundleIdentifier', val);
      }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-start gap-4">
        <div>
            <h2 className="text-xl font-semibold text-gray-900">Single App Mode (App Lock)</h2>
            <p className="text-sm text-gray-500 mt-1">
            Force the device to run a single app (Kiosk Mode). requires Supervised device.
            </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-100 flex items-start gap-3">
             <Smartphone className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
             <p className="text-sm text-yellow-800">
                 <strong>Warning:</strong> Once installed, you cannot exit the app unless you remove this profile via MDM or Apple Configurator. Ensure you have the correct Bundle ID.
             </p>
        </div>

        <div className="mb-6">
            <Select 
                label="Common Apple Apps" 
                options={COMMON_APPS} 
                onChange={handlePresetApp}
                value=""
            />
            <Input
                label="App Bundle Identifier"
                value={payload.appBundleIdentifier}
                onChange={(e) => handleChange('appBundleIdentifier', e.target.value)}
                placeholder="com.company.appname"
                className="font-mono"
            />
            <p className="text-xs text-gray-500 -mt-2 ml-1">The exact bundle ID of the app to lock.</p>
        </div>
        
        <div className="border-t border-gray-100 pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Hardware Restrictions</h3>
            <div className="space-y-1">
                <Switch
                    label="Disable Touch"
                    description="Ignore touch events on screen"
                    checked={payload.disableTouch}
                    onChange={(checked) => handleChange('disableTouch', checked)}
                />
                <Switch
                    label="Disable Device Rotation"
                    description="Lock screen orientation"
                    checked={payload.disableDeviceRotation}
                    onChange={(checked) => handleChange('disableDeviceRotation', checked)}
                />
                <Switch
                    label="Disable Volume Buttons"
                    checked={payload.disableVolumeButtons}
                    onChange={(checked) => handleChange('disableVolumeButtons', checked)}
                />
                <Switch
                    label="Disable Sleep/Wake Button"
                    checked={payload.disableSleepWakeButton}
                    onChange={(checked) => handleChange('disableSleepWakeButton', checked)}
                />
                 <Switch
                    label="Disable Auto Lock"
                    description="Keep screen always on"
                    checked={payload.disableAutoLock}
                    onChange={(checked) => handleChange('disableAutoLock', checked)}
                />
            </div>
        </div>

        <div className="border-t border-gray-100 pt-4 mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Accessibility Options</h3>
            <div className="space-y-1">
                <Switch
                    label="Enable VoiceOver"
                    checked={payload.enableVoiceOver}
                    onChange={(checked) => handleChange('enableVoiceOver', checked)}
                />
                <Switch
                    label="Enable Zoom"
                    checked={payload.enableZoom}
                    onChange={(checked) => handleChange('enableZoom', checked)}
                />
                <Switch
                    label="Enable Invert Colors"
                    checked={payload.enableInvertColors}
                    onChange={(checked) => handleChange('enableInvertColors', checked)}
                />
                <Switch
                    label="Enable AssistiveTouch"
                    checked={payload.enableAssistiveTouch}
                    onChange={(checked) => handleChange('enableAssistiveTouch', checked)}
                />
            </div>
        </div>
      </div>
    </div>
  );
};