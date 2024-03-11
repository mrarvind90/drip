'use client';

import { JSX, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';

import { Button } from '@/components/ui/button';

export function CartSummary(): JSX.Element {
	const { totalPrice, cartDetails, cartCount, redirectToCheckout } =
		useShoppingCart();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const isDisabled: boolean = isLoading || cartCount! === 0;

	// Note: This is hard-coded, need to see how to design dynamic shipping amount
	const shippingAmount: number = cartCount! > 0 ? 500 : 0;
	const totalAmount: number = totalPrice! + shippingAmount;

	async function onCheckout(): Promise<void> {
		const response: Response = await fetch('/api/checkout', {
			method: 'POST',
			body: JSON.stringify(cartDetails),
		});

		const data = await response.json();
		const result = await redirectToCheckout(data.id);

		if (result?.error) {
			console.error(result);
		}

		setIsLoading(false);
	}

	return (
		<section
			aria-labelledby="summary-heading"
			className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
		>
			<h2
				id="summary-heading"
				className="text-lg font-medium"
			>
				Order summary
			</h2>

			<dl className="mt-6 space-y-4">
				<div className="flex items-center justify-between">
					<dt className="text-sm">Subtotal</dt>
					<dd className="text-sm font-medium">
						{formatCurrencyString({
							currency: 'USD',
							value: totalPrice!,
							language: 'en-US',
						})}
					</dd>
				</div>
				<div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
					<dt className="flex items-center text-sm">
						<span>Shipping estimate</span>
					</dt>
					<dd className="text-sm font-medium">
						{formatCurrencyString({
							currency: 'USD',
							value: shippingAmount,
							language: 'en-US',
						})}
					</dd>
				</div>
				<div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
					<dt className="text-base font-medium">Order total</dt>
					<dd className="text-base font-medium">
						{formatCurrencyString({
							currency: 'USD',
							value: totalAmount,
							language: 'en-US',
						})}
					</dd>
				</div>
			</dl>

			<div className="mt-6">
				<Button
					type="button"
					className="w-full"
					disabled={isDisabled}
					onClick={onCheckout}
				>
					{isLoading && (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					)}
					{isLoading ? 'Loading...' : 'Checkout'}
				</Button>
			</div>
		</section>
	);
}
