import React from 'react';
import { CellularPayload } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { Signal, MessageSquare, Wifi } from 'lucide-react';

interface Props {
  payload: CellularPayload;
  onChange: (payload: CellularPayload) => void;
}

export const CellularForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof CellularPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-start gap-4">
        <div>
            <h2 className="text-xl font-semibold text-gray-900">Cellular & Carrier Settings</h2>
            <p className="text-sm text-gray-500 mt-1">
            Configure Access Point Names (APN) for Data, LTE Attachment, MMS, and Personal Hotspot.
            </p>
        </div>
      </div>

      <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100 flex items-start gap-3">
                 <Signal className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                 <p className="text-sm text-blue-800">
                     These settings configure how the device connects to the carrier's network (APN). 
                     Incorrect settings may cause loss of cellular data connectivity.
                 </p>
            </div>

            {/* Data APN */}
            <h3 className="text-sm font-medium text-gray-900 mb-4 border-b pb-2">Cellular Data APN</h3>
            <div className="space-y-4">
                 <Input
                    label="Access Point Name (APN)"
                    value={payload.apnName}
                    onChange={(e) => handleChange('apnName', e.target.value)}
                    placeholder="internet"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <Input
                        label="Username"
                        value={payload.apnUsername || ''}
                        onChange={(e) => handleChange('apnUsername', e.target.value)}
                    />
                     <Input
                        label="Password"
                        type="password"
                        value={payload.apnPassword || ''}
                        onChange={(e) => handleChange('apnPassword', e.target.value)}
                    />
                </div>

                <Select
                    label="Authentication Type"
                    value={payload.apnAuthenticationType}
                    onChange={(e) => handleChange('apnAuthenticationType', e.target.value)}
                    options={[
                        { label: 'CHAP', value: 'CHAP' },
                        { label: 'PAP', value: 'PAP' },
                    ]}
                />
            </div>

            {/* Attach APN */}
            <div className="mt-6 pt-6 border-t border-gray-100">
                 <Switch
                    label="Configure LTE Setup (Attach) APN"
                    description="Configure a separate APN for LTE network attachment"
                    checked={payload.includeAttachApn}
                    onChange={(checked) => handleChange('includeAttachApn', checked)}
                />

                {payload.includeAttachApn && (
                    <div className="space-y-4 mt-4 animate-fadeIn">
                        <Input
                            label="Attach APN Name"
                            value={payload.attachApnName}
                            onChange={(e) => handleChange('attachApnName', e.target.value)}
                            placeholder="lte-attach"
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Username"
                                value={payload.attachApnUsername || ''}
                                onChange={(e) => handleChange('attachApnUsername', e.target.value)}
                            />
                            <Input
                                label="Password"
                                type="password"
                                value={payload.attachApnPassword || ''}
                                onChange={(e) => handleChange('attachApnPassword', e.target.value)}
                            />
                        </div>

                        <Select
                            label="Authentication Type"
                            value={payload.attachApnAuthenticationType}
                            onChange={(e) => handleChange('attachApnAuthenticationType', e.target.value)}
                            options={[
                                { label: 'CHAP', value: 'CHAP' },
                                { label: 'PAP', value: 'PAP' },
                            ]}
                        />
                    </div>
                )}
            </div>
          </div>
          
          {/* MMS Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4 border-b pb-2">
                 <MessageSquare className="w-5 h-5 text-gray-500" />
                 <h3 className="text-lg font-medium text-gray-900">MMS Settings</h3>
              </div>

               <Switch
                    label="Configure MMS APN"
                    description="Settings for Multimedia Messaging Service"
                    checked={payload.includeMmsApn}
                    onChange={(checked) => handleChange('includeMmsApn', checked)}
                />
                
                {payload.includeMmsApn && (
                    <div className="space-y-4 mt-4 animate-fadeIn">
                        <Input
                            label="MMS APN"
                            value={payload.mmsApnName}
                            onChange={(e) => handleChange('mmsApnName', e.target.value)}
                            placeholder="mms.carrier.com"
                        />
                        
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Username"
                                value={payload.mmsUsername || ''}
                                onChange={(e) => handleChange('mmsUsername', e.target.value)}
                            />
                            <Input
                                label="Password"
                                type="password"
                                value={payload.mmsPassword || ''}
                                onChange={(e) => handleChange('mmsPassword', e.target.value)}
                            />
                        </div>
                        
                         <Select
                            label="Authentication Type"
                            value={payload.mmsAuthenticationType}
                            onChange={(e) => handleChange('mmsAuthenticationType', e.target.value)}
                            options={[
                                { label: 'CHAP', value: 'CHAP' },
                                { label: 'PAP', value: 'PAP' },
                            ]}
                        />

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="MMSC URL"
                                value={payload.mmsMmsc || ''}
                                onChange={(e) => handleChange('mmsMmsc', e.target.value)}
                                placeholder="http://mmsc.carrier.com"
                            />
                            <Input
                                label="MMS Max Message Size (Bytes)"
                                type="number"
                                value={payload.mmsMaxMessageSize || ''}
                                onChange={(e) => handleChange('mmsMaxMessageSize', parseInt(e.target.value))}
                                placeholder="1048576"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <Input
                                label="MMS Proxy"
                                value={payload.mmsProxy || ''}
                                onChange={(e) => handleChange('mmsProxy', e.target.value)}
                                placeholder="proxy.carrier.com"
                            />
                            <Input
                                label="MMS Proxy Port"
                                type="number"
                                value={payload.mmsProxyPort || ''}
                                onChange={(e) => handleChange('mmsProxyPort', parseInt(e.target.value))}
                                placeholder="8080"
                            />
                        </div>
                    </div>
                )}
          </div>

          {/* Tethering Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4 border-b pb-2">
                 <Wifi className="w-5 h-5 text-gray-500" />
                 <h3 className="text-lg font-medium text-gray-900">Personal Hotspot (Tethering)</h3>
              </div>

               <Switch
                    label="Configure Hotspot APN"
                    description="APN for sharing cellular data"
                    checked={payload.includeTetheringApn}
                    onChange={(checked) => handleChange('includeTetheringApn', checked)}
                />
                
                {payload.includeTetheringApn && (
                    <div className="space-y-4 mt-4 animate-fadeIn">
                        <Input
                            label="Tethering APN"
                            value={payload.tetheringApnName}
                            onChange={(e) => handleChange('tetheringApnName', e.target.value)}
                            placeholder="hotspot"
                        />
                        
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Username"
                                value={payload.tetheringUsername || ''}
                                onChange={(e) => handleChange('tetheringUsername', e.target.value)}
                            />
                            <Input
                                label="Password"
                                type="password"
                                value={payload.tetheringPassword || ''}
                                onChange={(e) => handleChange('tetheringPassword', e.target.value)}
                            />
                        </div>
                        
                         <Select
                            label="Authentication Type"
                            value={payload.tetheringAuthenticationType}
                            onChange={(e) => handleChange('tetheringAuthenticationType', e.target.value)}
                            options={[
                                { label: 'CHAP', value: 'CHAP' },
                                { label: 'PAP', value: 'PAP' },
                            ]}
                        />
                    </div>
                )}
          </div>

      </div>
    </div>
  );
};