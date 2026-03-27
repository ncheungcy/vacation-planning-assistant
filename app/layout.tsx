import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vacation Planning Assistant',
  description: 'Plan your perfect holiday',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
