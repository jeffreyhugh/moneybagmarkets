<script lang="ts">
	import { blur } from 'svelte/transition';

	import { navState } from '$lib/gameState/navstate.svelte';

	import LayoutSubPage from '../LayoutSubPage.svelte';
	import PageIndex from './PageIndex.svelte';
	import PageMoneybag from './PageMoneybag.svelte';
</script>

<div
	class="col-start-1 row-start-1 flex flex-col items-stretch"
	transition:blur={{ duration: 200 }}
>
	<button
		class="mb-4 text-2xl font-bold md:text-4xl"
		onclick={() => (navState.modalPage = 'notebook')}
	>
		Notebook
	</button>
	<div class="grid grow grid-cols-1 grid-rows-1">
		{#if navState.modalPage === 'notebook'}
			<LayoutSubPage>
				<PageIndex />
			</LayoutSubPage>
		{:else if navState.modalPage.startsWith('notebook/mb/')}
			<LayoutSubPage>
				<PageMoneybag />
			</LayoutSubPage>
		{/if}
	</div>
</div>
