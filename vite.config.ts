import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
				runtimeCaching: [
					{
						urlPattern: ({ url }) => url.pathname.startsWith('/'),
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'app-cache'
						}
					},
					{
						urlPattern: ({ url }) => url.pathname === '/events.json',
						handler: 'NetworkFirst',
						options: {
							cacheName: 'events-cache',
							networkTimeoutSeconds: 10
						}
					},
					{
						urlPattern: ({ url }) => url.pathname === '/trends',
						handler: 'NetworkOnly'
					}
				]
			},
			registerType: 'autoUpdate',
			manifest: {
				background_color: '#ffffff',
				theme_color: '#7CCF00',
				name: 'moneybag.markets',
				description:
					'Amass wealth by buying, selling, and opening moneybags on the moneybag market.',
				short_name: 'MM 💰',
				start_url: '/',
				display: 'standalone',
				orientation: 'portrait',
				icons: [
					{
						src: '/favicon.svg',
						sizes: '24x24',
						type: 'image/svg+xml',
						purpose: 'any'
					},
					{
						src: '/favicon-144.svg',
						sizes: '144x144',
						type: 'image/svg+xml',
						purpose: 'any'
					},
					{
						src: '/favicon-192.svg',
						sizes: '192x192',
						type: 'image/svg+xml',
						purpose: 'any'
					},
					{
						src: '/favicon-512.svg',
						sizes: '512x512',
						type: 'image/svg+xml',
						purpose: 'any'
					}
				]
			}
		})
	]
});
