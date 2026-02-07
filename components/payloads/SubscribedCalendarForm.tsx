import React from 'react';
import { SubscribedCalendarPayload } from '../../types';
import { Input } from '../ui/Input';
import { Switch } from '../ui/Switch';

interface Props {
  payload: SubscribedCalendarPayload;
  onChange: (payload: SubscribedCalendarPayload) => void;
}

export const SubscribedCalendarForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof SubscribedCalendarPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Subscribed Calendar</h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure a read-only calendar subscription (.ics).
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <Input
          label="Description"
          value={payload.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Company Holidays"
        />
        
        <Input
          label="Calendar URL"
          value={payload.url}
          onChange={(e) => handleChange('url', e.target.value)}
          placeholder="https://example.com/calendar.ics"
        />
        
        <Input
            label="Username (Optional)"
            value={payload.username || ''}
            onChange={(e) => handleChange('username', e.target.value)}
            placeholder="User for auth"
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