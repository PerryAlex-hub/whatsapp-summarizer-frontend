'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { whatsappAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';
import QRCodeDisplay from '@/components/Dashboard/QRCodeDisplay';
import ChatList from '@/components/Dashboard/ChatList';
import SummaryDisplay from '@/components/Dashboard/SummaryDisplay';

export default function DashboardPage() {
  const router = useRouter();
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [stats, setStats] = useState({ totalChats: 0, totalMessages: 0 });

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    checkConnectionStatus();
  }, []);

  const checkConnectionStatus = async () => {
    try {
      const response = await whatsappAPI.getStatus();
      setConnected(response.data.connected);
      setStats(response.data.stats || {});
    } catch (err) {
      console.error('Status check error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnected = () => {
    setConnected(true);
    checkConnectionStatus();
  };

  const handleSummarize = (chat) => {
    setSelectedChat(chat);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Stats Bar */}
        {connected && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">✅</p>
                <p className="text-gray-600 mt-2">WhatsApp Connected</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{stats.totalChats || 0}</p>
                <p className="text-gray-600 mt-2">Total Chats</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{stats.totalMessages || 0}</p>
                <p className="text-gray-600 mt-2">Messages Cached</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!connected ? (
          <QRCodeDisplay onConnected={handleConnected} />
        ) : (
          <ChatList onSummarize={handleSummarize} />
        )}

        {/* Summary Modal */}
        {selectedChat && (
          <SummaryDisplay
            chat={selectedChat}
            onClose={() => setSelectedChat(null)}
          />
        )}
      </div>
    </div>
  );
}