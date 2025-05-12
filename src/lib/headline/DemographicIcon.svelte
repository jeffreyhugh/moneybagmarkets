<script lang="ts">
	import Home from '@tabler/icons-svelte/icons/home';
	import Old from '@tabler/icons-svelte/icons/old';
	import PlayBasketball from '@tabler/icons-svelte/icons/play-basketball';
	import Rollercoaster from '@tabler/icons-svelte/icons/rollercoaster';
	import RosetteDiscount from '@tabler/icons-svelte/icons/rosette-discount';
	import ShoppingBag from '@tabler/icons-svelte/icons/shopping-bag';
	import Speedboat from '@tabler/icons-svelte/icons/speedboat';
	import Tools from '@tabler/icons-svelte/icons/tools';
	import Walk from '@tabler/icons-svelte/icons/walk';

	const { part }: { part: string } = $props();

	const className = 'size-5';
</script>

{#if part === '{{AGE_YOUNG}}'}
	<PlayBasketball class={className} />
{:else if part === '{{AGE_MID}}'}
	<Walk class={className} />
{:else if part === '{{AGE_OLD}}'}
	<Old class={className} />
{:else if part === '{{MONEY_LOWER}}'}
	<RosetteDiscount />
{:else if part === '{{MONEY_MID}}'}
	<Home class={className} />
{:else if part === '{{MONEY_RICH}}'}
	<Speedboat class={className} />
{:else if part === '{{TYPE_GOOD}}'}
	<ShoppingBag class={className} />
{:else if part === '{{TYPE_SERVICE}}'}
	<Tools class={className} />
{:else if part === '{{TYPE_ESTABLISHMENT}}'}
	<Rollercoaster class={className} />
{/if}
