'use client';

import { useState, useEffect } from 'react';
import { queryAPI } from '@/lib/api';

export default function ChatList({ onSummarize }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    loadRecentChats();
  }, []);

  const loadRecentChats = async () => {
    setLoading(true);
    try {
      const response = await queryAPI.getRecentChats(10);
      setChats(response.data.chats || []);
    } catch (err) {
      console.error('Error loading chats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setSearching(true);
    try {
      const response = await queryAPI.queryChat(searchTerm);
      if (response.data.found) {
        setSearchResults([response.data.chat, ...(response.data.otherMatches || [])]);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const displayChats = searchResults.length > 0 ? searchResults : chats;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Chats</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search chats by name..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={searching || !searchTerm.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {searching ? 'Searching...' : 'Search'}
          </button>
        </div>
        {searchResults.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSearchResults([]);
            }}
            className="text-sm text-gray-500 hover:text-gray-700 mt-2"
          >
            Clear search
          </button>
        )}
      </form>

      {/* Chat List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : displayChats.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            {searchResults.length === 0 && searchTerm
              ? 'No chats found matching your search'
              : 'No chats available yet. Send yourself a message on WhatsApp!'}
          </p>
          <button
            onClick={loadRecentChats}
            className="text-blue-500 hover:text-blue-600 text-sm underline"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {displayChats.map((chat, index) => (
            <div
              key={chat.chatId || index}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">
                      {chat.chatId?.includes('@g.us') ? '👥' : '👤'}
                    </span>
                    <h3 className="font-semibold text-gray-800">
                      {chat.chatName || 'Unknown'}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {chat.messageCount} messages
                  </p>
                  {chat.preview && (
                    <p className="text-sm text-gray-600 truncate">
                      {chat.preview}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => onSummarize(chat)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition"
                >
                  Summarize
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {!loading && chats.length >= 10 && searchResults.length === 0 && (
        <div className="text-center mt-6">
          <button
            onClick={() => {
              // Could load more chats here
              alert('Load more feature - connect to /api/query/chats endpoint');
            }}
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            Load More Chats →
          </button>
        </div>
      )}
    </div>
  );
}