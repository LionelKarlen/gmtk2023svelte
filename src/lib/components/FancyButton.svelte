<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let assetName: string;
	export let reactive = true;
	let status: 'normal' | 'hover' | 'click' = 'normal';
	let numberedStatus = translateStatus();
	$: status, (numberedStatus = translateStatus());
	function translateStatus() {
		if (!reactive) return 1;
		switch (status) {
			case 'click':
				return 2;
			case 'hover':
				return 3;
			default:
				return 1;
		}
	}

	const dispatch = createEventDispatcher();

	function handleClick() {
		if (reactive) {
			dispatch('click');
		}
	}
</script>

<button
	on:mouseenter={() => (status = 'hover')}
	on:focus
	on:mouseleave={() => (status = 'normal')}
	on:mousedown={() => (status = 'click')}
	on:click={() => {
		status = 'click';
		handleClick();
	}}
>
	<img src={`/assets/ui/${assetName}${numberedStatus}.png`} alt="" />
</button>

<style>
	button {
		image-rendering: pixelated;
		background-repeat: no-repeat;
	}
</style>
