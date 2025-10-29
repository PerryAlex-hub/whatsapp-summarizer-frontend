'use client';

import { getUser, logout } from '@/lib/auth';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💬</span>
            <h1 className="text-xl font-bold">WhatsApp Summarizer</h1>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">{user.username}</p>
                <p className="text-xs text-blue-100">
                  {user.whatsappConnected ? '✅ Connected' : '⚠️ Not Connected'}
                </p>
              </div>
              <button
                onClick={logout}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}