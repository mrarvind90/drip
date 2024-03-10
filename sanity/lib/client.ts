import { createClient } from 'next-sanity';
import type { SanityClient } from 'sanity';

import { apiVersion, dataset, projectId, useCdn } from '../env';

export const client: SanityClient = createClient({
	apiVersion,
	dataset,
	projectId,
	useCdn,
});
