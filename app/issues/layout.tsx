import Link from 'next/link';

export default function IssueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex'>
      <aside className='min-h-screen w-80 p-4'>
        <ul className='space-y-2'>
          <li>
            <Link href='issues/1'>list1</Link>
          </li>

          <li>
            <Link href='issues/2'>list2</Link>
          </li>
        </ul>
      </aside>

      <div className='min-h-screen pl-20 border-l border-l-gray-300 flex-1 p-4'>
        {children}
      </div>
    </div>
  );
}
