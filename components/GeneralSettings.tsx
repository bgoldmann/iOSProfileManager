import React from 'react';
import { ProfileMetadata } from '../types';
import { Input } from './ui/Input';

interface Props {
  metadata: ProfileMetadata;
  onChange: (metadata: ProfileMetadata) => void;
}

export const GeneralSettings: React.FC<Props> = ({ metadata, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...metadata, [name]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
        <p className="text-sm text-gray-500 mt-1">
          These settings apply to the profile itself and help identify it on the device.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-2">
        <Input
          label="Display Name"
          name="displayName"
          value={metadata.displayName}
          onChange={handleChange}
          placeholder="e.g. Company WiFi"
        />
        <Input
          label="Organization"
          name="organization"
          value={metadata.organization}
          onChange={handleChange}
          placeholder="e.g. Acme Corp"
        />
        <Input
          label="Identifier"
          name="identifier"
          value={metadata.identifier}
          onChange={handleChange}
          placeholder="com.example.profile"
        />
        <Input
          label="Description"
          name="description"
          value={metadata.description}
          onChange={handleChange}
          placeholder="Installs settings for..."
        />
        
        <div className="pt-2">
            <p className="text-xs text-gray-400 font-mono">UUID: {metadata.uuid}</p>
        </div>
      </div>
    </div>
  );
};