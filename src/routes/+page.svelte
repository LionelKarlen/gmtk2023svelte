<script>
	import { goto } from '$app/navigation';
	import FancyButton from '$lib/components/FancyButton.svelte';
</script>

<div class="game flex flex-col items-center h-full justify-evenly">
	<FancyButton assetName="OSCILLATOR" reactive={false} />
	<FancyButton
		assetName="gamestart"
		on:click={() => {
			goto('/levels');
		}}
	/>
	
	<FancyButton
		assetName="CREDITS"
		on:click={() => {
			goto('/credits');
		}}
	/>
	

	<div class="topControl flex flex-row justify-around">
		<FancyButton
		assetName="gamestart"
		on:click={() => {
			goto('/tutorial');
		}}
	/>
	</div>

	
</div>


<style>

.topControl {
	position: absolute;
	top: 10%;
	right: 10%;
}
</style>