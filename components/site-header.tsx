'use client';

import React, { JSX } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Link from 'next/link';
import {
	ReadonlyURLSearchParams,
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation';
import { Edit, ShoppingBag } from 'lucide-react';
import { useShoppingCart } from 'use-shopping-cart';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MainNav } from '@/components/main-nav';
import { ThemeToggle } from '@/components/theme-toggle';

export function SiteHeader(): JSX.Element | null {
	const pathname: string = usePathname();
	const router: AppRouterInstance = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();
	const { cartCount }: { cartCount: number | undefined } = useShoppingCart();

	if (pathname.startsWith('/studio')) return null;

	const defaultSearchQuery: string = searchParams.get('search') ?? '';
	console.log(defaultSearchQuery);

	function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData: FormData = new FormData(event.currentTarget);
		const searchQuery: FormDataEntryValue | null = formData.get('search');

		router.replace(`?search=${searchQuery}`);
	}

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-4 px-6 sm:space-x-0">
				<MainNav />
				<form
					className="hidden items-center lg:inline-flex"
					onSubmit={onSubmit}
				>
					<label
						htmlFor="search"
						className="sr-only"
					>
						Search products
					</label>
					<Input
						id="search"
						name="search"
						type="search"
						autoComplete="off"
						placeholder="Search products..."
						className="h-9 lg:w-[300px]"
						defaultValue={defaultSearchQuery}
					/>
				</form>
				<div className="flex items-center space-x-1">
					<Link href="/cart">
						<Button
							size="sm"
							variant="ghost"
						>
							<ShoppingBag className="h-5 w-5" />
							<span className="ml-2 text-sm font-bold">
								{cartCount}
							</span>
							<span className="sr-only">Cart</span>
						</Button>
					</Link>
					<ThemeToggle />
					{process.env.NODE_ENV === 'development' && (
						<Link href="/studio">
							<span className="sr-only">Go to Sanity Studio</span>
							<Button
								size="sm"
								variant="ghost"
							>
								<span className="sr-only">
									Open Sanity Studio
								</span>
								<Edit className="h-5 w-5" />
							</Button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
