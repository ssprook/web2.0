import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata = {
  title: 'Spam Checker - Vérifiez vos emails',
  description: 'Vérifiez si vos emails sont susceptibles d\'être marqués comme spam',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-[#0A0A0F] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
