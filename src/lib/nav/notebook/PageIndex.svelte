<script lang="ts">
	import QuestionMark from '@tabler/icons-svelte/icons/question-mark';

	import { gameState } from '$lib/gameState/gamestate.svelte';
	import { moneybags } from '$lib/gameState/moneybags';
	import { navState } from '$lib/gameState/navstate.svelte';
</script>

<h3 class="mb-2 text-xl font-bold md:text-2xl">Companies</h3>
<div class="flex flex-col items-start">
	{#each moneybags as moneybag (moneybag.name)}
		<button
			class="btn md:btn-lg btn-ghost flex h-auto w-full items-center justify-start gap-1 p-1 sm:gap-2"
			disabled={!gameState.moneybags[moneybag.name].unlocked}
			onclick={() => {
				if (gameState.moneybags[moneybag.name].unlocked) {
					navState.modalPage = `notebook/mb/${moneybag.name}`;
				}
			}}
		>
			<div
				class={[
					'rounded-box flex aspect-square size-8 items-center justify-center bg-linear-to-br md:size-10',
					gameState.moneybags[moneybag.name].unlocked ? moneybag.colors.text : 'text-white',
					gameState.moneybags[moneybag.name].unlocked ? moneybag.colors.from : 'from-gray-600',
					gameState.moneybags[moneybag.name].unlocked ? moneybag.colors.via : '',
					gameState.moneybags[moneybag.name].unlocked ? moneybag.colors.to : 'to-gray-600'
				]}
			>
				{#if gameState.moneybags[moneybag.name].unlocked && moneybag.icon}
					<moneybag.icon class="size-5 md:size-6" />
				{:else}
					<QuestionMark class="size-5 md:size-6" />
				{/if}
			</div>
			<div>{gameState.moneybags[moneybag.name].unlocked ? moneybag.name : '???'}</div>
		</button>
	{/each}
</div>
