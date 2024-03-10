export interface SiteConfig {
	name: string;
	description: string;
	footer: { name: string; href: string }[];
}

export const siteConfig: SiteConfig = {
	name: 'Drip',
	description: 'Expertly designed goods for the workspace, home and travel.',
	footer: [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '#' },
		{ name: 'Terms & Conditions', href: '#' },
		{ name: 'Shipping & Return Policy', href: '#' },
		{ name: 'Privacy Policy', href: '#' },
		{ name: 'FAQ', href: '#' },
	],
};
