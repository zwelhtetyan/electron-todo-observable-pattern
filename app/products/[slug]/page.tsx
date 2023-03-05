import { ProductData } from '@/types';
import Image from 'next/image';

export async function generateStaticParams() {
  const res = await fetch('http://localhost:3000/api/products');
  const data: ProductData[] = await res.json();

  return data.map((product) => ({ slug: product.id.toString() }));
}

export default async function ProductDetail({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const res = await fetch(`https://fakestoreapi.com/products/${slug}`);
  const { title, price, image }: ProductData = await res.json();

  return (
    <div className='w-full max-w-xl mx-auto bg-gray-200'>
      <Image
        src={image}
        width={500}
        height={500}
        alt={title}
        className='w-full object-cover mb-5'
      />

      <div className='p-3'>
        <p>Price: ${price}</p>
        <h1 className='truncate'>{title}</h1>
      </div>
    </div>
  );
}
