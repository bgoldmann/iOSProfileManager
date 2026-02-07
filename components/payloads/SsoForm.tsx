import React from 'react';
import { SsoPayload } from '../../types';
import { Input } from '../ui/Input';

interface Props {
  payload: SsoPayload;
  onChange: (payload: SsoPayload) => void;
}

export const SsoForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof SsoPayload, value: string | string[] | undefined) => {
    onChange({ ...payload, [field]: value });
  };

  const bundleIdsStr = Array.isArray(payload.bundleIds) ? payload.bundleIds.join(', ') : '';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Single Sign-On (SSO)</h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure extensible SSO for apps (e.g. Kerberos). Requires extension type and bundle IDs.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <Input
          label="Name"
          value={payload.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Corporate SSO"
        />
        <Input
          label="Team ID"
          value={payload.teamId}
          onChange={(e) => handleChange('teamId', e.target.value)}
          placeholder="ABC123DEF4"
        />
        <Input
          label="Extension type"
          value={payload.type_}
          onChange={(e) => handleChange('type_', e.target.value)}
          placeholder="com.apple.extensibility.sso.kerberos"
        />
        <Input
          label="Bundle IDs (comma-separated)"
          value={bundleIdsStr}
          onChange={(e) => handleChange('bundleIds', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
          placeholder="com.example.app1, com.example.app2"
        />
      </div>
    </div>
  );
};
