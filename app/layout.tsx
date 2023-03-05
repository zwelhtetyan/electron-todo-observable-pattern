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
      <body>{children}</body>
    </html>
  );
}
