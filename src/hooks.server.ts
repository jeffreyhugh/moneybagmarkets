import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const trends: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/trends') {
		const targetURL = 'https://trends.jh.ms/script.js';

		const response = await fetch(targetURL, {
			method: event.request.method,
			headers: {
				...Object.fromEntries(event.request.headers)
			},
			body: event.request.method === 'POST' ? await event.request.text() : null
		});

		const responseBody = await response.text();
		return new Response(responseBody, {
			status: response.status,
			headers: {
				'Content-Type': response.headers.get('Content-Type') || 'application/javascript'
			}
		});
	} else if (event.url.pathname === '/api/send') {
		const targetURL = 'https://trends.jh.ms/api/send';

		const response = await fetch(targetURL, {
			method: event.request.method,
			headers: {
				...Object.fromEntries(event.request.headers)
			},
			body: event.request.method === 'POST' ? await event.request.text() : null
		});

		const responseBody = await response.text();
		return new Response(responseBody, {
			status: response.status,
			headers: {
				'Content-Type': response.headers.get('Content-Type') || 'application/javascript'
			}
		});
	}

	return resolve(event);
};

export const handle: Handle = sequence(trends);
