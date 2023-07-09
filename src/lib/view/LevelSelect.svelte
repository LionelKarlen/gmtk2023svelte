<script>
	import FancyButton from '$lib/components/FancyButton.svelte';
</script>

<div class="game flex flex-col items-center h-full justify-evenly">
	<div class="flex flex-row">
		<FancyButton assetName={'gamestart'} reactive={false} />
	</div>
	<div class="flex flex-col">
		<div class="flex flex-row">
			{#each { length: 5 } as item, i}
				<FancyButton assetName={'LVL' + (i + 1).toString()} />
			{/each}
		</div>
		<div class="flex flex-row">
			{#each { length: 5 } as item, i}
				<FancyButton assetName={'LVL' + (i + 6).toString()} />
			{/each}
		</div>
	</div>
	<div class="flex flex-row">
		<FancyButton assetName={'infinite'} />
	</div>
</div>
