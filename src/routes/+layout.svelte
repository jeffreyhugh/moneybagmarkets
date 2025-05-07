<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/quicksand';

	import { ModeWatcher } from 'mode-watcher';

	import Header from '../lib/Header.svelte';

	let { children } = $props();
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
</svelte:head>

<ModeWatcher defaultMode="light" defaultTheme="light" />
<div class="flex min-h-dvh w-full flex-col items-center">
	<Header />
	<div class="mb-8 w-11/12 max-w-4xl text-base md:text-xl">
		{@render children()}
	</div>
</div>
