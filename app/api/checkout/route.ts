import { NextResponse } from 'next/server';
import {
	validateCartItems,
	type ValidatedItem,
} from 'use-shopping-cart/utilities';

import type { StripeCheckoutSession } from '@/types/stripe';
import { inventory } from '@/config/inventory';
import { stripe } from '@/lib/stripe';

export async function POST(
	request: Request,
): Promise<NextResponse<StripeCheckoutSession>> {
	const origin: string | null = request.headers.get('origin');
	const cartDetails = await request.json();

	/*
		NOTE: This function makes sure that cartDetails from client is not tampered with.
		inventory here is meant to simulate a backend.
	*/
	const lineItems: ValidatedItem[] = validateCartItems(
		inventory,
		cartDetails,
	);

	const session: StripeCheckoutSession =
		await stripe.checkout.sessions.create({
			submit_type: 'pay',
			mode: 'payment',
			payment_method_types: ['card'],
			line_items: lineItems,
			shipping_address_collection: {
				allowed_countries: ['US'],
			},
			shipping_options: [
				{
					shipping_rate: 'shr_1Oshu7J8rRc11umP3B4I80b7',
				},
			],
			billing_address_collection: 'auto',
			success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/cart`,
		});

	return NextResponse.json(session);
}
