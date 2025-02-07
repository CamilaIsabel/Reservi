'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/Header';
import ModalProvider from '@/components/header/components/ModalProvider';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [openModal, setOpenModal] = useState<'user' | 'timeBlock' | null>(null);

  return (
    <html lang='en'>
      <head>
        <title>Reservi</title>
        <link rel='icon' href='/Logo.svg' sizes='any' />
      </head>
      <body className={inter.className}>
        <div className='h-full w-full flex flex-col'>
          <Header
            openUserModal={() => setOpenModal('user')}
            openTimeBlockModal={() => setOpenModal('timeBlock')}
          />

          <div className='w-full'>{children}</div>
        </div>
        <ModalProvider openModal={openModal} setOpenModal={setOpenModal} />
      </body>
    </html>
  );
}
