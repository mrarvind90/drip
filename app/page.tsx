import type { JSX } from 'react';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

import { SanityProduct } from '@/types/products';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { ProductFilters } from '@/components/product-filters';
import { ProductGrid } from '@/components/product-grid';
import { ProductSort } from '@/components/product-sort';

interface Props {
	searchParams: {
		date?: string;
		price?: string;
		category?: string;
		size?: string;
		color?: string;
		search?: string;
	};
}

export default async function Home({
	searchParams,
}: Props): Promise<JSX.Element> {
	const {
		date = 'desc',
		price,
		category,
		size,
		color,
		search,
	}: Props['searchParams'] = searchParams;

	const type: string = '_type == "product"';

	// Sorting
	const priceOrder: string = price ? `| order(price ${price})` : '';
	const dateOrder: string = date ? `| order(_createdAt ${date})` : '';
	const order: string = `${priceOrder} ${dateOrder}`;

	// Filters
	const categoryFilter: string = category
		? `&& "${category}" in categories`
		: '';
	const sizeFilter: string = size ? `&& "${size}" in sizes` : '';
	const colorFilter: string = color ? `&& "${color}" in colors` : '';

	// Searching
	const searchFilter: string = search ? `&& name match "${search}"` : '';

	const filter: string = `*[${type} ${categoryFilter} ${sizeFilter} ${colorFilter} ${searchFilter}]`;
	console.log(`${filter} ${order} {
			_id,
			_createdAt,
			name,
			sku,
			images,
			currency,
			price,
			description,
			"slug": slug.current
		}`);

	const products: SanityProduct[] = await client.fetch<SanityProduct[]>(
		groq`${filter} ${order} {
			_id,
			_createdAt,
			name,
			sku,
			images,
			currency,
			price,
			description,
			"slug": slug.current
		}`,
	);

	return (
		<div>
			<div className="px-4 pt-20 text-center">
				<h1 className="text-4xl font-extrabold tracking-normal">
					{siteConfig.name}
				</h1>
				<p className="mx-auto mt-4 max-w-3xl text-base">
					{siteConfig.description}
				</p>
			</div>
			<div>
				<main className="mx-auto max-w-6xl px-6">
					<div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800">
						<h1 className="text-xl font-bold tracking-tight sm:text-2xl">
							{products.length} result
							{products.length === 1 ? '' : 's'}
						</h1>
						{/* Product Sort */}

						<ProductSort />
					</div>

					<section
						aria-labelledby="products-heading"
						className="pb-24 pt-6"
					>
						<h2
							id="products-heading"
							className="sr-only"
						>
							Products
						</h2>
						<div
							className={cn(
								'grid grid-cols-1 gap-x-8 gap-y-10',
								products.length > 0
									? 'lg:grid-cols-4'
									: 'lg:grid-cols-[1fr_3fr]',
							)}
						>
							<div className="hidden lg:block">
								{/* Product filters */}
								<ProductFilters />
							</div>
							{/* Product grid */}
							<ProductGrid products={products} />
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
