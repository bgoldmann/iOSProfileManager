import React from 'react';
import { LockScreenPayload } from '../../types';
import { Input } from '../ui/Input';

interface Props {
  payload: LockScreenPayload;
  onChange: (payload: LockScreenPayload) => void;
}

export const LockScreenForm: React.FC<Props> = ({ payload, onChange }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Lock Screen Message</h2>
        <p className="text-sm text-gray-500 mt-1">
          Show a message on the device lock screen (e.g. &quot;If lost, return to…&quot;). Visible when the device is locked.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <Input
          label="Lock Screen Message"
          value={payload.lockScreenMessage}
          onChange={(e) => onChange({ ...payload, lockScreenMessage: e.target.value })}
          placeholder="If found, please return to..."
        />
      </div>
    </div>
  );
};
