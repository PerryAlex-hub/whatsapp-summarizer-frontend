'use client';

import { useState, useEffect } from 'react';
import { whatsappAPI } from '@/lib/api';

export default function QRCodeDisplay({ onConnected }) {
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  const connectWhatsApp = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await whatsappAPI.connect();
      const { qrCode, connected } = response.data;

      if (connected) {
        onConnected();
      } else if (qrCode) {
        setQrCode(qrCode);
        startStatusCheck();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to connect');
    } finally {
      setLoading(false);
    }
  };

  const startStatusCheck = () => {
    setChecking(true);
    const interval = setInterval(async () => {
      try {
        const response = await whatsappAPI.getStatus();
        if (response.data.connected) {
          clearInterval(interval);
          setChecking(false);
          onConnected();
        }
      } catch (err) {
        console.error('Status check error:', err);
      }
    }, 3000); // Check every 3 seconds

    // Stop checking after 3 minutes
    setTimeout(() => {
      clearInterval(interval);
      setChecking(false);
      setError('QR code expired. Please try again.');
      setQrCode(null);
    }, 180000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Connect WhatsApp
        </h2>

        {!qrCode && !loading && (
          <>
            <p className="text-gray-600 mb-6">
              Click the button below to generate a QR code and connect your WhatsApp account.
            </p>
            <button
              onClick={connectWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Generate QR Code
            </button>
          </>
        )}

        {loading && (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
            <p className="text-gray-600">Generating QR code...</p>
          </div>
        )}

        {qrCode && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <img
                src={qrCode}
                alt="WhatsApp QR Code"
                className="mx-auto max-w-sm w-full"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 font-medium mb-2">
                📱 How to scan:
              </p>
              <ol className="text-sm text-blue-700 text-left space-y-1 max-w-md mx-auto">
                <li>1. Open WhatsApp on your phone</li>
                <li>2. Tap the menu (⋮) → Linked Devices</li>
                <li>3. Tap Link a Device</li>
                <li>4. Scan this QR code</li>
              </ol>
            </div>

            {checking && (
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                <span className="text-sm">Waiting for scan...</span>
              </div>
            )}

            <button
              onClick={connectWhatsApp}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Generate new QR code
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}