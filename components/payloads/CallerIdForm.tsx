import React from 'react';
import { CallerIdPayload } from '../../types';
import { Switch } from '../ui/Switch';
import { Phone } from 'lucide-react';

interface Props {
  payload: CallerIdPayload;
  onChange: (payload: CallerIdPayload) => void;
}

export const CallerIdForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof CallerIdPayload, value: boolean) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-start gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Caller ID</h2>
          <p className="text-sm text-gray-500 mt-1">
            Control whether the device can show the user’s caller ID when making calls (Show My Caller ID).
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100 flex items-start gap-3">
          <Phone className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-800">
            When disabled, the system prevents changing or using “Show My Caller ID” so the number is hidden when placing calls. Requires a supported carrier and may require a supervised device in some iOS versions.
          </p>
        </div>

        <Switch
          label="Allow Show Caller ID"
          description="Allow the device to display the user’s phone number to the recipient when making calls"
          checked={payload.allowShowCallerID}
          onChange={(checked) => handleChange('allowShowCallerID', checked)}
        />
      </div>
    </div>
  );
};
