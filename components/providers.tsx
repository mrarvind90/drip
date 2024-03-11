'use client';

import React from 'react';
import { CartProvider } from 'use-shopping-cart';

import { Toaster } from '@/components/ui/toaster';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';

interface Props {
	children: React.ReactNode;
}

/*
	NOTE: Learn how Providers work in NextJS? I believe this is React context.
	For example, why is the CartProvider the parent wrapper over theme?
*/

export function Providers({ children }: Props) {
	return (
		<CartProvider
			currency="USD"
			shouldPersist={true}
			cartMode="checkout-session"
			stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string}
			persistKey="usc-cart"
		>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
			>
				<Toaster />
				{children}
				<TailwindIndicator />
			</ThemeProvider>
		</CartProvider>
	);
}
