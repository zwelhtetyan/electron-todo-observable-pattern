import Link from 'next/link';
import '../styles/globals.css';

export const metadata = {
  title: 'Nextjs | App directory',
  description: 'This is for testing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <header className='p-4 bg-gray-200 border-b border-b-gray-300 font-semibold text-xl flex justify-center space-x-5'>
          <Link href='/'>Home</Link>
          <Link href='/issues'>Issues</Link>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
