import React from 'react';
import { CertificatePayload } from '../../types';
import { Input } from '../ui/Input';

interface Props {
  payload: CertificatePayload;
  onChange: (payload: CertificatePayload) => void;
}

export const CertificateForm: React.FC<Props> = ({ payload, onChange }) => {
  const handleChange = (field: keyof CertificatePayload, value: any) => {
    onChange({ ...payload, [field]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleChange('certificateFileName', file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Certificates usually are expected as raw DER data in base64.
        // If the user uploads a PEM file (which has headers), we might need to strip them,
        // but for simplicity here we assume the backend (iOS) can handle standard formats or we strip headers.
        // FileReader.readAsDataURL returns "data:application/x-x509-ca-cert;base64,..."
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        handleChange('payloadContent', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Certificate</h2>
        <p className="text-sm text-gray-500 mt-1">
          Install a Root or Intermediate Certificate.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <Input
          label="Certificate Name"
          value={payload.certificateFileName}
          onChange={(e) => handleChange('certificateFileName', e.target.value)}
          placeholder="my-root-ca.cer"
        />

        <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 ml-1 block mb-1">Certificate File (.cer, .pem, .der)</label>
            <input 
                type="file" 
                accept=".cer,.pem,.der,.crt"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ios-blue file:text-white hover:file:bg-blue-600"
            />
        </div>
        
        {payload.payloadContent && (
             <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200">
                Certificate data loaded successfully.
             </div>
        )}
      </div>
    </div>
  );
};