import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-16">
          <h1 className="text-6xl font-bold mb-4">💬 WhatsApp Summarizer</h1>
          <p className="text-2xl mb-8 text-blue-100">
            AI-Powered Chat Summaries in Seconds
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Get Started in 3 Easy Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">1️⃣</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Sign Up</h3>
              <p className="text-gray-600 text-sm">
                Create your free account in seconds
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">2️⃣</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Connect WhatsApp</h3>
              <p className="text-gray-600 text-sm">
                Scan QR code to link your account
              </p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">3️⃣</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Get Summaries</h3>
              <p className="text-gray-600 text-sm">
                AI summarizes your chats instantly
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-3">✨ Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>🤖 <strong>AI-Powered:</strong> Smart summaries using Google Gemini</li>
                <li>🔒 <strong>Secure:</strong> Your messages auto-delete after 24 hours</li>
                <li>⚡ <strong>Fast:</strong> Get summaries in seconds</li>
                <li>🎯 <strong>Smart Search:</strong> Find chats by name</li>
                <li>📊 <strong>Dashboard:</strong> See all your active chats</li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:opacity-90 transition text-lg"
              >
                Get Started Free →
              </Link>
              <Link
                href="/login"
                className="bg-gray-100 text-gray-700 font-bold py-4 px-8 rounded-lg hover:bg-gray-200 transition text-lg"
              >
                Login
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-white">
          <p className="text-sm opacity-75">
            100% Free • No Credit Card Required • Auto-Delete After 24h
          </p>
        </div>
      </div>
    </div>
  );
}