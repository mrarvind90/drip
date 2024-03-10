'use client';

import { JSX, useState } from 'react';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import type { Image as SanityImage } from 'sanity';

import { SanityProduct } from '@/types/products';
import { shimmer, toBase64 } from '@/lib/image';

interface Props {
	product: SanityProduct;
}

export function ProductGallery({ product }: Props): JSX.Element {
	const [selectedImage, setSelectedImage] = useState<number>(0);

	return (
		<div className="flex flex-col-reverse">
			{/* Image Grid */}
			<div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
				<ul className="grid grid-cols-4 gap-6">
					{product.images.map((image: SanityImage, idx: number) => (
						<li
							key={image._key as string}
							className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase hover:bg-gray-50"
							onClick={() => setSelectedImage(idx)}
						>
							<span className="absolute inset-0 overflow-hidden rounded-md">
								<Image
									src={urlForImage(image)}
									width={200}
									height={200}
									alt={image.alt as string}
									className="h-full w-full object-cover object-center"
									placeholder="blur"
									blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(200, 200))}`}
								/>
							</span>
							{idx === selectedImage && (
								<span
									className="pointer-events-none absolute inset-0 rounded-md ring-4 ring-indigo-500 ring-offset-2"
									aria-hidden="true"
								/>
							)}
						</li>
					))}
				</ul>
			</div>

			{/* Main Image */}
			<div className="aspect-h-1 aspect-w-1 w-full">
				<Image
					priority
					src={urlForImage(product.images[selectedImage])}
					alt={product.images[selectedImage].alt as string}
					width={600}
					height={750}
					className="h-full w-full border-2 border-gray-200 object-cover object-center shadow-sm dark:border-gray-800 sm:rounded-lg"
					placeholder="blur"
					blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(600, 750))}`}
				/>
			</div>
		</div>
	);
}
