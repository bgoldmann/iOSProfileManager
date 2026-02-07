import React from 'react';
import { FontsPayload } from '../../types';
import { Input } from '../ui/Input';

interface Props {
  payload: FontsPayload;
  onChange: (payload: FontsPayload) => void;
}

export const FontsForm: React.FC<Props> = ({ payload, onChange }) => {
  const fonts = payload.fonts || [];

  const updateFont = (index: number, field: 'name' | 'data', value: string) => {
    const next = [...fonts];
    if (!next[index]) next[index] = { name: '', data: '' };
    next[index] = { ...next[index], [field]: value };
    onChange({ ...payload, fonts: next });
  };

  const addFont = () => {
    onChange({ ...payload, fonts: [...fonts, { name: '', data: '' }] });
  };

  const removeFont = (index: number) => {
    onChange({ ...payload, fonts: fonts.filter((_, i) => i !== index) });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Fonts</h2>
        <p className="text-sm text-gray-500 mt-1">
          Install custom fonts. Add font name and base64-encoded font data (e.g. from a .ttf/.otf file).
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Fonts</span>
          <button type="button" onClick={addFont} className="text-sm text-ios-blue hover:underline">
            + Add font
          </button>
        </div>
        {fonts.map((f, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-3">
            <Input
              label="Font name (e.g. MyFont.ttf)"
              value={f.name}
              onChange={(e) => updateFont(i, 'name', e.target.value)}
              placeholder="CustomFont.otf"
            />
            <Input
              label="Base64 font data"
              value={f.data}
              onChange={(e) => updateFont(i, 'data', e.target.value)}
              placeholder="Paste base64-encoded font data"
            />
            <button type="button" onClick={() => removeFont(i)} className="text-sm text-red-600 hover:underline">
              Remove font
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
