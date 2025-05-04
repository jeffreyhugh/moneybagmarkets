<script lang="ts">
	import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-svelte';
	import { gameState } from '../routes/gamestate.svelte';
	import type { Moneybag_t } from '../routes/moneybags';
	import { weightedChoice } from '$lib/weightedChoice';
	import { handleChoice } from '$lib/handleChoice.svelte';
	import { Sparkline } from 'sparkline-svelte';
	import { MarketDataLastIndex } from '$lib/marketData';
	import { blur } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	const { moneybag }: { moneybag: Moneybag_t } = $props();
</script>

<div class="mb-1 flex gap-1 text-xs">
	<span class="grid grid-cols-1 grid-rows-1">
		{#if gameState.moneybags[moneybag.name].marketHistory[MarketDataLastIndex] >= moneybag.market.target}
			<span class="col-start-1 row-start-1">
				<IconTrendingUp class="inline size-4" />
			</span>
		{:else}
			<span class="col-start-1 row-start-1">
				<IconTrendingDown class="inline size-4" />
			</span>
		{/if}
	</span>
	Current
	<span class="font-bold">
		{gameState.moneybags[moneybag.name].marketHistory[MarketDataLastIndex]}
	</span>
</div>
<div class="rounded-bl-field border-base-content/50 h-16 w-40 border-b border-l">
	<Sparkline
		data={gameState.moneybags[moneybag.name].marketHistory}
		options={{
			fillColor: '',
			strokeWidth: 2,
			lineColor: moneybag.colors.sparkline,
			showTooltip: false
		}}
	/>
</div>
<div class="mt-1 text-xs">
	Low
	<span class="font-bold">
		{Math.min(...gameState.moneybags[moneybag.name].marketHistory)}
	</span>
	&middot; High
	<span class="font-bold">
		{Math.max(...gameState.moneybags[moneybag.name].marketHistory)}
	</span>
</div>
