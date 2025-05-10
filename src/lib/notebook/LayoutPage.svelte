<script lang="ts">
	import { blur } from 'svelte/transition';

	const { children } = $props();
</script>

<div class="col-start-1 row-start-1 h-120" transition:blur={{ duration: 200 }}>
	{@render children()}
</div>
