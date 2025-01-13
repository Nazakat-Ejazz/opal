import type { Metadata } from 'next';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

import { Manrope, DM_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme';

const manrope = DM_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Opal!',
  description: 'Your AI powered partner for sharing videos with your friends',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${manrope.className} bg-[#171717]`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
