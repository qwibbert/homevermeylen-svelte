<script lang="ts">
	import type { PageData } from './$types';
	import DataTable from './data_table.svelte';

	export let data: PageData;
</script>


	{#await data.fakkels_bakken then fakkels_bakken}
		<DataTable fakkels_bakken_form={data.fakkels_bakken_form} {fakkels_bakken} />
	{/await}

