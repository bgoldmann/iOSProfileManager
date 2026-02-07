import React from 'react';
import { CalDavPayload } from '../../types';
import { Input } from '../ui/Input';
import { Switch } from '../ui/Switch';

interface Props {
  payload: CalDavPayload;
  onChange: (payload: CalDavPayload) => void;
}

export const CalDavForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof CalDavPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">CalDAV Account</h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure settings for a CalDAV calendar account.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <Input
          label="Account Description"
          value={payload.accountDescription}
          onChange={(e) => handleChange('accountDescription', e.target.value)}
          placeholder="Work Calendar"
        />
        
        <Input
          label="Host Name"
          value={payload.hostName}
          onChange={(e) => handleChange('hostName', e.target.value)}
          placeholder="caldav.example.com"
        />

        <div className="grid grid-cols-2 gap-4">
             <Input
                label="Username"
                value={payload.username}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="user@example.com"
            />
            <Input
                label="Port (Optional)"
                type="number"
                value={payload.port || ''}
                onChange={(e) => handleChange('port', parseInt(e.target.value))}
                placeholder="8443"
            />
        </div>

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