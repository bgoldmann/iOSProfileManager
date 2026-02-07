import React from 'react';
import { SafariPayload, SafariBookmark } from '../../types';
import { Input } from '../ui/Input';
import { Switch } from '../ui/Switch';

interface Props {
  payload: SafariPayload;
  onChange: (payload: SafariPayload) => void;
}

export const SafariForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof SafariPayload, value: string | boolean | SafariBookmark[] | undefined) => {
    onChange({ ...payload, [field]: value });
  };

  const updateBookmark = (index: number, field: 'title' | 'url', value: string) => {
    const next = [...(payload.bookmarks || [])];
    if (!next[index]) next[index] = { title: '', url: '' };
    next[index] = { ...next[index], [field]: value };
    handleChange('bookmarks', next);
  };

  const addBookmark = () => {
    handleChange('bookmarks', [...(payload.bookmarks || []), { title: '', url: 'https://' }]);
  };

  const removeBookmark = (index: number) => {
    const next = (payload.bookmarks || []).filter((_, i) => i !== index);
    handleChange('bookmarks', next);
  };

  const bookmarks = payload.bookmarks || [];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Safari</h2>
        <p className="text-sm text-gray-500 mt-1">
          Set homepage and managed bookmarks for Safari.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <Input
          label="Home Page"
          value={payload.homepage ?? ''}
          onChange={(e) => handleChange('homepage', e.target.value || undefined)}
          placeholder="https://www.example.com"
        />

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Bookmarks</label>
            <button
              type="button"
              onClick={addBookmark}
              className="text-sm text-ios-blue hover:underline"
            >
              + Add bookmark
            </button>
          </div>
          {bookmarks.map((bm, i) => (
            <div key={i} className="flex gap-2 items-start mb-3 p-3 bg-gray-50 rounded-lg">
              <Input
                label="Title"
                value={bm.title}
                onChange={(e) => updateBookmark(i, 'title', e.target.value)}
                placeholder="Site name"
              />
              <Input
                label="URL"
                value={bm.url}
                onChange={(e) => updateBookmark(i, 'url', e.target.value)}
                placeholder="https://"
              />
              <button
                type="button"
                onClick={() => removeBookmark(i)}
                className="mt-6 px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-4 flex flex-wrap gap-6">
          <Switch label="Allow AutoFill" checked={payload.allowAutoFill ?? true} onChange={(c) => handleChange('allowAutoFill', c)} />
          <Switch label="Force Fraud Warning" checked={payload.forceFraudWarning ?? true} onChange={(c) => handleChange('forceFraudWarning', c)} />
          <Switch label="Allow JavaScript" checked={payload.allowJavaScript ?? true} onChange={(c) => handleChange('allowJavaScript', c)} />
          <Switch label="Allow Pop-ups" checked={payload.allowPopups ?? false} onChange={(c) => handleChange('allowPopups', c)} />
        </div>
      </div>
    </div>
  );
};
