'use client';

import * as React from 'react';
import { JSX } from 'react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { Filter } from 'lucide-react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { ProductFilters } from '@/components/product-filters';

const sortOptions: { name: string; value: string }[] = [
	{ name: 'Newest', value: '/?date=desc' },
	{ name: 'Price, low to high', value: '/?price=asc' },
	{ name: 'Price, high to low', value: '/?price=desc' },
];

export function ProductSort(): JSX.Element {
	const router: AppRouterInstance = useRouter();

	return (
		<div className="flex items-center">
			<Select onValueChange={(value: string) => router.replace(value)}>
				<SelectTrigger
					className="sm:w-[180px]"
					aria-label="Select sort option"
				>
					<SelectValue placeholder="Sort By" />
				</SelectTrigger>
				<SelectContent>
					{sortOptions.map((option) => (
						<SelectItem
							key={option.name}
							value={option.value}
						>
							{option.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Sheet>
				<SheetContent className="w-[300px]">
					<SheetHeader>
						<SheetTitle>Categories</SheetTitle>
						<SheetDescription>
							Narrow your product search using the options below.
						</SheetDescription>
					</SheetHeader>
					<ProductFilters />
				</SheetContent>
				<SheetTrigger className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
					<span className="sr-only">Filters</span>
					<Filter
						className="h-5 w-5"
						aria-hidden="true"
					/>
				</SheetTrigger>
			</Sheet>
		</div>
	);
}
