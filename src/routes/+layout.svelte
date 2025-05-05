<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import '@fontsource-variable/quicksand';
	import Header from '../lib/Header.svelte';

	let { children } = $props();
</script>

<ModeWatcher defaultMode="light" defaultTheme="light" />
<div class="flex min-h-dvh w-full flex-col items-center">
	<Header />
	<div class="mb-8 w-11/12 max-w-4xl text-xl">
		{@render children()}
	</div>
</div>
