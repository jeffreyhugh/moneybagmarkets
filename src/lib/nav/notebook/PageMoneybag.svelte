<script lang="ts">
	import Home from '@tabler/icons-svelte/icons/home';
	import Old from '@tabler/icons-svelte/icons/old';
	import PigMoney from '@tabler/icons-svelte/icons/pig-money';
	import PlayBasketball from '@tabler/icons-svelte/icons/play-basketball';
	import QuestionMark from '@tabler/icons-svelte/icons/question-mark';
	import Rollercoaster from '@tabler/icons-svelte/icons/rollercoaster';
	import RosetteDiscount from '@tabler/icons-svelte/icons/rosette-discount';
	import ShoppingBag from '@tabler/icons-svelte/icons/shopping-bag';
	import Speedboat from '@tabler/icons-svelte/icons/speedboat';
	import Tools from '@tabler/icons-svelte/icons/tools';
	import Walk from '@tabler/icons-svelte/icons/walk';

	import { gameState } from '$lib/gameState/gamestate.svelte';
	import { Demographics_t as DEM } from '$lib/gameState/headlines';
	import { moneybags, powerupDescriptions } from '$lib/gameState/moneybags';
	import { navState } from '$lib/gameState/navstate.svelte';
	import { numberFormatOptions } from '$lib/numberFormatOptions';

	const mbName = $derived(navState.modalPage.substring('notebook/mb/'.length));
	const moneybag = $derived(moneybags.find((mb) => mb.name === mbName))!;
</script>

<div class="flex items-center gap-3">
	<div
		class={[
			'rounded-box flex aspect-square size-12 items-center justify-center bg-gradient-to-br md:size-16',
			moneybag.colors.text,
			moneybag.colors.from,
			moneybag.colors.via,
			moneybag.colors.to
		]}
	>
		{#if moneybag.icon}
			<moneybag.icon class="size-7 md:size-9" />
		{:else}
			<QuestionMark class="size-7 md:size-9" />
		{/if}
	</div>
	<div>
		<h3 class="text-xl font-bold md:text-2xl">{mbName}</h3>
		{#if moneybag.lore}<p class="italic md:text-lg">{moneybag.lore}</p>{/if}
	</div>
</div>
<div class="divider divider-vertical"></div>
<div class="grow">
	<div class="mt-2 mb-4 grid h-min grid-cols-2 items-center gap-x-4 gap-y-2">
		{@render label('Target Demographics')}
		<div class="flex flex-col gap-1">
			{#each moneybag.applicableDemographics as dem (dem)}
				<div class="flex items-center gap-1 font-bold">
					{#if dem === DEM.AGE_YOUNG}
						<PlayBasketball /> Young Adult
					{:else if dem === DEM.AGE_MID}
						<Walk /> Middle-Aged
					{:else if dem === DEM.AGE_OLD}
						<Old /> Retired
					{:else if dem === DEM.MONEY_LOWER}
						<RosetteDiscount /> Lower-Class
					{:else if dem === DEM.MONEY_MID}
						<Home /> Middle-Class
					{:else if dem === DEM.MONEY_RICH}
						<Speedboat /> Upper-Class
					{/if}
				</div>
			{/each}
		</div>

		{@render label('Moneybag Type')}
		<div>
			{#each moneybag.applicableDemographics as dem (dem)}
				<div class="flex items-center gap-1 font-bold">
					{#if dem === DEM.TYPE_GOOD}
						<ShoppingBag /> Goods
					{:else if dem === DEM.TYPE_SERVICE}
						<Tools /> Service
					{:else if dem === DEM.TYPE_ESTABLISHMENT}
						<Rollercoaster /> Establishment
					{/if}
				</div>
			{/each}
		</div>

		{@render label('Market Range')}
		<div class="flex items-center gap-1 font-bold">
			<PigMoney />
			{gameState.moneybags[mbName].discoveries.min?.toLocaleString(
				undefined,
				numberFormatOptions
			) ?? '???'} - {gameState.moneybags[mbName].discoveries.max?.toLocaleString(
				undefined,
				numberFormatOptions
			) ?? '???'}
		</div>

		{@render label('Powerups')}
		<div class="flex flex-col gap-1">
			{#if gameState.moneybags[mbName].discoveries.powerups.length === 0}
				<div class="font-bold">None discovered</div>
			{/if}
			<ul>
				{#each gameState.moneybags[mbName].discoveries.powerups as powerup (powerup)}
					<div class="ml-4 -indent-4 font-bold">{powerupDescriptions[powerup]}</div>
				{/each}
			</ul>
		</div>
	</div>
</div>
<button onclick={() => (navState.modalPage = 'notebook')} class="btn btn-outline md:btn-lg">
	Home
</button>

{#snippet label(text: string)}
	<div class="place-self-end self-start text-end text-base italic md:text-lg">{text}</div>
{/snippet}
