import React from 'react';
import { PasscodePayload } from '../../types';
import { Input } from '../ui/Input';
import { Switch } from '../ui/Switch';

interface Props {
  payload: PasscodePayload;
  onChange: (payload: PasscodePayload) => void;
}

export const PasscodeForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof PasscodePayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Passcode Policy</h2>
        <p className="text-sm text-gray-500 mt-1">
          Enforce device passcode requirements.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <Switch
            label="Force Passcode"
            description="Require a passcode on the device"
            checked={payload.forcePIN}
            onChange={(checked) => handleChange('forcePIN', checked)}
        />
        
        <div className="h-px bg-gray-100 my-4" />

        <div className="space-y-4">
             <Input
                label="Minimum Length"
                type="number"
                value={payload.minLength}
                onChange={(e) => handleChange('minLength', parseInt(e.target.value))}
            />

            <Switch
                label="Allow Simple Value"
                description="Allow simple sequences like '1234'"
                checked={payload.allowSimple}
                onChange={(checked) => handleChange('allowSimple', checked)}
            />

             <Switch
                label="Require Alphanumeric"
                description="Passcode must contain both letters and numbers"
                checked={payload.requireAlphanumeric}
                onChange={(checked) => handleChange('requireAlphanumeric', checked)}
            />

            <Input
                label="Maximum Passcode Age (Days)"
                type="number"
                value={payload.maxPINAgeInDays || ''}
                onChange={(e) => handleChange('maxPINAgeInDays', parseInt(e.target.value))}
                placeholder="0 (None)"
            />

             <Input
                label="Maximum Failed Attempts"
                type="number"
                value={payload.maxFailedAttempts || ''}
                onChange={(e) => handleChange('maxFailedAttempts', parseInt(e.target.value))}
                placeholder="0 (None)"
            />
        </div>
      </div>
    </div>
  );
};