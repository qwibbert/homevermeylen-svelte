<script lang="ts">
	import { VerslagModal, Verslagrecord } from '$lib/components';
	import type { Verslag } from '../../api/verslagen/+server';
	import { FilePlus } from 'lucide-svelte';
	import type { PageData } from './$types.js';
	import { superForm } from 'sveltekit-superforms/client';
	import toast from 'svelte-french-toast';

	export let data: PageData;

	let geselecteerd_verslag: Verslag | null = null;
	let dialog: HTMLDialogElement;

	const { form, enhance, errors, delayed } = superForm(data.form, {
		onUpdated: ({ form }) => {
			if (form.valid) {
				geselecteerd_verslag = null;
				dialog.close();
				toast.success('Verslag succesvol aangepast.', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
			}
		},
		onError: () => {
			geselecteerd_verslag = null;
			dialog.close();
			toast.error('Er is een fout opgetreden.', {
				style: 'border-radius: 200px; background: #333; color: #fff;'
			});
		},
		delayMs: 500,
		timeoutMs: 8000
	});

	const open_modal = () => {
		dialog.showModal();
	};
</script>

<VerslagModal
	{form}
	{enhance}
	{errors}
	{delayed}
	bind:dialog
	bind:geselecteerd_verslag
	gebruiker={data.gebruiker}
/>
<div class="flex flex-col gap-10 items-center mt-5 overflow-x-auto w-full">
	<button class="btn" on:click={open_modal}>
		<FilePlus class="h-4 w-4" /> Nieuw Verslag
	</button>
	<div class="flex flex-col min-h-[calc(100vh-64px)] gap-2 items-center">
		{#await data.verslagen}
			<div class="flex flex-col gap-4 w-52">
				<div class="skeleton h-32 w-full" />
				<div class="skeleton h-4 w-28" />
				<div class="skeleton h-4 w-full" />
				<div class="skeleton h-4 w-full" />
			</div>
		{:then verslagen}
			{#if verslagen.length == 0}
				<h1>Geen verslagen om weer te geven</h1>
			{:else}
				<table class="table w-full">
					<thead>
						<tr>
							<th>Acties</th>
							<th>Naam</th>
							<th>Bestand</th>
							<th>Publicatiedatum</th>
						</tr>
					</thead>
					<tbody>
						{#each verslagen as verslag (verslag.id)}
							<Verslagrecord bind:dialog bind:geselecteerd_verslag {verslag} />
						{/each}
					</tbody>

					<tfoot>
						<tr>
							<th>Acties</th>
							<th>Naam</th>
							<th>Bestand</th>
							<th>Publicatiedatum</th>
						</tr>
					</tfoot>
				</table>
			{/if}
		{:catch error}
			<h1>error</h1>
		{/await}
	</div>
</div>
