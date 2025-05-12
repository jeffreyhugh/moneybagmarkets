<script lang="ts">
	import Marquee from 'svelte-fast-marquee';

	const { children } = $props();
</script>

<div
	class="group fade border-base-content mt-2 flex max-w-full gap-2 overflow-hidden border border-y p-1"
>
	<Marquee gap="2rem" speed={50} class="h-4 md:h-6">
		{@render children()}
		{@render children()}
		{@render children()}
		{@render children()}
		{@render children()}
	</Marquee>
</div>

<style>
	.fade {
		mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
	}
</style>
