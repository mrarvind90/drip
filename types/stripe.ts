import Stripe from 'stripe';

export type StripeCheckoutSession = Stripe.Response<Stripe.Checkout.Session>;
export type StripeCheckoutSessionCustomerDetails =
	Stripe.Checkout.Session.CustomerDetails;
