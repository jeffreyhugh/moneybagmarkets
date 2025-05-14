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
				theme_color: '#ffffff00',
				name: 'moneybag.markets',
				description:
					'Amass wealth by buying, selling, and opening moneybags on the moneybag markets.',
				short_name: 'Moneybag',
				start_url: '/',
				display: 'standalone',
				orientation: 'portrait',
				icons: [
					{
						src: '/favicon.svg',
						sizes: '512x512',
						type: 'image/svg+xml',
						purpose: 'any'
					},
					{
						src: '/web-app-manifest-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable'
					},
					{
						src: '/web-app-manifest-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					},
					{
						src: '/favicon.ico',
						sizes: '48x48',
						type: 'image/x-icon',
						purpose: 'any'
					},
					{
						src: '/apple-touch-icon.png',
						sizes: '180x180',
						type: 'image/png',
						purpose: 'maskable'
					}
				]
			}
		})
	]
});
