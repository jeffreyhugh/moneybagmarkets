<script lang="ts">
	import type { Snippet } from 'svelte';
	import Confetti from 'svelte-confetti';

	import type { Moneybag_t } from './gameState/moneybags';
	import ToggleConfetti from './ToggleConfetti.svelte';

	const { moneybag, children }: { moneybag: Moneybag_t; children: Snippet } = $props();
</script>

<ToggleConfetti {confetti}>
	{@render children()}
</ToggleConfetti>

{#snippet confetti()}
	<Confetti x={[-1, 1]} y={[0.2, 0.5]} amount={20} colorArray={moneybag.colors.confetti} />
{/snippet}
