import React from 'react';
import { EmailPayload } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface Props {
  payload: EmailPayload;
  onChange: (payload: EmailPayload) => void;
}

export const EmailForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof EmailPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Email Configuration</h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure an IMAP or POP email account.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4 border-b pb-2">Account Details</h3>
          <Input
            label="Account Description"
            value={payload.accountDescription}
            onChange={(e) => handleChange('accountDescription', e.target.value)}
            placeholder="Work Email"
          />
          <Select
            label="Account Type"
            value={payload.emailAccountType}
            onChange={(e) => handleChange('emailAccountType', e.target.value)}
            options={[
              { label: 'IMAP', value: 'EmailTypeIMAP' },
              { label: 'POP', value: 'EmailTypePOP' },
            ]}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4 border-b pb-2">Incoming Mail Server</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <div className="md:col-span-3">
                <Input
                  label="Host Name"
                  value={payload.incomingMailServerHostName}
                  onChange={(e) => handleChange('incomingMailServerHostName', e.target.value)}
                  placeholder="imap.example.com"
                />
             </div>
             <div>
                <Input
                  label="Port"
                  type="number"
                  value={payload.incomingMailServerPortNumber}
                  onChange={(e) => handleChange('incomingMailServerPortNumber', parseInt(e.target.value))}
                  placeholder="993"
                />
             </div>
          </div>
          <Input
            label="Username"
            value={payload.incomingMailServerUsername}
            onChange={(e) => handleChange('incomingMailServerUsername', e.target.value)}
            placeholder="user@example.com"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4 border-b pb-2">Outgoing Mail Server</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <div className="md:col-span-3">
                <Input
                  label="Host Name"
                  value={payload.outgoingMailServerHostName}
                  onChange={(e) => handleChange('outgoingMailServerHostName', e.target.value)}
                  placeholder="smtp.example.com"
                />
             </div>
             <div>
                <Input
                  label="Port"
                  type="number"
                  value={payload.outgoingMailServerPortNumber}
                  onChange={(e) => handleChange('outgoingMailServerPortNumber', parseInt(e.target.value))}
                  placeholder="587"
                />
             </div>
          </div>
           <Input
            label="Username (Optional)"
            value={payload.outgoingMailServerUsername || ''}
            onChange={(e) => handleChange('outgoingMailServerUsername', e.target.value)}
            placeholder="Same as incoming"
          />
        </div>
      </div>
    </div>
  );
};