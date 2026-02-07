import React from 'react';
import { PhonePayload } from '../../types';
import { Switch } from '../ui/Switch';
import { Phone, Signal, Mic } from 'lucide-react';

interface Props {
  payload: PhonePayload;
  onChange: (payload: PhonePayload) => void;
}

export const PhoneForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof PhonePayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-start gap-4">
        <div>
            <h2 className="text-xl font-semibold text-gray-900">Phone & Siri Configuration</h2>
            <p className="text-sm text-gray-500 mt-1">
            Manage Voice Dialing, FaceTime, Cellular settings, and Assistant (Siri).
            </p>
        </div>
      </div>

      <div className="space-y-6">
          {/* Telephony & Cellular Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100 flex items-start gap-3">
                 <Phone className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                 <p className="text-sm text-blue-800">
                     Core telephony features including FaceTime, Voice Dialing, and Cellular Plan management (eSIM).
                 </p>
            </div>

            <div className="space-y-1">
                <Switch
                    label="Allow Voice Dialing"
                    description="Enable voice dialing while device is locked"
                    checked={payload.allowVoiceDialing}
                    onChange={(checked) => handleChange('allowVoiceDialing', checked)}
                />

                <Switch
                    label="Allow FaceTime"
                    description="Enable video and audio calling via FaceTime"
                    checked={payload.allowFaceTime}
                    onChange={(checked) => handleChange('allowFaceTime', checked)}
                />
                
                <div className="h-px bg-gray-100 my-4" />
                
                <Switch
                    label="Allow Cellular Plan Modification"
                    description="Allow adding or removing cellular plans (eSIM)"
                    checked={payload.allowCellularPlanModification}
                    onChange={(checked) => handleChange('allowCellularPlanModification', checked)}
                />
            </div>
          </div>

          {/* Siri Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
                 <Mic className="w-5 h-5 text-gray-500" />
                 <h3 className="text-lg font-medium text-gray-900">Siri Assistant</h3>
            </div>
            
            <div className="space-y-1">
                <Switch
                    label="Allow Siri"
                    description="Enable the intelligent assistant"
                    checked={payload.allowAssistant}
                    onChange={(checked) => handleChange('allowAssistant', checked)}
                />

                {payload.allowAssistant && (
                    <div className="animate-fadeIn ml-4 pl-4 border-l-2 border-gray-100 space-y-1 mt-2">
                        <Switch
                            label="Allow Siri While Locked"
                            description="Access Siri from the lock screen"
                            checked={payload.allowAssistantWhileLocked}
                            onChange={(checked) => handleChange('allowAssistantWhileLocked', checked)}
                        />
                         <Switch
                            label="Force Profanity Filter"
                            description="Filter out profanity from Siri's responses"
                            checked={payload.forceAssistantProfanityFilter}
                            onChange={(checked) => handleChange('forceAssistantProfanityFilter', checked)}
                        />
                         <Switch
                            label="Allow User Generated Content"
                            description="Allow Siri to search the web"
                            checked={payload.allowAssistantUserGeneratedContent}
                            onChange={(checked) => handleChange('allowAssistantUserGeneratedContent', checked)}
                        />
                    </div>
                )}
            </div>
          </div>
      </div>
    </div>
  );
};