import type { Metadata } from 'next';

import '@/styles/globals.css';

import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Providers } from '@/components/providers';
import { SiteBlob } from '@/components/site-blob';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
	title: siteConfig.name,
	description: siteConfig.description,
	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable,
				)}
				suppressHydrationWarning={true}
			>
				<Providers>
					<div className="relative flex min-h-screen flex-col">
						<Suspense fallback={<Loader2 />}>
							<SiteHeader />
						</Suspense>
						<SiteBlob />
						<div className="flex-1">{children}</div>
						<SiteFooter />
					</div>
				</Providers>
			</body>
		</html>
	);
}
