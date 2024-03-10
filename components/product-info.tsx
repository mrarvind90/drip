'use client';

import { JSX, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';

import { SanityProduct } from '@/types/products';
import { getSizeName } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Props {
	product: SanityProduct;
}

export function ProductInfo({ product }: Props): JSX.Element {
	const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
	const { addItem, incrementItem, cartDetails } = useShoppingCart();
	const { toast } = useToast();

	// Note: The double bang operator here is to coerce it into a boolean

	const isInCart: boolean =
		!!cartDetails &&
		!!cartDetails[product._id] &&
		!!cartDetails[product._id]['product_data'] &&
		// @ts-ignore
		!!cartDetails[product._id]['product_data']['size'] === selectedSize;

	console.log(cartDetails);

	function addToCart() {
		const item = {
			...product,
			id: `${product._id}-variant-${selectedSize}`,
			product_data: {
				size: selectedSize,
			},
		};

		isInCart ? incrementItem(item._id) : addItem(item);

		toast({
			title: `${item.name} (${getSizeName(selectedSize)})`,
			description: 'Product added to cart',
			action: (
				<Link href="/cart">
					<Button
						variant="link"
						className="gap-x-2 whitespace-nowrap"
					>
						<span>Open Cart</span>
						<ArrowRight className="h-5 w-5" />
					</Button>
				</Link>
			),
		});
	}

	return (
		<div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
			<h1 className="text-3xl font-bold tracking-tight">
				{product.name}
			</h1>

			<div className="mt-3">
				<h2 className="sr-only">Product information</h2>
				<p className="text-3xl tracking-tight">
					{formatCurrencyString({
						currency: product.currency,
						value: product.price,
						language: 'en-US',
					})}
				</p>
			</div>

			<div className="mt-6">
				<h3 className="sr-only">Description</h3>
				<div className="space-y-6 text-base">{product.description}</div>
			</div>

			<div className="mt-4">
				<p>
					Size: <strong>{getSizeName(selectedSize)}</strong>
				</p>
				{product.sizes.map((size: string) => (
					<Button
						key={size}
						variant={selectedSize === size ? 'default' : 'outline'}
						className="mr-2 mt-4"
						onClick={() => setSelectedSize(size)}
					>
						{getSizeName(size)}
					</Button>
				))}
			</div>

			<form className="mt-6">
				<div className="mt-4 flex">
					<Button
						type="button"
						className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
						onClick={addToCart}
					>
						Add to cart
					</Button>
				</div>
			</form>
		</div>
	);
}
