import React from 'react';
import { LdapPayload, LdapSearchSetting } from '../../types';
import { Input } from '../ui/Input';
import { Switch } from '../ui/Switch';
import { Select } from '../ui/Select';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  payload: LdapPayload;
  onChange: (payload: LdapPayload) => void;
}

export const LdapForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof LdapPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  const addSearchSetting = () => {
    const newSetting: LdapSearchSetting = {
      description: 'New Search Setting',
      searchBase: '',
      scope: 'Subtree'
    };
    handleChange('searchSettings', [...payload.searchSettings, newSetting]);
  };

  const updateSearchSetting = (index: number, setting: LdapSearchSetting) => {
    const newSettings = [...payload.searchSettings];
    newSettings[index] = setting;
    handleChange('searchSettings', newSettings);
  };

  const removeSearchSetting = (index: number) => {
    const newSettings = payload.searchSettings.filter((_, i) => i !== index);
    handleChange('searchSettings', newSettings);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">LDAP Account</h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure an LDAP directory account.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Main Settings */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4 border-b pb-2">Account Details</h3>
          <Input
            label="Description"
            value={payload.accountDescription}
            onChange={(e) => handleChange('accountDescription', e.target.value)}
            placeholder="Company Directory"
          />
          <Input
            label="Hostname"
            value={payload.hostname}
            onChange={(e) => handleChange('hostname', e.target.value)}
            placeholder="ldap.example.com"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Input
                label="Username (Optional)"
                value={payload.username || ''}
                onChange={(e) => handleChange('username', e.target.value)}
            />
             <Input
                label="Password (Optional)"
                type="password"
                value={payload.password || ''}
                onChange={(e) => handleChange('password', e.target.value)}
            />
          </div>
          <Switch
            label="Use SSL"
            checked={payload.useSSL}
            onChange={(checked) => handleChange('useSSL', checked)}
          />
        </div>

        {/* Search Settings */}
        <div>
           <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h3 className="text-sm font-medium text-gray-900">Search Settings</h3>
              <button
                type="button"
                onClick={addSearchSetting}
                className="text-ios-blue hover:text-blue-700 text-sm font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
           </div>
           
           <div className="space-y-4">
              {payload.searchSettings.map((setting, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative group">
                   <button
                     onClick={() => removeSearchSetting(index)}
                     className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 hover:bg-white rounded-md transition-colors"
                     title="Remove Search Setting"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>

                   <div className="grid grid-cols-1 gap-4 pr-6">
                     <Input
                        label="Description"
                        value={setting.description}
                        onChange={(e) => updateSearchSetting(index, { ...setting, description: e.target.value })}
                        className="mb-0"
                     />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <Input
                          label="Search Base"
                          value={setting.searchBase}
                          onChange={(e) => updateSearchSetting(index, { ...setting, searchBase: e.target.value })}
                          placeholder="dc=example,dc=com"
                          className="mb-0"
                       />
                       <Select
                          label="Scope"
                          value={setting.scope}
                          onChange={(e) => updateSearchSetting(index, { ...setting, scope: e.target.value as any })}
                          options={[
                            { label: 'Subtree', value: 'Subtree' },
                            { label: 'One Level', value: 'OneLevel' },
                            { label: 'Base', value: 'Base' },
                          ]}
                          className="mb-0"
                       />
                     </div>
                   </div>
                </div>
              ))}
              {payload.searchSettings.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                   No search settings configured.
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};