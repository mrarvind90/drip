import { defineArrayMember, defineField, defineType, type Rule } from 'sanity';

export const product = defineType({
	name: 'product',
	title: 'Product',
	type: 'document',
	fields: [
		defineField({
			type: 'string',
			name: 'name',
			title: 'Name',
			description: 'Use SEO optimized name of the product.',
			validation: (rule: Rule) =>
				rule
					.required()
					.min(1)
					.max(256)
					.error('Name must be between 1 and 256 characters.'),
		}),
		defineField({
			type: 'slug',
			name: 'slug',
			title: 'Slug',
			description: 'Used as the parameter in the URL.',
			options: {
				source: 'name',
			},
			validation: (rule: Rule) =>
				rule.required().error('Slug must be set for the product.'),
		}),
		{
			type: 'array',
			name: 'images',
			of: [
				{
					type: 'image',
					name: 'image',
					title: 'Image',
					options: {
						accept: 'image/*',
					},
					fields: [
						defineField({
							type: 'string',
							name: 'alt',
							title: 'Alt',
							description: 'Caption for the image.',
							validation: (rule: Rule) =>
								rule
									.required()
									.min(1)
									.max(256)
									.error(
										'Alt text must be between 1 and 256 characters.',
									),
						}),
					],
					validation: (rule: Rule) =>
						rule
							.required()
							.assetRequired()
							.error('Image field cannot be empty.'),
				},
			],
			title: 'Images',
			description: 'Please upload multiple images of the product.',
			options: {
				layout: 'grid',
			},
			validation: (rule: Rule) =>
				rule.required().error('Must contain at least 1 image.'),
		},
		{
			type: 'array',
			name: 'categories',
			of: [
				defineArrayMember({
					type: 'string',
					name: 'category',
					title: 'Category',
					options: {
						list: [
							{
								title: 'Bags',
								value: 'bags',
							},
							{
								title: 'Belts',
								value: 'belts',
							},
							{
								title: 'Gloves',
								value: 'gloves',
							},
							{
								title: 'Scarves',
								value: 'scarves',
							},
							{
								title: 'Sunglasses',
								value: 'sunglasses',
							},
							{
								title: 'Wallets',
								value: 'wallets',
							},
						],
						layout: 'dropdown',
					},
					validation: (rule: Rule) =>
						rule
							.required()
							.error('Category value cannot be undefined.'),
				}),
			],
			title: 'Categories',
			description: 'List of categories the product belongs to.',
			validation: (rule: Rule) =>
				rule.required().error('Must contain at least 1 category.'),
		},
		{
			type: 'array',
			name: 'sizes',
			of: [
				defineArrayMember({
					type: 'string',
					name: 'size',
					title: 'Size',
					options: {
						list: [
							{
								title: 'X-Small',
								value: 'xs',
							},
							{
								title: 'Small',
								value: 's',
							},
							{
								title: 'Medium',
								value: 'm',
							},
							{
								title: 'Large',
								value: 'l',
							},
							{
								title: 'X-Large',
								value: 'xl',
							},
							{
								title: 'One Size',
								value: 'one-size',
							},
						],
						layout: 'dropdown',
					},
					validation: (rule: Rule) =>
						rule
							.required()
							.error('Size value cannot be undefined.'),
				}),
			],
			title: 'Sizes',
			description: 'List of sizes available for the product.',
			validation: (rule: Rule) =>
				rule.required().error('Must contain at least 1 size.'),
		},
		{
			type: 'array',
			name: 'colors',
			of: [
				defineArrayMember({
					type: 'string',
					name: 'color',
					title: 'Color',
					options: {
						list: [
							{
								title: 'Black',
								value: 'black',
							},
							{
								title: 'Blue',
								value: 'blue',
							},
							{
								title: 'Brown',
								value: 'brown',
							},
							{
								title: 'Green',
								value: 'green',
							},
							{
								title: 'Yellow',
								value: 'yellow',
							},
						],
					},
					validation: (rule: Rule) =>
						rule
							.required()
							.error('Color value cannot be undefined.'),
				}),
			],
			title: 'Colors',
			description: 'List of color variants available for the product.',
			validation: (rule: Rule) =>
				rule.required().error('Must contain at least 1 color.'),
		},
		defineField({
			type: 'text',
			name: 'description',
			title: 'Description',
			description: 'Summary of the product.',
			validation: (rule: Rule) =>
				rule
					.required()
					.min(1)
					.max(1000)
					.error(
						'Description must be between 1 and 1000 characters.',
					),
		}),
		defineField({
			type: 'string',
			name: 'sku',
			title: 'SKU',
			description: 'SKU of the product.',
			validation: (rule: Rule) =>
				rule.required().error('SKU field cannot be undefined.'),
		}),
		defineField({
			type: 'string',
			name: 'currency',
			title: 'Currency',
			description: 'Currency of the product being sold.',
			options: {
				list: [
					{
						title: 'USD',
						value: 'USD',
					},
				],
				layout: 'dropdown',
			},
			validation: (rule: Rule) =>
				rule.required().error('Currency field cannot be undefined.'),
		}),
		defineField({
			type: 'number',
			name: 'price',
			title: 'Price',
			description: 'Price of the item to the nearest cents.',
			initialValue: 0.0,
			validation: (rule: Rule) =>
				rule
					.positive()
					.greaterThan(0)
					.error('Price must be greater than 0'),
		}),
	],
});
