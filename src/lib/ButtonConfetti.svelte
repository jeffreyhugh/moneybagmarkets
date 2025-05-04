<script lang="ts">
	import Confetti from 'svelte-confetti';
	import type { Moneybag_t } from '../routes/moneybags';
	import ToggleConfetti from './ToggleConfetti.svelte';
	import type { Snippet } from 'svelte';

	const {
		moneybag,
		disabled = false,
		children
	}: { moneybag: Moneybag_t; disabled?: boolean; children: Snippet } = $props();
</script>

<ToggleConfetti {disabled} {confetti}>
	{@render children()}
</ToggleConfetti>

{#snippet confetti()}
	<Confetti x={[-1, 1]} y={[0.2, 0.5]} amount={20} colorArray={moneybag.colors.confetti} />
{/snippet}
