<script lang="ts">
	import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-svelte';
	import { colord } from 'colord';

	import { MarketDataLastIndex } from '$lib/marketData';

	import { gameState } from '../routes/gamestate.svelte';
	import type { Moneybag_t } from '../routes/moneybags';
	import Sparkline from './Sparkline.svelte';

	const { moneybag }: { moneybag: Moneybag_t } = $props();
</script>

<div class="pointer-events-none mt-4 flex h-full w-full flex-col md:mt-0">
	<div class="mb-1 hidden w-full gap-1 text-base md:flex">
		<span class="grid grid-cols-1 grid-rows-1">
			{#if gameState.moneybags[moneybag.name].marketHistory[MarketDataLastIndex] >= moneybag.market.target}
				<span class="col-start-1 row-start-1">
					<IconTrendingUp class="inline size-6" />
				</span>
			{:else}
				<span class="col-start-1 row-start-1">
					<IconTrendingDown class="inline size-6" />
				</span>
			{/if}
		</span>
		Current
		<span class="font-bold">
			{gameState.moneybags[moneybag.name].marketHistory[MarketDataLastIndex]}
		</span>
	</div>
	<div
		class="border-base-content/70 rounded-bl-field h-16 w-full grow overflow-hidden border-b-2 border-l-2"
	>
		{#if moneybag.market.target !== 0}
			<Sparkline
				data={gameState.moneybags[moneybag.name].marketHistory}
				options={{
					svgClass: '-ml-1',
					fillColor: colord(moneybag.colors.sparkline).alpha(0.3).toRgbString(),
					strokeWidth: 3,
					lineColor: moneybag.colors.sparkline,
					showTooltip: false,
					min: moneybag.market.min,
					max: moneybag.market.max
				}}
			/>
		{/if}
	</div>
	<div class="mt-1 mb-3 text-base md:mb-0">
		<div class="inline-flex gap-1 md:hidden">
			<span class="grid grid-cols-1 grid-rows-1">
				{#if gameState.moneybags[moneybag.name].marketHistory[MarketDataLastIndex] >= moneybag.market.target}
					<span class="col-start-1 row-start-1">
						<IconTrendingUp class="inline size-4 md:size-6" />
					</span>
				{:else}
					<span class="col-start-1 row-start-1">
						<IconTrendingDown class="inline size-4 md:size-6" />
					</span>
				{/if}
			</span>
			Current
			<span class="font-bold">
				{gameState.moneybags[moneybag.name].marketHistory[MarketDataLastIndex]}
			</span>
			&middot;
		</div>
		Low
		<span class="font-bold">
			{Math.min(...gameState.moneybags[moneybag.name].marketHistory)}
		</span>
		&middot; High
		<span class="font-bold">
			{Math.max(...gameState.moneybags[moneybag.name].marketHistory)}
		</span>
	</div>
</div>
