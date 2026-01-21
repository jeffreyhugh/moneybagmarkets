<script lang="ts">
	import type { Moneybag_t } from '$lib/gameState/moneybags';
	import { RAD2DEG } from '$lib/RAD2DEG';

	const getCoordinatesForPercent = (percent: number) => {
		const x = Math.cos(2 * Math.PI * percent);
		const y = Math.sin(2 * Math.PI * percent);
		return [x, y];
	};

	const { moneybag, pointerAt }: { moneybag: Moneybag_t; pointerAt: number } = $props();

	// svelte-ignore state_referenced_locally
	const slices = [...moneybag.open].sort((a, b) => a.chance - b.chance);

	// svelte-ignore state_referenced_locally
	const angle = pointerAt * 2 * Math.PI;
	const radius = 1;

	const pointerData = $state({
		tipX: radius * Math.cos(angle) * 0.9,
		tipY: radius * Math.sin(angle) * 0.9
	});

	const pathDatas = $state(
		[] as {
			arcFlag: 0 | 1;
			data: string;
			color: string;
		}[]
	);

	let cumulativePercent = 0;
	for (let i = 0; i < slices.length; i++) {
		const sec = slices[i];
		const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
		cumulativePercent += sec.chance;
		const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
		const ret = {} as (typeof pathDatas)[0];
		ret.arcFlag = sec.chance > 0.5 ? 1 : 0;
		// svelte-ignore state_referenced_locally
		ret.color = moneybag.colors.wheelColors[i];
		ret.data = `M ${startX} ${startY} A 1 1 0 ${ret.arcFlag} 1 ${endX} ${endY} L 0 0`;
		pathDatas.push(ret);
	}

	const initialRotation = 360 * 3 + Math.random() * 360;
</script>

<svg
	class="color-changing-box aspect-square h-full w-auto"
	viewBox="-1.2 -1.2 2.4 2.4"
	style={`transform: rotate(${-angle * RAD2DEG - 90}deg)`}
>
	<g class="unwind" style={`--initial-rotation:${initialRotation}deg;`}>
		{#each pathDatas as pathData (pathData.data)}
			<path d={pathData.data} fill={pathData.color} />
		{/each}
	</g>
	<polygon
		points="0,0 0.05,-0.15 -0.05,-0.15"
		class="fill-base-content"
		transform={`translate(${pointerData.tipX}, ${pointerData.tipY}) rotate(${angle * RAD2DEG + 90})`}
	/>
</svg>

<style>
	.unwind {
		animation: kfUnwind 2s cubic-bezier(0.33, 1, 0.68, 1) forwards;
	}

	@keyframes kfUnwind {
		from {
			rotate: var(--initial-rotation);
		}
		to {
			rotate: 0deg;
		}
	}
</style>
