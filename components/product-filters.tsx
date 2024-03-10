'use client';

import type { JSX } from 'react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
	useRouter,
	useSearchParams,
	type ReadonlyURLSearchParams,
} from 'next/navigation';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

const filters = [
	{
		id: 'category',
		name: 'Category',
		options: [
			{ value: 'bags', label: 'Bags' },
			{ value: 'belts', label: 'Belts' },
			{ value: 'gloves', label: 'Gloves' },
			{ value: 'scarves', label: 'Scarves' },
			{ value: 'wallets', label: 'Wallets' },
		],
	},
	{
		id: 'size',
		name: 'Size',
		options: [
			{ value: 'xs', label: 'X-Small' },
			{ value: 's', label: 'Small' },
			{ value: 'm', label: 'Medium' },
			{ value: 'l', label: 'Large' },
			{ value: 'xl', label: 'X-Large' },
			{ value: 'one-size', label: 'One Size' },
		],
	},
	{
		id: 'color',
		name: 'Color',
		options: [
			{ value: 'black', label: 'Black' },
			{ value: 'blue', label: 'Blue' },
			{ value: 'brown', label: 'Brown' },
			{ value: 'green', label: 'Green' },
			{ value: 'yellow', label: 'Yellow' },
		],
	},
];

export function ProductFilters(): JSX.Element {
	const searchParams: ReadonlyURLSearchParams = useSearchParams();
	const router: AppRouterInstance = useRouter();

	const searchValues: [string, string][] = Array.from(searchParams.entries());

	return (
		<form className="sticky top-20">
			<h3 className="sr-only">Categories</h3>

			{filters.map((section, i) => (
				<Accordion
					key={i}
					type="single"
					collapsible
				>
					<AccordionItem value={`item-${i}`}>
						<AccordionTrigger>
							<span>
								{section.name}{' '}
								<span className="ml-1 text-xs font-extrabold uppercase text-gray-400">
									{searchParams.get(section.id)
										? `(${searchParams.get(section.id)})`
										: ''}
								</span>
							</span>
						</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-4">
								{section.options.map(
									(
										option: {
											value: string;
											label: string;
										},
										idx: number,
									) => (
										<div
											key={option.value}
											className="flex items-center space-x-2"
										>
											<Checkbox
												id={`${section.id}-${idx}`}
												checked={searchValues.some(
													([key, value]: [
														string,
														string,
													]) =>
														key === section.id &&
														value === option.value,
												)}
												onClick={(event): void => {
													const params: URLSearchParams =
														new URLSearchParams(
															searchParams,
														);
													const checked: boolean =
														event.currentTarget
															.dataset.state ===
														'checked';

													checked
														? params.delete(
																section.id,
															)
														: params.set(
																section.id,
																option.value,
															);

													router.replace(
														`?${params.toString()}`,
													);
												}}
											/>
											<label
												htmlFor={`${section.id}-${idx}`}
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												{option.label}
											</label>
										</div>
									),
								)}
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			))}
		</form>
	);
}
