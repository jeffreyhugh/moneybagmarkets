<script lang="ts">
	import Lock from '@tabler/icons-svelte/icons/lock';
	import PigMoney from '@tabler/icons-svelte/icons/pig-money';
	import { fade } from 'svelte/transition';

	import { coin } from '$lib/coinEvents.svelte';
	import { gameState } from '$lib/gameState/gamestate.svelte';
	import type { Moneybag_t } from '$lib/gameState/moneybags';

	import { numberFormatOptions } from '../numberFormatOptions';

	const { moneybag }: { moneybag: Moneybag_t } = $props();

	const unlock = () => {
		if (gameState.coins < moneybag.costToUnlock) {
			return;
		}

		coin('-', moneybag.costToUnlock);
		gameState.coins -= moneybag.costToUnlock;
		gameState.moneybags[moneybag.name].unlocked = true;
	};
</script>

<div
	class="bg-base-200 rounded-box absolute top-0 left-0 z-20 flex h-full w-full cursor-not-allowed flex-col items-center justify-center gap-2"
	out:fade
>
	<div>
		<Lock class="size-8" />
	</div>
	<button
		type="button"
		disabled={gameState.coins < moneybag.costToUnlock}
		class={[
			'btn btn-base btn-lg opacity-100',
			gameState.coins >= moneybag.costToUnlock && [
				'bg-gradient-to-br',
				moneybag.colors.from,
				moneybag.colors.via,
				moneybag.colors.to,
				moneybag.colors.text
			]
		]}
		onclick={unlock}
	>
		Unlock (<PigMoney class="-m-1 opacity-100" />
		{moneybag.costToUnlock.toLocaleString(undefined, numberFormatOptions)})
	</button>
</div>
