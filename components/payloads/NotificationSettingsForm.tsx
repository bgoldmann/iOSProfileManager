import React from 'react';
import { NotificationSettingsPayload } from '../../types';
import { Switch } from '../ui/Switch';

interface Props {
  payload: NotificationSettingsPayload;
  onChange: (payload: NotificationSettingsPayload) => void;
}

export const NotificationSettingsForm: React.FC<Props> = ({ payload, onChange }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
        <p className="text-sm text-gray-500 mt-1">
          Allow or restrict notifications and whether the user can change notification settings.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <Switch
          label="Allow Notifications"
          checked={payload.allowNotifications}
          onChange={(c) => onChange({ ...payload, allowNotifications: c })}
        />
        <Switch
          label="Allow user to modify notification settings"
          checked={payload.allowNotificationsModification ?? true}
          onChange={(c) => onChange({ ...payload, allowNotificationsModification: c })}
        />
      </div>
    </div>
  );
};
