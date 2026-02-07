import React from 'react';
import { MdmPayload } from '../../types';
import { Input } from '../ui/Input';
import { Switch } from '../ui/Switch';
import { Server } from 'lucide-react';

interface Props {
  payload: MdmPayload;
  onChange: (payload: MdmPayload) => void;
}

const ACCESS_RIGHTS = [
    { bit: 1, label: 'Profile Inspection' },
    { bit: 2, label: 'Install/Remove Profiles' },
    { bit: 4, label: 'Device Lock/Passcode' },
    { bit: 8, label: 'Device Erase' },
    { bit: 16, label: 'Device Query' },
    { bit: 32, label: 'Network Query' },
    { bit: 64, label: 'Provisioning Profile Inspection' },
    { bit: 128, label: 'Provisioning Profile Install/Remove' },
    { bit: 256, label: 'App Inspection' },
    { bit: 512, label: 'App Install/Remove' },
    { bit: 1024, label: 'Security Query' },
    { bit: 2048, label: 'Settings Manipulation' },
    { bit: 4096, label: 'App Settings' },
];

export const MdmForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof MdmPayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  const toggleAccessRight = (bit: number) => {
      let current = payload.accessRights;
      if ((current & bit) === bit) {
          current &= ~bit; // Remove bit
      } else {
          current |= bit; // Add bit
      }
      handleChange('accessRights', current);
  };

  const selectAllRights = () => {
      handleChange('accessRights', 8191);
  };

  const clearAllRights = () => {
      handleChange('accessRights', 0);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-start gap-4">
        <div>
            <h2 className="text-xl font-semibold text-gray-900">MDM Configuration</h2>
            <p className="text-sm text-gray-500 mt-1">
            Configure Mobile Device Management server settings.
            </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-3">
             <Server className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
             <p className="text-sm text-blue-800">
                 This payload designates the device as managed. It requires a valid Identity Certificate to authenticate with the MDM server.
             </p>
        </div>

        {/* Server Settings */}
        <div>
             <h3 className="text-sm font-medium text-gray-900 mb-4 border-b pb-2">Server Information</h3>
             <Input
                label="Server URL"
                value={payload.serverUrl}
                onChange={(e) => handleChange('serverUrl', e.target.value)}
                placeholder="https://mdm.example.com/connect"
            />
            <Input
                label="Check In URL (Optional)"
                value={payload.checkInUrl || ''}
                onChange={(e) => handleChange('checkInUrl', e.target.value)}
                placeholder="https://mdm.example.com/checkin"
            />
            <p className="text-xs text-gray-500 -mt-2 ml-1 mb-4">If unspecified, the Server URL is used for check-ins.</p>

            <Input
                label="Topic"
                value={payload.topic}
                onChange={(e) => handleChange('topic', e.target.value)}
                placeholder="com.apple.mgmt.External.UUID"
            />
            <p className="text-xs text-gray-500 -mt-2 ml-1">The push topic that the MDM server will use to wake up the device.</p>
        </div>

        {/* Identity */}
        <div>
             <h3 className="text-sm font-medium text-gray-900 mb-4 border-b pb-2">Identity</h3>
             <Input
                label="Identity Certificate UUID"
                value={payload.identityCertificateUUID}
                onChange={(e) => handleChange('identityCertificateUUID', e.target.value)}
                placeholder="UUID of Identity Certificate Payload"
                className="font-mono"
            />
            <p className="text-xs text-gray-500 -mt-2 ml-1">Must match the UUID of a Certificate payload in this profile containing the device identity.</p>
        </div>

        {/* Options */}
        <div>
             <h3 className="text-sm font-medium text-gray-900 mb-4 border-b pb-2">Options</h3>
             <Switch
                label="Sign Messages"
                description="Sign outgoing messages to the MDM server"
                checked={payload.signMessage}
                onChange={(checked) => handleChange('signMessage', checked)}
            />
             <Switch
                label="Use Development APNS"
                description="Use the development APNS server (Check In only)"
                checked={payload.useDevelopmentAPNS}
                onChange={(checked) => handleChange('useDevelopmentAPNS', checked)}
            />
            <div className="mt-4">
                 <Input
                    label="Check-In Interval (Minutes)"
                    type="number"
                    value={payload.checkInInterval || ''}
                    onChange={(e) => handleChange('checkInInterval', parseInt(e.target.value))}
                    placeholder="60"
                />
            </div>
        </div>

        {/* Access Rights */}
        <div>
             <div className="flex items-center justify-between mb-4 border-b pb-2">
                 <h3 className="text-sm font-medium text-gray-900">Access Rights</h3>
                 <div className="flex gap-2">
                    <button onClick={selectAllRights} className="text-xs text-ios-blue hover:underline">Select All</button>
                    <button onClick={clearAllRights} className="text-xs text-gray-500 hover:underline">Clear</button>
                 </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                 {ACCESS_RIGHTS.map((right) => {
                     const isChecked = (payload.accessRights & right.bit) === right.bit;
                     return (
                         <label key={right.bit} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                             <input 
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleAccessRight(right.bit)}
                                className="rounded text-ios-blue focus:ring-ios-blue border-gray-300 w-4 h-4"
                             />
                             <span className="text-sm text-gray-700">{right.label}</span>
                         </label>
                     )
                 })}
             </div>
             <p className="text-xs text-gray-400 mt-2 text-right">Bitmask: {payload.accessRights}</p>
        </div>

      </div>
    </div>
  );
};