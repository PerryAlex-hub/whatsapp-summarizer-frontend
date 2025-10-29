'use client';

import { useState, useEffect } from 'react';
import { queryAPI } from '@/lib/api';

export default function SummaryDisplay({ chat, onClose }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (chat) {
      loadSummary();
    }
  }, [chat]);

  const loadSummary = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await queryAPI.summarizeChat(chat.chatId);
      setSummary(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  if (!chat) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">
                  {chat.chatId?.includes('@g.us') ? '👥' : '👤'}
                </span>
                <h2 className="text-2xl font-bold">{chat.chatName}</h2>
              </div>
              <p className="text-blue-100 text-sm">
                {chat.messageCount} messages
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Generating AI summary...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few seconds</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
              <button
                onClick={loadSummary}
                className="block mt-3 text-sm text-red-600 hover:text-red-700 underline"
              >
                Try again
              </button>
            </div>
          ) : summary ? (
            <div className="space-y-6">
              {/* Time Range */}
              {summary.timeRange && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">📅 Time Period:</span>{' '}
                    {summary.timeRange.from} - {summary.timeRange.to}
                  </p>
                </div>
              )}

              {/* AI Summary */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>🤖</span>
                  AI Summary
                </h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {summary.summary}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(summary.summary);
                    alert('Summary copied to clipboard!');
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition"
                >
                  📋 Copy Summary
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
                >
                  Close
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}