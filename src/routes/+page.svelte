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
		class="border-base-content/20 sticky -top-px z-30 mb-2 border-b py-2 backdrop-blur-2xl select-none"
	>
		<div class="mx-auto flex w-11/12 max-w-4xl items-center justify-end gap-1">
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
							{e.sign}{e.value.toLocaleString(undefined, numberFormatOptions)}{e.suffix || ''}
						</div>
					{/each}
				</div>
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
		class="modal modal-bottom sm:modal-middle"
		onclose={() => {
			navState.modalPage = '';
		}}
	>
		<div
			class="modal-box border-base-content/20 mb-12 overflow-y-auto border-t-2 bg-transparent backdrop-blur-2xl sm:border-2"
			style="border-style:outset;height:calc(var(--spacing) * 160);max-height:calc(var(--spacing) * 160);"
		>
			<div class="grid h-full w-full grid-cols-1 grid-rows-1">
				{#if navState.modalPage.startsWith('notebook')}
					<NotebookRoot />
				{:else if navState.modalPage.startsWith('settings')}
					<SettingsRoot />
				{/if}
			</div>
		</div>

		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>

		<Footer />
	</dialog>
{/if}

<style>
	.modal {
		&[open],
		&:target {
			background-color: transparent;
		}
	}

	.fade-move {
		position: absolute;
		top: -0.25rem;
		opacity: 1;
		animation: fadeMove 1s linear forwards;
	}

	@keyframes fadeMove {
		0% {
			top: -0.25rem;
			opacity: 1;
		}
		100% {
			top: -1.5rem;
			opacity: 0;
		}
	}
</style>
