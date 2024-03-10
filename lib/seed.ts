import { client } from '@/sanity/lib/client';
import type { SanityImageAssetDocument, Transaction } from 'next-sanity';

import { InventoryProduct } from '@/types/products';
import { inventory } from '@/config/inventory';

export async function seedSanityData(): Promise<void> {
	const transaction: Transaction = client.transaction();

	inventory.forEach((item: InventoryProduct): void => {
		const product = {
			_type: 'product',
			_id: item.id,
			name: item.name,
			currency: item.currency,
			description: item.description,
			price: item.price,
			sku: item.sku,
			sizes: item.sizes,
			colors: item.colors,
			categories: item.categories,
		};

		transaction.createOrReplace(product);
	});

	await transaction.commit();
	await seedSanityImages();

	console.log('Sanity data seeded');
}

async function seedSanityImages(): Promise<void> {
	for (const item of inventory) {
		let images: any[] = [];

		for (const image of item.images) {
			const imageAssetResponse: Response = await fetch(image.url);
			const imageAssetBuffer: ArrayBuffer =
				await imageAssetResponse.arrayBuffer();
			const imageAsset: SanityImageAssetDocument =
				await client.assets.upload(
					'image',
					Buffer.from(imageAssetBuffer),
				);

			images.push({
				_key: imageAsset._id,
				_type: 'image',
				asset: {
					_type: 'reference',
					_ref: imageAsset._id,
				},
				alt: image.caption,
			});
		}
		await client
			.patch(item.id)
			.set({ 'slug.current': slugify(item.name), images })
			.commit();
	}
}

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '');
}
