import React from 'react';
import { WebClipPayload } from '../../types';
import { Input } from '../ui/Input';
import { Switch } from '../ui/Switch';

interface Props {
  payload: WebClipPayload;
  onChange: (payload: WebClipPayload) => void;
}

export const WebClipForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof WebClipPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  // Basic image to base64 handler
  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Strip the data:image/png;base64, part for the plist
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        handleChange('icon', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Web Clip</h2>
        <p className="text-sm text-gray-500 mt-1">
          Add a bookmark to the Home Screen.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <Input
          label="Label"
          value={payload.label}
          onChange={(e) => handleChange('label', e.target.value)}
          placeholder="My Website"
        />
        
        <Input
          label="URL"
          type="url"
          value={payload.url}
          onChange={(e) => handleChange('url', e.target.value)}
          placeholder="https://example.com"
        />

        <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 ml-1 block mb-1">Icon (PNG recommended)</label>
            <input 
                type="file" 
                accept="image/*"
                onChange={handleIconUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ios-blue file:text-white hover:file:bg-blue-600"
            />
            {payload.icon && (
                <div className="mt-2 ml-1">
                    <img src={`data:image/png;base64,${payload.icon}`} alt="Icon preview" className="w-12 h-12 rounded-xl shadow-sm border" />
                </div>
            )}
        </div>

        <div className="mt-6 border-t border-gray-100 pt-4 space-y-1">
            <Switch
                label="Full Screen"
                description="Open as a web app (without browser chrome)"
                checked={payload.fullScreen}
                onChange={(checked) => handleChange('fullScreen', checked)}
            />
            <Switch
                label="Removable"
                description="Allow user to remove this icon"
                checked={payload.isRemovable}
                onChange={(checked) => handleChange('isRemovable', checked)}
            />
        </div>
      </div>
    </div>
  );
};