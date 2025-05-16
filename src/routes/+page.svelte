<script lang="ts">
	import Hourglass from '@tabler/icons-svelte/icons/hourglass';
	import PigMoney from '@tabler/icons-svelte/icons/pig-money';
	import { theme } from 'mode-watcher';
	import { onMount } from 'svelte';

	import { browser } from '$app/environment';
	import { coinEvents } from '$lib/coinEvents.svelte';
	import {
		gameLoop,
		gameState,
		loadedEvents,
		loadGameState,
		migrateGameState
	} from '$lib/gameState/gamestate.svelte';
	import { downloadEvents } from '$lib/gameState/headlines';
	import { moneybags } from '$lib/gameState/moneybags';
	import { navState } from '$lib/gameState/navstate.svelte';
	import { loadSettingsState, settingsState } from '$lib/gameState/settingsState.svelte';
	import BreakingNews from '$lib/headline/BreakingNews.svelte';
	import Headline from '$lib/headline/Headline.svelte';
	import HeadlineBanner from '$lib/headline/HeadlineBanner.svelte';
	import Moneybag from '$lib/moneybag/Moneybag.svelte';
	import Footer from '$lib/nav/Footer.svelte';
	import NotebookRoot from '$lib/nav/notebook/NotebookRoot.svelte';
	import SettingsRoot from '$lib/nav/settings/SettingsRoot.svelte';
	import { numberFormatOptions } from '$lib/numberFormatOptions';

	let initializing = $state(true);

	onMount(() => {
		if (!browser) {
			return;
		}
		return gameLoop();
	});
	onMount(async () => {
		if (!browser) {
			return;
		}

		await loadSettingsState();
		await loadGameState();
		migrateGameState();
		initializing = false;
	});
	onMount(() => {
		if (!browser) {
			return;
		}
		downloadEvents();
	});
</script>

<svelte:head>
	{#if theme.current === 'light'}
		<meta name="theme-color" content="#ffffff" />
	{:else}
		<meta name="theme-color" content="#000000" />
	{/if}
</svelte:head>

{#if initializing}
	<div class="flex h-full w-full items-center justify-center gap-1">
		<Hourglass />
		<div>Loading...</div>
	</div>
{:else}
	<div
		class="border-base-content/20 sticky top-0 z-30 mb-2 border-b py-2 backdrop-blur-2xl select-none"
	>
		<div class="mx-auto flex w-11/12 max-w-4xl items-center justify-between gap-1">
			<div>
				<label class="label ml-2">
					<input type="checkbox" bind:checked={settingsState.compactView} class="toggle" />
					Compact View
				</label>
			</div>
			<div class="relative top-0 mr-2 flex items-center justify-end gap-1 text-xl md:text-2xl">
				<div class="relative flex items-center gap-1">
					<PigMoney class="size-6 md:size-7" />
					{gameState.coins.toLocaleString(undefined, numberFormatOptions)}
					{#each coinEvents.events as e (e.id)}
						<div
							class={[
								'fade-move absolute right-0 left-0 z-10 mx-auto w-fit text-base font-bold md:text-lg',
								(e.sign === '+' || e.sign === 'x') && 'text-success',
								e.sign === '-' && 'text-error'
							]}
						>
							{e.sign}{e.value}{e.suffix || ''}
						</div>
					{/each}
				</div>
				<!-- <button
					class="btn btn-ghost btn-square md:ml-3"
					type="button"
					onclick={() => {
						navState.modalDialog?.showModal();
						navState.modalPage = 'notebook';
					}}
				>
					<NotebookIcon class="size-6 md:size-7" />
				</button> -->
			</div>
		</div>
		<div class="mx-auto w-11/12 max-w-4xl">
			<div class="relative">
				<HeadlineBanner>
					{#each gameState.events as event, i (event.id)}
						<Headline
							className={i === gameState.events.length - 1 ? 'font-bold' : ''}
							headline={event.headline}
						/>
					{/each}
				</HeadlineBanner>
				<BreakingNews enabled={loadedEvents.events.length > 0} />
			</div>
		</div>
	</div>
	<div class="mx-auto w-11/12 max-w-4xl">
		<div class={['grid grid-cols-1 gap-2', settingsState.compactView && 'md:grid-cols-2']}>
			{#each moneybags as moneybag (moneybag.name)}
				{#if moneybag.name in gameState.moneybags}
					<Moneybag {moneybag} />
				{/if}
			{/each}
		</div>
	</div>
	<dialog
		bind:this={navState.modalDialog}
		class="modal modal-bottom sm:modal-middle sm:translate-y-0"
		onclose={() => {
			navState.modalPage = '';
		}}
	>
		{#if navState.modalPage.startsWith('notebook')}
			<NotebookRoot />
		{:else if navState.modalPage.startsWith('settings')}
			<SettingsRoot />
		{/if}

		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>

		<Footer />
	</dialog>
{/if}

<style>
	.modal {
		/* &.modal-open, */
		&[open],
		&:target {
			background-color: transparent;
		}
	}

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
