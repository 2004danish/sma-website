// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Syed Mobin Architects',
  description: 'Architectural Expression',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0A0A0A] text-[#FAFAFA] antialiased`}>
        <Preloader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}