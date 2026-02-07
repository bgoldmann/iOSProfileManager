import React from 'react';
import { BluetoothPayload } from '../../types';
import { Switch } from '../ui/Switch';
import { Bluetooth } from 'lucide-react';

interface Props {
  payload: BluetoothPayload;
  onChange: (payload: BluetoothPayload) => void;
}

export const BluetoothForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof BluetoothPayload, value: boolean) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-start gap-4">
        <div>
            <h2 className="text-xl font-semibold text-gray-900">Bluetooth Settings</h2>
            <p className="text-sm text-gray-500 mt-1">
            Configure restrictions for Bluetooth and AirDrop connections.
            </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100 flex items-start gap-3">
             <Bluetooth className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
             <p className="text-sm text-blue-800">
                 Note: iOS does not allow profiles to force Bluetooth ON or OFF. 
                 However, you can <strong>prevent changes</strong> to the current setting (locking it) or disable features like AirDrop.
                 <br/><br/>
                 These settings typically require a <strong>Supervised</strong> device.
             </p>
        </div>

        <div className="space-y-1">
            <Switch
                label="Allow Modifying Bluetooth Settings"
                description="If disabled, the user cannot turn Bluetooth on or off."
                checked={payload.allowBluetoothModification}
                onChange={(checked) => handleChange('allowBluetoothModification', checked)}
            />

            <div className="h-px bg-gray-100 my-4" />

            <Switch
                label="Allow AirDrop"
                description="Allow sharing files via AirDrop (requires Bluetooth and Wi-Fi)"
                checked={payload.allowAirDrop}
                onChange={(checked) => handleChange('allowAirDrop', checked)}
            />
        </div>
      </div>
    </div>
  );
};