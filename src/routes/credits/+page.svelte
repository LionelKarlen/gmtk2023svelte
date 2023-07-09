<script>
	import { goto } from '$app/navigation';
	import FancyButton from '$lib/components/FancyButton.svelte';
</script>

<div class="game flex flex-col items-center h-full justify-evenly">
	<FancyButton assetName="Credits" reactive={false} />
	<div class="topControl flex flex-row justify-around">
		<FancyButton assetName="MenuReturnGameplay" on:click={() => goto('/')} />
	</div>
</div>

<style>
	.topControl {
		position: absolute;
		top: 10%;
		left: 10%;
	}
</style>
