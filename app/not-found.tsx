import type { JSX } from 'react';
import Link from 'next/link';

export default function NotFound(): JSX.Element {
	return (
		<div>
			<h2>Not Found</h2>
			<p>Could not find requested resource</p>
			<Link href="/">Return Home</Link>
		</div>
	);
}
