import React from 'react';
import { AirPrintPayload, AirPrintPrinter } from '../../types';
import { Input } from '../ui/Input';
import { Switch } from '../ui/Switch';

interface Props {
  payload: AirPrintPayload;
  onChange: (payload: AirPrintPayload) => void;
}

export const AirPrintForm: React.FC<Props> = ({ payload, onChange }) => {
  const printers = payload.printers || [];

  const updatePrinter = (index: number, field: keyof AirPrintPrinter, value: string | number | boolean | undefined) => {
    const next = [...printers];
    if (!next[index]) next[index] = { ipAddress: '', resourcePath: '' };
    next[index] = { ...next[index], [field]: value };
    onChange({ ...payload, printers: next });
  };

  const addPrinter = () => {
    onChange({ ...payload, printers: [...printers, { ipAddress: '', resourcePath: '' }] });
  };

  const removePrinter = (index: number) => {
    onChange({ ...payload, printers: printers.filter((_, i) => i !== index) });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">AirPrint</h2>
        <p className="text-sm text-gray-500 mt-1">
          Add AirPrint printers. Use ippfind on a Mac on the same network to get Resource Path.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Printers</span>
          <button type="button" onClick={addPrinter} className="text-sm text-ios-blue hover:underline">
            + Add printer
          </button>
        </div>
        {printers.map((p, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="IP Address"
                value={p.ipAddress}
                onChange={(e) => updatePrinter(i, 'ipAddress', e.target.value)}
                placeholder="192.168.1.10"
              />
              <Input
                label="Port (optional)"
                type="number"
                value={p.port ?? ''}
                onChange={(e) => updatePrinter(i, 'port', e.target.value ? parseInt(e.target.value, 10) : undefined)}
                placeholder="631"
              />
            </div>
            <Input
              label="Resource Path"
              value={p.resourcePath}
              onChange={(e) => updatePrinter(i, 'resourcePath', e.target.value)}
              placeholder="printers/Canon_MG5300_series"
            />
            <div className="flex items-center justify-between">
              <Switch
                label="Force TLS"
                checked={p.forceTLS ?? false}
                onChange={(c) => updatePrinter(i, 'forceTLS', c)}
              />
              <button type="button" onClick={() => removePrinter(i)} className="text-sm text-red-600 hover:underline">
                Remove printer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
