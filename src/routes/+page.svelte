<script lang="ts">
	import { IconPigMoney } from '@tabler/icons-svelte';

	import Moneybag from '../lib/Moneybag.svelte';
	import { coinEvents } from './coinEvents.svelte';
	import { gameState } from './gamestate.svelte';
	import { moneybags } from './moneybags';

	let hideSparklines = $state(false);
</script>

<div
	class="border-base-300 sticky top-0 z-30 mb-2 flex items-baseline justify-between gap-1 border-b py-2 backdrop-blur-md select-none"
>
	<div>
		<label class="label ml-2">
			<input type="checkbox" bind:checked={hideSparklines} class="toggle" />
			Hide Sparklines
		</label>
	</div>
	<div class="relative top-0 mr-2 flex justify-end gap-1 text-xl md:text-2xl">
		<IconPigMoney class="size-6 translate-y-0.5 md:size-7" />
		{gameState.coins.toLocaleString()}
		{#each coinEvents.events as e (e.id)}
			<div
				class={[
					'fade-move absolute right-0 left-0 z-10 mx-auto w-fit text-base font-bold md:text-lg',
					e.sign === '+' && 'text-success',
					e.sign === '-' && 'text-error'
				]}
			>
				{e.sign}{e.value}{e.suffix || ''}
			</div>
		{/each}
	</div>
</div>
<div class="flex flex-col gap-2">
	{#each moneybags as moneybag (moneybag.name)}
		<Moneybag {moneybag} {hideSparklines} />
	{/each}
</div>

<style>
	.fade-move {
		position: absolute; /* Absolutely positioned */
		top: -0.25rem; /* Starting position */
		opacity: 1; /* Starting opacity */
		animation: fadeMove 1s linear forwards; /* Animation properties */
	}

	@keyframes fadeMove {
		0% {
			top: -0.25rem; /* Starting position */
			opacity: 1; /* Starting opacity */
		}
		100% {
			top: -1.5rem; /* Ending position */
			opacity: 0; /* Ending opacity */
		}
	}
</style>
