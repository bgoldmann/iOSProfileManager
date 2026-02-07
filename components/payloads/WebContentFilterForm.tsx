import React from 'react';
import { WebContentFilterPayload } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Plus, Trash2, Globe } from 'lucide-react';

interface Props {
  payload: WebContentFilterPayload;
  onChange: (payload: WebContentFilterPayload) => void;
}

export const WebContentFilterForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof WebContentFilterPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  const handleBookmarkChange = (index: number, field: 'url' | 'title', value: string) => {
    const newBookmarks = [...(payload.whitelistedBookmarks || [])];
    newBookmarks[index] = { ...newBookmarks[index], [field]: value };
    handleChange('whitelistedBookmarks', newBookmarks);
  };

  const addBookmark = () => {
    const newBookmarks = [...(payload.whitelistedBookmarks || []), { url: 'https://', title: 'New Site' }];
    handleChange('whitelistedBookmarks', newBookmarks);
  };

  const removeBookmark = (index: number) => {
    const newBookmarks = [...(payload.whitelistedBookmarks || [])];
    newBookmarks.splice(index, 1);
    handleChange('whitelistedBookmarks', newBookmarks);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-start gap-4">
        <div>
            <h2 className="text-xl font-semibold text-gray-900">Web Content Filter</h2>
            <p className="text-sm text-gray-500 mt-1">
            Restrict web access to specific sites or limit adult content.
            </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-3">
             <Globe className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
             <p className="text-sm text-blue-800">
                 The <strong>Built-in</strong> Apple filter can automatically screen adult content or restrict the device to a specific list of allowed websites.
             </p>
        </div>

        <Select
            label="Filter Mode"
            value={payload.isSpecificWebsitesOnly ? 'whitelist' : 'adult'}
            onChange={(e) => handleChange('isSpecificWebsitesOnly', e.target.value === 'whitelist')}
            options={[
                { label: 'Limit Adult Content', value: 'adult' },
                { label: 'Specific Websites Only (Whitelist)', value: 'whitelist' },
            ]}
        />

        {!payload.isSpecificWebsitesOnly && (
            <div className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ml-1">Permitted URLs (Always Allow)</label>
                    <textarea
                        value={payload.permittedURLs}
                        onChange={(e) => handleChange('permittedURLs', e.target.value)}
                        placeholder="https://example.com, https://trusted.org"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ios-blue focus:border-transparent min-h-[100px] font-mono"
                    />
                    <p className="text-xs text-gray-500 ml-1">Comma-separated list of URLs to allow, even if the filter might block them.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ml-1">Blacklisted URLs (Always Block)</label>
                    <textarea
                        value={payload.blacklistedURLs}
                        onChange={(e) => handleChange('blacklistedURLs', e.target.value)}
                        placeholder="https://social-media.com, https://games.com"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ios-blue focus:border-transparent min-h-[100px] font-mono"
                    />
                    <p className="text-xs text-gray-500 ml-1">Comma-separated list of URLs to strictly block.</p>
                </div>
            </div>
        )}

        {payload.isSpecificWebsitesOnly && (
            <div className="space-y-4 animate-fadeIn">
                 <div className="flex items-center justify-between mb-2 border-b pb-2">
                    <h3 className="text-sm font-medium text-gray-900">Allowed Websites</h3>
                    <button
                        type="button"
                        onClick={addBookmark}
                        className="text-ios-blue hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                    >
                        <Plus className="w-4 h-4" />
                        Add Site
                    </button>
                 </div>

                 <div className="space-y-3">
                    {payload.whitelistedBookmarks?.map((bookmark, index) => (
                        <div key={index} className="flex gap-3 items-start">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                                <Input
                                    label="Title"
                                    value={bookmark.title}
                                    onChange={(e) => handleBookmarkChange(index, 'title', e.target.value)}
                                    placeholder="My Site"
                                    className="mb-0"
                                />
                                <Input
                                    label="URL"
                                    value={bookmark.url}
                                    onChange={(e) => handleBookmarkChange(index, 'url', e.target.value)}
                                    placeholder="https://example.com"
                                    className="mb-0"
                                />
                            </div>
                            <button
                                onClick={() => removeBookmark(index)}
                                className="mt-7 p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    {(!payload.whitelistedBookmarks || payload.whitelistedBookmarks.length === 0) && (
                        <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                            No allowed websites configured. The browser will block everything.
                        </div>
                    )}
                 </div>
            </div>
        )}

      </div>
    </div>
  );
};