<script lang="ts">
	import Moneybag from '@tabler/icons-svelte/icons/moneybag';
	import PigMoney from '@tabler/icons-svelte/icons/pig-money';
	import TrendingDown from '@tabler/icons-svelte/icons/trending-down';
	import TrendingUp from '@tabler/icons-svelte/icons/trending-up';
	import { blur } from 'svelte/transition';
	import Confetti from 'svelte-confetti';

	import { coin } from '$lib/coinEvents.svelte';
	import { gameState } from '$lib/gameState/gamestate.svelte';
	import type { Moneybag_t } from '$lib/gameState/moneybags';
	import { settingsState } from '$lib/gameState/settingsState.svelte';
	import { handleChoice } from '$lib/handleChoice.svelte';
	import { weightedChoice } from '$lib/moneybag/weightedChoice';
	import { numberFormatOptions } from '$lib/numberFormatOptions';

	import Locker from './Locker.svelte';
	import LuckyWheel from './LuckyWheel.svelte';
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

	const openMoneybag = async () => {
		if (gameState.moneybags[moneybag.name].owned === 0) {
			return;
		}

		opening = true;

		gameState.moneybags[moneybag.name].owned -= 1;

		const [choice, random] = weightedChoice(moneybag.open);

		if (!choice) {
			opening = false;
			return;
		}

		showWheel = random;
		await new Promise((resolve) => setTimeout(resolve, 2200));

		showGain = handleChoice(moneybag, choice);
		if (gameState.bonusSnacks > 0) {
			gameState.bonusSnacks -= 1;
			openBonusSnack();
		}

		await new Promise((resolve) => setTimeout(resolve, 500));
		showGain = null;
		showWheel = null;

		await new Promise((resolve) => setTimeout(resolve, 200));
		opening = false;
	};

	const openBonusSnack = async () => {
		const [choice] = weightedChoice(moneybag.open);

		if (!choice) {
			opening = false;
			return;
		}

		await new Promise((resolve) => setTimeout(resolve, 250));

		showGain = handleChoice(moneybag, choice);
	};

	const addDiscovery = (cost: number) => {
		if ((gameState.moneybags[moneybag.name].discoveries.min ?? Infinity) > cost) {
			gameState.moneybags[moneybag.name].discoveries.min = cost;
		}

		if ((gameState.moneybags[moneybag.name].discoveries.max ?? -Infinity) < cost) {
			gameState.moneybags[moneybag.name].discoveries.max = cost;
		}
	};

	const buyMoneybag = () => {
		const cost = gameState.moneybags[moneybag.name].marketHistory[MarketDataLastIndex];
		addDiscovery(cost);
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
		addDiscovery(cost);
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
	class="rounded-box border-base-300 relative flex flex-col items-stretch justify-between border p-4 select-none md:flex-row"
>
	{#if gameState.moneybags[moneybag.name].unlocked}
		<div class="absolute top-1/2 left-1/2">
			<Confetti x={[-0.4, 0.4]} y={[0.2, 0.5]} amount={30} colorArray={moneybag.colors.confetti} />
		</div>
	{/if}
	{#if !gameState.moneybags[moneybag.name].unlocked}
		<Locker {moneybag} />
	{/if}
	<div class="flex items-center gap-4">
		<div class="grid aspect-square size-20 grid-cols-1 grid-rows-1 md:size-24">
			{#if settingsState.compactView && showWheel !== null}
				<div
					class="pointer-events-none relative col-start-1 row-start-1"
					transition:blur={{ duration: 200 }}
				>
					{#if showGain !== null}
						<div
							class="fade-move text-success absolute right-0 left-0 z-10 mx-auto w-fit text-base font-bold"
						>
							{showGain}
						</div>
					{/if}
					<LuckyWheel pointerAt={showWheel} {moneybag} />
				</div>
			{:else}
				<div
					class={[
						'col-start-1 row-start-1',
						'rounded-box flex size-full items-center justify-center bg-gradient-to-br',
						moneybag.colors.from,
						moneybag.colors.via,
						moneybag.colors.to,
						moneybag.colors.text
					]}
					transition:blur={{ duration: 200 }}
				>
					{#if moneybag.icon}
						<moneybag.icon class="size-12 md:size-16" />
					{:else}
						<Moneybag class="size-12 md:size-16" />
					{/if}
				</div>
			{/if}
		</div>
		<div class="flex flex-col">
			<div class="text-xl font-bold md:text-2xl">{moneybag.name}</div>
			<div class="flex items-center gap-1">
				<span class="font-bold">
					{gameState.moneybags[moneybag.name].owned}/{gameState.maxEachMoneybag}
				</span>
				{#if !settingsState.compactView}owned{/if} &middot; <PigMoney
					class="inline size-4 md:size-6"
				/>
				{(
					gameState.moneybags[moneybag.name].owned *
					gameState.moneybags[moneybag.name].marketHistory[MarketDataLastIndex]
				).toLocaleString(undefined, numberFormatOptions)}
				{#if settingsState.compactView}
					&middot; <span class="grid grid-cols-1 grid-rows-1">
						{#if gameState.moneybags[moneybag.name].marketHistory[MarketDataLastIndex] >= moneybag.market.target}
							<span class="col-start-1 row-start-1">
								<TrendingUp class="inline size-4" />
							</span>
						{:else}
							<span class="col-start-1 row-start-1">
								<TrendingDown class="inline size-4" />
							</span>
						{/if}
					</span>
					<span class="font-bold">
						{gameState.moneybags[moneybag.name].marketHistory[MarketDataLastIndex].toLocaleString(
							undefined,
							numberFormatOptions
						)}
					</span>
				{/if}
			</div>
			<div class="mt-1">
				<button
					name={`open${moneybag.name}`}
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
					name={`buy${moneybag.name}`}
					disabled={gameState.moneybags[moneybag.name].owned === gameState.maxEachMoneybag ||
						gameState.coins < gameState.moneybags[moneybag.name].marketHistory[MarketDataLastIndex]}
					class="btn btn-sm not-disabled:btn-success"
					onclick={buyMoneybag}
				>
					Buy
				</button>
				<button
					name={`sell${moneybag.name}`}
					disabled={gameState.moneybags[moneybag.name].owned === 0}
					class="btn btn-sm not-disabled:btn-error"
					onclick={sellMoneybag}
				>
					Sell
				</button>
			</div>
		</div>
	</div>
	{#if !settingsState.compactView}
		<div class="relative h-40 grow md:max-w-1/3">
			{#if showWheel === null}
				<div class="absolute top-0 right-0 h-full w-full" transition:blur={{ duration: 200 }}>
					<MoneybagSparkline {moneybag} />
				</div>
			{:else}
				<div
					class="absolute top-0 right-0 flex h-full w-full justify-center"
					transition:blur={{ duration: 200 }}
				>
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
	{/if}
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
