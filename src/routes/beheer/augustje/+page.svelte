<script lang="ts">
	import { Augustjerecord, Augustjesmodal } from '$lib/components/index.js';
	import type { Augustje } from '../../api/augustjes/+server';
	import { FilePlus } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;

	let geselecteerd_augustje: Augustje | null = null;
	let dialog: HTMLDialogElement;

	const { form, enhance, errors, delayed } = superForm(data.form, {
		onUpdated: ({ form }) => {
			if (form.valid) {
				geselecteerd_augustje = null;
				dialog.close();
				toast.success('Augustje succesvol aangepast.', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
			}
		},
		onError: () => {
			geselecteerd_augustje = null;
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

<Augustjesmodal
	{enhance}
	{errors}
	{delayed}
	bind:dialog
	bind:geselecteerd_augustje
	gebruiker={data.gebruiker}
/>
<div class="flex flex-col gap-10 items-center mt-5 overflow-x-auto w-full">
	<button class="btn" on:click={open_modal}>
		<FilePlus class="h-4 w-4" /> Nieuw Augustje
	</button>
	<div class="flex flex-col min-h-[calc(100vh-64px)] gap-2 items-center">
		{#await data.augustjes}
			<div class="flex flex-col gap-4 w-52">
				<div class="skeleton h-32 w-full" />
				<div class="skeleton h-4 w-28" />
				<div class="skeleton h-4 w-full" />
				<div class="skeleton h-4 w-full" />
			</div>
		{:then augustjes}
			{#if augustjes.length == 0}
				<h1>Geen Augustjes om weer te geven</h1>
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
						{#each augustjes as augustje (augustje.id)}
							<Augustjerecord bind:dialog bind:geselecteerd_augustje {augustje} />
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
