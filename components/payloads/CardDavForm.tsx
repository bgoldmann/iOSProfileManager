import React from 'react';
import { CardDavPayload } from '../../types';
import { Input } from '../ui/Input';
import { Switch } from '../ui/Switch';

interface Props {
  payload: CardDavPayload;
  onChange: (payload: CardDavPayload) => void;
}

export const CardDavForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof CardDavPayload, value: string | number | boolean | undefined) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">CardDAV (Contacts)</h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure a CardDAV account for contacts (e.g. Nextcloud, iCloud, Fastmail).
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <Input
          label="Account Description"
          value={payload.accountDescription}
          onChange={(e) => handleChange('accountDescription', e.target.value)}
          placeholder="Work Contacts"
        />

        <Input
          label="Host Name"
          value={payload.hostName}
          onChange={(e) => handleChange('hostName', e.target.value)}
          placeholder="carddav.example.com"
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input
            label="Username"
            value={payload.username}
            onChange={(e) => handleChange('username', e.target.value)}
            placeholder="user@example.com"
          />
          <Input
            label="Port (Optional)"
            type="number"
            value={payload.port ?? ''}
            onChange={(e) => handleChange('port', e.target.value ? parseInt(e.target.value, 10) : undefined)}
            placeholder="443"
          />
        </div>

        <Input
          label="Principal URL (Optional)"
          value={payload.principalURL ?? ''}
          onChange={(e) => handleChange('principalURL', e.target.value || undefined)}
          placeholder="https://carddav.example.com/principals/user/"
        />

        <Input
          label="Password (Optional)"
          type="password"
          value={payload.password ?? ''}
          onChange={(e) => handleChange('password', e.target.value || undefined)}
          placeholder="Leave blank to prompt on device"
        />

        <div className="mt-6 border-t border-gray-100 pt-4">
          <Switch
            label="Use SSL"
            checked={payload.useSSL}
            onChange={(checked) => handleChange('useSSL', checked)}
          />
        </div>
      </div>
    </div>
  );
};
