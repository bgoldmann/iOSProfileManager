import React from 'react';
import { FindMyPayload } from '../../types';
import { Switch } from '../ui/Switch';
import { MapPin } from 'lucide-react';

interface Props {
  payload: FindMyPayload;
  onChange: (payload: FindMyPayload) => void;
}

export const FindMyForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof FindMyPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-start gap-4">
        <div>
            <h2 className="text-xl font-semibold text-gray-900">Find My Configuration</h2>
            <p className="text-sm text-gray-500 mt-1">
            Manage Find My iPhone and Find My Friends settings.
            </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100 flex items-start gap-3">
             <MapPin className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
             <p className="text-sm text-blue-800">
                 These settings allow you to control whether location sharing services are enabled or disabled on the device.
             </p>
        </div>

        <div className="space-y-1">
            <Switch
                label="Allow Find My Device"
                description="Enable Find My iPhone/iPad/Mac"
                checked={payload.allowFindMyDevice}
                onChange={(checked) => handleChange('allowFindMyDevice', checked)}
            />

            <div className="h-px bg-gray-100 my-4" />

            <Switch
                label="Allow Find My Friends"
                description="Enable the Find My Friends feature"
                checked={payload.allowFindMyFriends}
                onChange={(checked) => handleChange('allowFindMyFriends', checked)}
            />

            <Switch
                label="Allow Modifying Find My Friends Settings"
                description="Allow user to change friend sharing settings"
                checked={payload.allowFindMyFriendsModification}
                onChange={(checked) => handleChange('allowFindMyFriendsModification', checked)}
            />
        </div>
      </div>
    </div>
  );
};