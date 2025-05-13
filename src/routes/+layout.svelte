<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/quicksand';

	import { ModeWatcher } from 'mode-watcher';
	import { pwaInfo } from 'virtual:pwa-info';
	import { useRegisterSW } from 'virtual:pwa-register/svelte';

	import Header from '../lib/Header.svelte';

	let { children } = $props();

	const webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');
	useRegisterSW({
		onRegistered(sw) {
			console.debug('Service worker registered', sw);
		},
		onRegisterError(error) {
			console.error('Error registering service worker', error);
		},
		onOfflineReady() {
			console.log('Ready for offline');
		}
	});
</script>

<svelte:head>
	<title>moneybag.markets</title>
	<meta name="description" content="Stock trading. Gambling. Invest your cake and gamble it too." />

	<script
		src="/trends"
		defer
		data-exclude-search="true"
		data-exclude-hash="true"
		data-website-id="c954ec86-fe0c-4a99-ac32-31e8e6007b33"
	></script>

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html webManifestLink}
</svelte:head>

<ModeWatcher defaultMode="light" defaultTheme="light" />
<div class="flex min-h-dvh w-full flex-col items-center select-none">
	<Header />
	<div class="mb-8 w-full text-base md:text-xl">
		{@render children()}
	</div>
</div>
