<script>
	import { save, settingsState } from '$lib/gameState/settingsState.svelte';
</script>

<!-- <h3 class="mb-2 text-xl font-bold md:text-2xl">General</h3> -->
<div class="flex flex-col items-stretch">
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
