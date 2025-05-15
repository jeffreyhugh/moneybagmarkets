<script lang="ts">
	import LayoutPage from './LayoutPage.svelte';
	import PageIndex from './PageIndex.svelte';
	import PageMoneybag from './PageMoneybag.svelte';

	let page = $state('index');
	const setPage = (p: string) => (page = p);
</script>

<div
	class="modal-box border-base-content/20 overflow-y-auto border-t-2 bg-transparent backdrop-blur-2xl sm:border-2"
	style="border-style: outset;"
>
	<button class="mb-4 text-2xl font-bold md:text-4xl" onclick={() => setPage('index')}>
		Notebook
	</button>
	<div class="grid grid-cols-1 grid-rows-1">
		{#if page === 'index'}
			<LayoutPage>
				<PageIndex {setPage} />
			</LayoutPage>
		{:else if page.startsWith('mb')}
			<LayoutPage>
				<PageMoneybag {setPage} mbName={page.substring(2)} />
			</LayoutPage>
		{/if}
	</div>
</div>
