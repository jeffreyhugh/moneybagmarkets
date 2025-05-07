<script lang="ts">
	import { IconMoneybag } from '@tabler/icons-svelte';
	import { blur } from 'svelte/transition';
	import Confetti from 'svelte-confetti';

	import { handleChoice } from '$lib/handleChoice.svelte';
	import LuckyWheel from '$lib/LuckyWheel.svelte';
	import { weightedChoice } from '$lib/weightedChoice';

	import { coin } from '../routes/coinEvents.svelte';
	import { gameState } from '../routes/gamestate.svelte';
	import type { Moneybag_t } from '../routes/moneybags';
	import Locker from './Locker.svelte';
	import { MarketDataLastIndex } from './marketData';
	import MoneybagSparkline from './MoneybagSparkline.svelte';

	const MultiplierStops = [1, 5, 10, 100, 1000];

	const { moneybag }: { moneybag: Moneybag_t } = $props();
	let mult = $state({
		index: 0,
		multiplier: MultiplierStops[0]
	});
	let opening = $state(false);
	let showWheel = $state<number | null>(null);
	let showGain = $state<string | null>(null);

	// const bumpMultiplier = () => {
	// 	const newIndex = (mult.index + 1) % MultiplierStops.length;
	// 	// if (gameState.moneybags[moneybag.name].owned >= MultiplierStops[newIndex]) {
	// 	mult.index = newIndex;
	// 	mult.multiplier = MultiplierStops[newIndex];
	// 	// } else {
	// 	// mult.index = 0;
	// 	// mult.multiplier = MultiplierStops[0];
	// 	// }
	// };

	const openMoneybag = async () => {
		if (gameState.moneybags[moneybag.name].owned === 0) {
			return;
		}

		opening = true;

		gameState.moneybags[moneybag.name].owned -= 1;

		// const choices = [] as ((typeof moneybag.open)[0] | null)[];
		// let random = 0;
		// for (let i = 0; i < mult.multiplier; i++) {
		// 	if (gameState.moneybags[moneybag.name].owned === 0) {
		// 		opening = false;
		// 		break;
		// 	}

		// 	gameState.moneybags[moneybag.name].owned -= 1;

		// 	const [choice, r] = weightedChoice(moneybag.open);
		// 	if (!choice) {
		// 		break;
		// 	}
		// 	random = r;
		// 	choices.push(choice);
		// }

		const [choice, random] = weightedChoice(moneybag.open);

		if (!choice) {
			opening = false;
			return;
		}

		showWheel = random;
		await new Promise((resolve) => setTimeout(resolve, 2200));

		// showGain = handleChoices(moneybag, choices);
		showGain = handleChoice(moneybag, choice);

		await new Promise((resolve) => setTimeout(resolve, 500));
		showGain = null;
		showWheel = null;

		await new Promise((resolve) => setTimeout(resolve, 200));
		opening = false;
	};

	const buyMoneybag = () => {
		const cost = gameState.moneybags[moneybag.name].marketHistory[MarketDataLastIndex];
		let total = 0;
		for (let i = 0; i < mult.multiplier; i++) {
			if (gameState.moneybags[moneybag.name].owned === gameState.maxEachMoneybag) {
				break;
			}
			if (gameState.coins < cost) {
				break;
			}

			total += cost;
			gameState.coins -= cost;
			gameState.moneybags[moneybag.name].owned += 1;
		}

		coin('-', total);
	};

	const sellMoneybag = () => {
		const cost = gameState.moneybags[moneybag.name].marketHistory[MarketDataLastIndex];
		let total = 0;
		for (let i = 0; i < mult.multiplier; i++) {
			if (gameState.moneybags[moneybag.name].owned === 0) {
				break;
			}

			total += cost;
			gameState.coins += cost;
			gameState.moneybags[moneybag.name].owned -= 1;
		}

		coin('+', total);
	};
</script>

<div
	class="rounded-box border-base-300 relative flex items-center justify-between border p-4 select-none"
>
	{#if gameState.moneybags[moneybag.name].unlocked}
		<div class="absolute top-1/2 left-1/2">
			<Confetti x={[-0.4, 0.4]} y={[0.2, 0.5]} amount={20} colorArray={moneybag.colors.confetti} />
		</div>
	{/if}
	{#if !gameState.moneybags[moneybag.name].unlocked}
		<Locker {moneybag} />
	{/if}
	<div class="flex items-center gap-4">
		<div
			class={[
				'rounded-box flex size-24 items-center justify-center bg-gradient-to-br',
				moneybag.colors.from,
				moneybag.colors.via,
				moneybag.colors.to,
				moneybag.colors.text
			]}
		>
			{#if moneybag.icon}
				<moneybag.icon class="size-16" />
			{:else}
				<IconMoneybag class="size-16" />
			{/if}
		</div>
		<div class="flex flex-col">
			<div class="text-2xl font-bold">{moneybag.name}</div>
			<div>
				<span class="font-bold">
					{gameState.moneybags[moneybag.name].owned}/{gameState.maxEachMoneybag}
				</span> owned
			</div>
			<!-- {#if moneybag.market.target !== 0}
				<button disabled={opening} class={['btn btn-sm']} onclick={bumpMultiplier}>
					x{mult.multiplier}
				</button>
			{/if} -->
			<div class="mt-1">
				<button
					disabled={opening || gameState.moneybags[moneybag.name].owned === 0}
					class={[
						'btn btn-sm',
						gameState.moneybags[moneybag.name].owned > 0 && [
							'bg-gradient-to-br',
							moneybag.colors.from,
							moneybag.colors.via,
							moneybag.colors.to,
							moneybag.colors.text
						]
					]}
					onclick={openMoneybag}
				>
					Open
				</button>
				<button
					disabled={gameState.moneybags[moneybag.name].owned === gameState.maxEachMoneybag ||
						gameState.coins < gameState.moneybags[moneybag.name].marketHistory[MarketDataLastIndex]}
					class="btn btn-sm not-disabled:btn-success"
					onclick={buyMoneybag}
				>
					Buy
				</button>
				<button
					disabled={gameState.moneybags[moneybag.name].owned === 0}
					class="btn btn-sm not-disabled:btn-error"
					onclick={sellMoneybag}
				>
					Sell
				</button>
			</div>
		</div>
	</div>
	<div class="relative h-40 max-w-1/3 grow">
		{#if showWheel === null}
			<div class="absolute top-0 right-0 h-full w-full" transition:blur={{ duration: 200 }}>
				<MoneybagSparkline {moneybag} />
			</div>
		{:else}
			<div class="absolute top-0 right-0 h-full" transition:blur={{ duration: 200 }}>
				{#if showGain !== null}
					<div
						class="fade-move text-success absolute right-0 left-0 z-10 mx-auto w-fit text-base font-bold"
					>
						{showGain}
					</div>
				{/if}
				<LuckyWheel pointerAt={showWheel} {moneybag} />
			</div>
		{/if}
	</div>
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
