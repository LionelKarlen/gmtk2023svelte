<script>
	import { goto } from '$app/navigation';
	import FancyButton from '$lib/components/FancyButton.svelte';
</script>

<div class="game flex flex-col items-center h-full justify-evenly">
	<div class="flex flex-row">
		<FancyButton assetName={'gamestart'} reactive={false} />
	</div>
	<div class="flex flex-col">
		<div class="flex flex-row">
			{#each { length: 5 } as item, i}
				<FancyButton
					assetName={'LVL' + (i + 1).toString()}
					on:click={() => {
						goto('/game/' + (i + 1), { replaceState: true, invalidateAll: true });
					}}
				/>
			{/each}
		</div>
		<div class="flex flex-row">
			{#each { length: 5 } as item, i}
				<FancyButton
					assetName={'LVL' + (i + 6).toString()}
					on:click={() => {
						goto('/game/' + (i + 6), { replaceState: true, invalidateAll: true });
					}}
				/>
			{/each}
		</div>
	</div>
	<div class="flex flex-row">
		<FancyButton
			assetName={'infinite'}
			on:click={() => {
				goto('/game/' + Date.now(), { replaceState: true, invalidateAll: true });
			}}
		/>
	</div>
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