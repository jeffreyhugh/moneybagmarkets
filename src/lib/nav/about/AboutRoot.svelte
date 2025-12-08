<script lang="ts">
	import { blur } from 'svelte/transition';

	import { navState } from '$lib/gameState/navstate.svelte';

	import LayoutSubPage from '../LayoutSubPage.svelte';
	import PageAbout from './PageAbout.svelte';
</script>

<div
	class="col-start-1 row-start-1 flex flex-col items-stretch"
	transition:blur={{ duration: 200 }}
>
	<button
		class="mb-4 text-2xl font-bold md:text-4xl"
		onclick={() => (navState.modalPage = 'about')}
	>
		About
	</button>
	<div class="grid grow grid-cols-1 grid-rows-1">
		{#if navState.modalPage === 'about'}
			<LayoutSubPage>
				<PageAbout />
			</LayoutSubPage>
		{/if}
	</div>
</div>
