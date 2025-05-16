<script lang="ts">
	import type { Snippet } from 'svelte';

	import { navState } from '$lib/gameState/navstate.svelte';

	const { location, strict, children }: { location: string; strict?: boolean; children: Snippet } =
		$props();

	const active = $derived.by(() => {
		if (strict) {
			return navState.modalPage === location;
		} else {
			return navState.modalPage.startsWith(location);
		}
	});
</script>

<button
	type="button"
	onclick={() => {
		if (strict) {
			navState.modalPage = navState.modalPage === location ? '' : location;
		} else {
			navState.modalPage = navState.modalPage.startsWith(location) ? '' : location;
		}
	}}
	role="tab"
	class={['tab grow', active && 'tab-active']}
>
	{@render children()}
</button>
