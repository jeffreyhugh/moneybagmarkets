<script>
	import { IconMoon, IconSun } from '@tabler/icons-svelte';
	import { setMode, setTheme, theme } from 'mode-watcher';
</script>

<div class="mb-8 w-full flex-col items-stretch gap-2">
	<div class="flex justify-end">
		<button
			class="btn btn-ghost btn-circle m-2 text-xl"
			onclick={() => {
				if (theme.current === 'dark') {
					setMode('light');
					setTheme('light');
				} else {
					setMode('dark');
					setTheme('dark');
				}
			}}
		>
			{#if theme.current === 'light'}
				<IconSun />
			{:else}
				<IconMoon />
			{/if}
		</button>
	</div>
	<div class="text-center">
		<a
			href="/"
			class="text-vibrant p-2 text-center text-4xl leading-tight font-bold text-transparent select-none md:text-6xl md:leading-snug"
		>
			moneybag.markets
		</a>
	</div>
</div>
