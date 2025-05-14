<script lang="ts">
	import QuestionMark from '@tabler/icons-svelte/icons/question-mark';

	import { moneybags } from '$lib/gameState/moneybags';

	const { part }: { part: string } = $props();

	const mbName = $derived(part.slice(2, -2));

	const moneybag = moneybags.find((mb) => mb.name === mbName);
</script>

{#if moneybag && moneybag.icon}
	<moneybag.icon class="size-5" />
{:else}
	<QuestionMark class="size-5" />
{/if}
