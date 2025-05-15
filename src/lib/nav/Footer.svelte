<script lang="ts">
	import Home from '@tabler/icons-svelte/icons/home';
	import Notebook from '@tabler/icons-svelte/icons/notebook';
	import Settings from '@tabler/icons-svelte/icons/settings';

	import { navState } from '../gameState/navstate.svelte';
	import FooterIcon from './FooterIcon.svelte';
</script>

<div
	role="tablist"
	class={[
		'tabs tabs-border',
		'border-base-content/20 fixed bottom-0 left-1/2 z-20 h-12 w-full max-w-2xl -translate-x-1/2 border-t bg-transparent backdrop-blur-2xl',
		'sm:text-xl',
		'sm:rounded-t-box sm:w-5/6 sm:border-x sm:border-t',
		navState.modalPage !== '' && 'sm:border-base-content/20 border-transparent'
	]}
>
	<FooterIcon location="notebook">
		<Notebook class="size-6" />
	</FooterIcon>
	<FooterIcon location="" strict>
		<Home class="size-6" />
	</FooterIcon>
	<FooterIcon location="settings">
		<Settings class="size-6" />
	</FooterIcon>
	<!-- <FooterIcon location="notebook">
	</FooterIcon>
	<button
		class={['btn btn-square btn-lg btn-ghost grow', navState.modalPage === '' && 'btn-active']}
		onclick={() => (navState.modalPage = '')}
	>
		<Home class="size-6" />
	</button>
	<button
		class={[
			'btn btn-square btn-lg btn-ghost grow',
			navState.modalPage.startsWith('settings') && 'btn-base'
		]}
		onclick={() => (navState.modalPage = 'settings')}
	>
		<Settings class="size-6" />
	</button> -->
</div>
