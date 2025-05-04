<!-- c/o https://github.com/Mitcheljager/svelte-confetti/blob/a0a27505c7b2c4b854fbcb2a6e067d75b96c294e/src/routes/ToggleConfetti.svelte -->

<script lang="ts">
	import { tick, type Snippet } from 'svelte';

	const {
		disabled = false,
		toggleOnce = false,
		confetti,
		children
	}: {
		disabled?: boolean;
		toggleOnce?: boolean;
		relative?: boolean;
		confetti: Snippet;
		children: Snippet;
	} = $props();

	let active = $state(true);

	async function click() {
		if (toggleOnce) {
			active = !active;
			return;
		}

		active = false;
		await tick();
		active = true;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span onclick={click} class="relative">
	{@render children()}

	{#if active}
		<div class="confetti">
			{@render confetti()}
		</div>
	{/if}
</span>

<style>
	.relative {
		position: relative;
	}

	.relative .confetti {
		position: absolute;
		top: 50%;
		left: 50%;
	}
</style>
