import React from 'react';
import { AppStorePayload } from '../../types';
import { Switch } from '../ui/Switch';
import { ShoppingBag } from 'lucide-react';

interface Props {
  payload: AppStorePayload;
  onChange: (payload: AppStorePayload) => void;
}

export const AppStoreForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof AppStorePayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-start gap-4">
        <div>
            <h2 className="text-xl font-semibold text-gray-900">App Store Configuration</h2>
            <p className="text-sm text-gray-500 mt-1">
            Manage app installation policies and Store behavior.
            </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100 flex items-start gap-3">
             <ShoppingBag className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
             <p className="text-sm text-blue-800">
                 These settings control the availability of the App Store and the user's ability to install or remove applications.
             </p>
        </div>

        <div className="space-y-1">
            <Switch
                label="Allow App Installation"
                description="Enable or disable the App Store entirely"
                checked={payload.allowAppInstallation}
                onChange={(checked) => handleChange('allowAppInstallation', checked)}
            />

            <Switch
                label="Allow App Removal"
                description="Allow user to delete apps from the Home Screen"
                checked={payload.allowAppRemoval}
                onChange={(checked) => handleChange('allowAppRemoval', checked)}
            />

            <Switch
                label="Allow In-App Purchases"
                description="Enable purchasing content within apps"
                checked={payload.allowInAppPurchases}
                onChange={(checked) => handleChange('allowInAppPurchases', checked)}
            />

            <Switch
                label="Allow Automatic App Downloads"
                description="Automatically download apps purchased on other devices"
                checked={payload.allowAutomaticAppDownloads}
                onChange={(checked) => handleChange('allowAutomaticAppDownloads', checked)}
            />
            
            <div className="h-px bg-gray-100 my-4" />

            <Switch
                label="Require Password for Purchases"
                description="Force user to enter iTunes password for every purchase"
                checked={payload.forceITunesStorePasswordEntry}
                onChange={(checked) => handleChange('forceITunesStorePasswordEntry', checked)}
            />
        </div>
      </div>
    </div>
  );
};