import Link from 'next/link';

export default function Home() {
  return (
    <main className='p-8'>
      <h1 className='text-2xl'>Hello from home page</h1>

      <Link
        href='/products'
        className='inline-block py-2 px-4 bg-blue-700 text-white hover:bg-blue-800 transition-all rounded-md mt-5'
      >
        See products
      </Link>
    </main>
  );
}
