<script lang="ts">
	import { navState } from '$lib/gameState/navstate.svelte';

	import LayoutSubPage from '../LayoutSubPage.svelte';
	import PageIndex from './PageIndex.svelte';
	import PageMoneybag from './PageMoneybag.svelte';
</script>

<div
	class="modal-box border-base-content/20 mb-12 flex flex-col items-stretch overflow-y-auto border-t-2 bg-transparent backdrop-blur-2xl sm:border-2"
	style="border-style: outset;height:calc(var(--spacing) * 160);max-height:calc(var(--spacing) * 160);"
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
