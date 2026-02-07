import React from 'react';
import { ExchangeEasPayload } from '../../types';
import { Input } from '../ui/Input';
import { Switch } from '../ui/Switch';

interface Props {
  payload: ExchangeEasPayload;
  onChange: (payload: ExchangeEasPayload) => void;
}

export const ExchangeEasForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof ExchangeEasPayload, value: string | number | boolean | undefined) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Exchange ActiveSync</h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure a Microsoft Exchange or Office 365 email account.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <Input
          label="Email Address"
          type="email"
          value={payload.emailAddress}
          onChange={(e) => handleChange('emailAddress', e.target.value)}
          placeholder="user@company.com"
        />
        <Input
          label="Exchange Server (Host)"
          value={payload.host}
          onChange={(e) => handleChange('host', e.target.value)}
          placeholder="outlook.office365.com or mail.company.com"
        />
        <Input
          label="Username (optional – prompt on device if blank)"
          value={payload.username ?? ''}
          onChange={(e) => handleChange('username', e.target.value || undefined)}
          placeholder="DOMAIN\\user or user@domain.com"
        />
        <Input
          label="Password (optional – prompt on device if blank)"
          type="password"
          value={payload.password ?? ''}
          onChange={(e) => handleChange('password', e.target.value || undefined)}
          placeholder="Leave blank to prompt on device"
        />
        <Input
          label="Days of mail to sync"
          type="number"
          value={payload.mailNumberOfPastDaysToSync ?? ''}
          onChange={(e) => handleChange('mailNumberOfPastDaysToSync', e.target.value ? parseInt(e.target.value, 10) : undefined)}
          placeholder="7"
        />
        <div className="flex flex-wrap gap-6 pt-2">
          <Switch
            label="Use SSL"
            checked={payload.useSSL}
            onChange={(c) => handleChange('useSSL', c)}
          />
          <Switch
            label="Prevent Move (disable moving messages)"
            checked={payload.preventMove ?? false}
            onChange={(c) => handleChange('preventMove', c)}
          />
        </div>
      </div>
    </div>
  );
};
