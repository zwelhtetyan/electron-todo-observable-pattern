import ProductCard from '@/components/ProductCard';
import { ProductData } from '@/types';
import Link from 'next/link';

export default async function Shop() {
  const res = await fetch('http://localhost:3000/api/products');
  const data: ProductData[] = await res.json();

  return (
    <>
      <header className='flex p-3 mb-8'>
        <Link
          href='/'
          className='text-2xl cursor-pointer bg-gray-200 p-1 px-2 rounded text-center font-bold'
        >
          Home
        </Link>

        <h1 className='ml-[20rem] text-2xl font-bold'>Product Page</h1>
      </header>

      <div className='grid grid-cols-auto-fit-250 gap-5 p-4'>
        {data.map(({ id, title, price, image }) => (
          <ProductCard
            key={id}
            id={id}
            title={title}
            price={price}
            image={image}
          />
        ))}
      </div>
    </>
  );
}
