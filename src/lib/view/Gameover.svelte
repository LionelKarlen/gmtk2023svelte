<script lang="ts">
	import { goto } from '$app/navigation';
	import FancyButton from '$lib/components/FancyButton.svelte';
	import { createEventDispatcher } from 'svelte';

	export let won: boolean;
	const dispatch = createEventDispatcher();
</script>

<div class="game flex flex-col items-center h-full justify-evenly">
	{#if won}
		<FancyButton assetName="LEVELCLEAR" reactive={false} />
	{:else}
		<FancyButton assetName="LEVELFAIL" reactive={false} />
	{/if}
	<div class="flex flex-row">
		<FancyButton
			assetName={'Retry'}
			on:click={() => {
				dispatch("retry");
			}}
		/>
		<FancyButton
			assetName={'MenuReturn'}
			on:click={async () => {
				await goto('/levels');
				// location.reload();
			}}
		/>
		<FancyButton
			assetName={'NxtLvl'}
			on:click={() => {
				dispatch('nextLevel');
			}}
		/>
	</div>
</div>
