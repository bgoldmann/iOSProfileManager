import React from 'react';
import { ScepPayload } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface Props {
  payload: ScepPayload;
  onChange: (payload: ScepPayload) => void;
}

export const ScepForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof ScepPayload, value: string | number | undefined) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">SCEP (Certificate Enrollment)</h2>
        <p className="text-sm text-gray-500 mt-1">
          Request a client certificate from an SCEP server. Often used with MDM.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <Input
          label="SCEP URL (required)"
          value={payload.url}
          onChange={(e) => handleChange('url', e.target.value)}
          placeholder="https://scep.example.com/scep"
        />
        <Input
          label="Name (optional – e.g. domain for the CA)"
          value={payload.name ?? ''}
          onChange={(e) => handleChange('name', e.target.value || undefined)}
          placeholder="example.com"
        />
        <Input
          label="Challenge (pre-shared secret for auto enrollment)"
          type="password"
          value={payload.challenge ?? ''}
          onChange={(e) => handleChange('challenge', e.target.value || undefined)}
          placeholder="Optional"
        />
        <Select
          label="Key size"
          value={String(payload.keysize)}
          onChange={(e) => handleChange('keysize', parseInt(e.target.value, 10) as 1024 | 2048)}
          options={[
            { label: '1024', value: '1024' },
            { label: '2048', value: '2048' },
          ]}
        />
        <Input
          label="Retries"
          type="number"
          value={payload.retries ?? ''}
          onChange={(e) => handleChange('retries', e.target.value ? parseInt(e.target.value, 10) : undefined)}
          placeholder="3"
        />
        <Input
          label="Retry delay (seconds)"
          type="number"
          value={payload.retryDelay ?? ''}
          onChange={(e) => handleChange('retryDelay', e.target.value ? parseInt(e.target.value, 10) : undefined)}
          placeholder="10"
        />
      </div>
    </div>
  );
};
