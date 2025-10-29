import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'WhatsApp Summarizer - AI-Powered Chat Summaries',
  description: 'Get instant AI-powered summaries of your WhatsApp conversations',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}