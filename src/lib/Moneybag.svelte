<script lang="ts">
	import MoneybagSparkline from './MoneybagSparkline.svelte';

	import { IconMoneybag } from '@tabler/icons-svelte';
	import { gameState } from '../routes/gamestate.svelte';
	import type { Moneybag_t } from '../routes/moneybags';
	import { weightedChoice } from '$lib/weightedChoice';
	import { handleChoices } from '$lib/handleChoice.svelte';
	import LuckyWheel from '$lib/LuckyWheel.svelte';
	import { blur } from 'svelte/transition';
	import Confetti from 'svelte-confetti';
	import Locker from './Locker.svelte';
	import { MarketDataLastIndex } from './marketData';
	import { coin } from '../routes/coinEvents.svelte';

	const MultiplierStops = [1, 5, 10, 100, 1000];

	const { moneybag }: { moneybag: Moneybag_t } = $props();
	let mult = $state({
		index: 0,
		multiplier: MultiplierStops[0]
	});
	let opening = $state(false);
	let showWheel = $state<number | null>(null);
	let showGain = $state<string | null>(null);

	const bumpMultiplier = () => {
		const newIndex = (mult.index + 1) % MultiplierStops.length;
		// if (gameState.moneybags[moneybag.name].owned >= MultiplierStops[newIndex]) {
		mult.index = newIndex;
		mult.multiplier = MultiplierStops[newIndex];
		// } else {
		// mult.index = 0;
		// mult.multiplier = MultiplierStops[0];
		// }
	};

	const openMoneybag = async () => {
		opening = true;
		const choices = [] as ((typeof moneybag.open)[0] | null)[];
		let random = 0;
		for (let i = 0; i < mult.multiplier; i++) {
			if (gameState.moneybags[moneybag.name].owned === 0) {
				opening = false;
				break;
			}

			gameState.moneybags[moneybag.name].owned -= 1;

			const [choice, r] = weightedChoice(moneybag.open);
			if (!choice) {
				break;
			}
			random = r;
			choices.push(choice);
		}

		showWheel = random;
		await new Promise((resolve) => setTimeout(resolve, 2200));

		// showGain = handleChoices(moneybag, choices);
		handleChoices(moneybag, choices);

		await new Promise((resolve) => setTimeout(resolve, 1000));
		showGain = null;
		showWheel = null;
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
	<div class="flex items-center gap-3">
		<div
			class={[
				'rounded-box flex size-18 items-center justify-center bg-gradient-to-br',
				moneybag.colors.from,
				moneybag.colors.via,
				moneybag.colors.to,
				moneybag.colors.text
			]}
		>
			<IconMoneybag class="size-12" />
		</div>
		<div>
			<div class="text-xl font-bold">{moneybag.name}</div>
			<div>
				<span class="font-bold">
					{gameState.moneybags[moneybag.name].owned}/{gameState.maxEachMoneybag}
				</span> owned
			</div>
			<button disabled={opening} class={['btn btn-sm']} onclick={bumpMultiplier}>
				x{mult.multiplier}
			</button>
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
	<div class="relative h-26">
		{#if showWheel === null}
			<div class="absolute top-0 right-0" transition:blur={{ duration: 200 }}>
				<MoneybagSparkline {moneybag} />
			</div>
		{:else}
			<div class="absolute top-0 right-0 h-26" transition:blur={{ duration: 200 }}>
				<!-- {#if showGain !== null}
					<div
						class="fade-move text-vibrant absolute right-0 left-0 z-10 mx-auto w-fit text-sm font-bold"
					>
						{showGain}
					</div>
				{/if} -->
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
