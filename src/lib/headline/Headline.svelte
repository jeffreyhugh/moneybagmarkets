<script lang="ts">
	import DemographicIcon from './DemographicIcon.svelte';
	import MoneybagIcon from './MoneybagIcon.svelte';

	const { headline, className }: { headline: string; className: string } = $props();

	const splitHeadline = (headline: string) => {
		const parts: string[] = [];
		let remaining = headline;

		while (remaining.length > 0) {
			const mbMatch = remaining.match(/^(\[\[[^[\]]+\]\])/);
			if (mbMatch) {
				parts.push(mbMatch[1]);
				remaining = remaining.slice(mbMatch[1].length);
				continue;
			}

			const demoMatch = remaining.match(/^(\{\{[A-Z_]+\}\})/);
			if (demoMatch) {
				parts.push(demoMatch[1]);
				remaining = remaining.slice(demoMatch[1].length);
				continue;
			}

			const nextIconIndex = remaining.search(/\[\[|\{\{/);
			if (nextIconIndex === -1) {
				parts.push(remaining);
				break;
			}

			parts.push(remaining.slice(0, nextIconIndex));
			remaining = remaining.slice(nextIconIndex);
		}

		return parts.map((s) => s.trim()).filter((part) => part.length > 0);
	};

	const headlineParts = $derived(splitHeadline(headline));
</script>

<div class={['flex items-center gap-1 text-sm italic md:text-base', className]}>
	{#each headlineParts as part, i (i)}
		{#if part.startsWith('{{')}
			<DemographicIcon {part} />
		{:else if part.startsWith('[[')}
			<MoneybagIcon {part} />
		{:else}
			<div class="text-nowrap">{part}</div>
		{/if}
	{/each}
</div>
