import React from 'react';
import { GoogleAccountPayload } from '../../types';
import { Input } from '../ui/Input';
import { Switch } from '../ui/Switch';

interface Props {
  payload: GoogleAccountPayload;
  onChange: (payload: GoogleAccountPayload) => void;
}

export const GoogleAccountForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof GoogleAccountPayload, value: string | boolean | undefined) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Google Account</h2>
        <p className="text-sm text-gray-500 mt-1">
          Add a Google account (Gmail, Drive, etc.). User may be prompted to sign in.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <Input
          label="Account Description"
          value={payload.accountDescription}
          onChange={(e) => handleChange('accountDescription', e.target.value)}
          placeholder="Google"
        />
        <Input
          label="Account Name (optional)"
          value={payload.accountName ?? ''}
          onChange={(e) => handleChange('accountName', e.target.value || undefined)}
          placeholder="user@gmail.com"
        />
        <Switch
          label="Hide system account setup (managed only)"
          checked={payload.hideSystemAccountSetup ?? false}
          onChange={(c) => handleChange('hideSystemAccountSetup', c)}
        />
      </div>
    </div>
  );
};
