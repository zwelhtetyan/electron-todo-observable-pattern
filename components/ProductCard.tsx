import { ProductCardProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({
  id,
  title,
  price,
  image,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className='bg-gray-100  rounded-md'>
      <Image
        src={image}
        width={300}
        height={300}
        alt={title}
        className='w-full h-72 object-contain mb-5'
      />

      <div className='p-3'>
        <p>Price: ${price}</p>
        <h1 className='truncate'>{title}</h1>
      </div>
    </Link>
  );
}
