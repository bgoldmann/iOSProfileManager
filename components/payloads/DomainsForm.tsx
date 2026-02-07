import React from 'react';
import { DomainsPayload } from '../../types';
import { Input } from '../ui/Input';

interface Props {
  payload: DomainsPayload;
  onChange: (payload: DomainsPayload) => void;
}

const toList = (s: string) => s.split(',').map((x) => x.trim()).filter(Boolean);
const fromList = (arr: string[] | undefined) => (arr && arr.length ? arr.join(', ') : '');

export const DomainsForm: React.FC<Props> = ({ payload, onChange }) => {
  const setDomains = (field: 'emailDomains' | 'webDomains' | 'safariPasswordAutoFillDomains', value: string) => {
    onChange({ ...payload, [field]: toList(value) });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Managed Domains</h2>
        <p className="text-sm text-gray-500 mt-1">
          Domains used for SSO, app config, or Safari password autofill. One or more domains, comma-separated.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <Input
          label="Email domains"
          value={fromList(payload.emailDomains)}
          onChange={(e) => setDomains('emailDomains', e.target.value)}
          placeholder="company.com, mail.company.com"
        />
        <Input
          label="Web domains"
          value={fromList(payload.webDomains)}
          onChange={(e) => setDomains('webDomains', e.target.value)}
          placeholder="company.com, app.company.com"
        />
        <Input
          label="Safari Password AutoFill domains"
          value={fromList(payload.safariPasswordAutoFillDomains)}
          onChange={(e) => setDomains('safariPasswordAutoFillDomains', e.target.value)}
          placeholder="login.company.com"
        />
      </div>
    </div>
  );
};
