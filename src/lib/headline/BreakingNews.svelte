<script lang="ts">
	import News from '@tabler/icons-svelte/icons/news';

	import { gameState } from '../../routes/gamestate.svelte';

	const breaking = $derived(gameState.tick % 60 >= 58 || gameState.tick % 60 < 5);
	const headlinesEnabled = $derived(gameState.tick > 55);
</script>

{#if headlinesEnabled && breaking}
	<div
		class="expand bg-warning absolute top-0 left-1/2 flex h-full w-0 -translate-x-1/2 items-center justify-center overflow-hidden text-sm text-nowrap md:text-base"
	>
		<News /> Breaking News
	</div>
{/if}

<style>
	@keyframes expand {
		0% {
			width: 0;
		}

		20% {
			width: 100%;
		}

		80% {
			width: 100%;
		}

		100% {
			width: 0%;
		}
	}

	.expand {
		animation: expand 4000ms forwards ease-in-out;
	}
</style>
