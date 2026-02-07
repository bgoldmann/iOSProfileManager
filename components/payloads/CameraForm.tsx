import React from 'react';
import { CameraPayload } from '../../types';
import { Switch } from '../ui/Switch';
import { Camera } from 'lucide-react';

interface Props {
  payload: CameraPayload;
  onChange: (payload: CameraPayload) => void;
}

export const CameraForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof CameraPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-start gap-4">
        <div>
            <h2 className="text-xl font-semibold text-gray-900">Camera Configuration</h2>
            <p className="text-sm text-gray-500 mt-1">
            Manage device camera usage and related features.
            </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100 flex items-start gap-3">
             <Camera className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
             <p className="text-sm text-blue-800">
                 These settings control access to the hardware camera and related system features. 
                 Disabling the camera will also hide the Camera app icon from the Home Screen.
             </p>
        </div>

        <Switch
            label="Allow Camera"
            description="Enable or disable the camera hardware and app"
            checked={payload.allowCamera}
            onChange={(checked) => handleChange('allowCamera', checked)}
        />
        
        <div className="h-px bg-gray-100 my-4" />

        <Switch
            label="Allow FaceTime"
            description="Enable video calling via FaceTime"
            checked={payload.allowFaceTime}
            onChange={(checked) => handleChange('allowFaceTime', checked)}
        />
        
        <div className="h-px bg-gray-100 my-4" />

        <Switch
            label="Allow Screenshots & Screen Recording"
            description="Allow users to capture the screen"
            checked={payload.allowScreenShot}
            onChange={(checked) => handleChange('allowScreenShot', checked)}
        />
      </div>
    </div>
  );
};