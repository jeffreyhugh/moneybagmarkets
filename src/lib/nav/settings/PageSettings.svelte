<script lang="ts">
	import { setMode, setTheme, theme } from 'mode-watcher';

	import { save, settingsState } from '$lib/gameState/settingsState.svelte';
</script>

<!-- <h3 class="mb-2 text-xl font-bold md:text-2xl">General</h3> -->
<div class="flex flex-col items-stretch">
	<div class="flex items-center justify-between">
		<div>Dark Theme</div>
		<input
			type="checkbox"
			class="toggle"
			checked={theme.current === 'dark'}
			onchange={(e) => {
				e.preventDefault();

				if (!e.target) {
					return;
				}

				setMode((e.target as HTMLInputElement).checked ? 'dark' : 'light');
				setTheme((e.target as HTMLInputElement).checked ? 'dark' : 'light');
			}}
		/>
	</div>
	<div class="flex items-center justify-between">
		<div>Compact View</div>
		<input
			type="checkbox"
			class="toggle"
			bind:checked={settingsState.compactView}
			onchange={save}
		/>
	</div>
</div>
