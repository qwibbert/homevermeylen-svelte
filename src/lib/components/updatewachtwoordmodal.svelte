<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import Input from './input.svelte';
	import { invalidateAll } from '$app/navigation';

	interface Props {
		dialog: HTMLDialogElement;
		gebruiker: any;
	}

	let { dialog = $bindable(), gebruiker }: Props = $props();

	let loading = $state(false);
	let disabled = true;

	let oud_veld: HTMLInputElement = $state();
	let nieuw_veld: HTMLInputElement = $state();
	let herhaal_veld: HTMLInputElement = $state();

	const inputEvent = () => {
		if (oud_veld?.value && nieuw_veld?.value == herhaal_veld?.value && nieuw_veld?.value != '') {
			disabled = false;
		} else {
			disabled = true;
		}
	};

	const updateWachtwoord = () => {
		loading = true;

		return async ({ result, update }: { result: any; update: any }) => {
			switch (result.type) {
				case 'success':
					toast.success('Wachtwoord succesvol aangepast.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					await update();
					break;
				case 'invalid':
					toast.error('Aanpassen wachtwoord mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					await update();
					break;
				case 'error':
					toast.error('Aanpassen wachtwoord mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					break;
				default:
					await update();
			}
			loading = false;
			sluitModal();
			throw invalidateAll();
		};
	};

	const sluitModal = () => {
		dialog.close();
	};
</script>

<dialog bind:this={dialog} class="modal modal-scroll h-max" oncancel={sluitModal}>
	<form
		use:enhance={updateWachtwoord}
		method="post"
		action="?/update_wachtwoord"
		enctype="multipart/form-data"
		class="modal-box flex flex-col space-y-5 text-center"
	>
		<h3 class="text-center font-bold text-lg">Update Wachtwoord</h3>
		<input type="hidden" name="id" value={gebruiker?.id} />
		<Input
			id="oldPassword"
			bind:binding={oud_veld}
			label="Oud Wachtwoord"
			required
			on:change={inputEvent}
			placeholder="Geef hier je oud wachtwoord in."
			errors={null}
		/>
		<Input
			id="password"
			bind:binding={nieuw_veld}
			label="Nieuw Wachtwoord"
			required
			on:change={inputEvent}
			placeholder="Geef hier je nieuw wachtwoord in."
			errors={null}
		/>
		<Input
			id="passwordConfirm"
			bind:binding={herhaal_veld}
			on:change={inputEvent}
			label="Herhaal Wachtwoord"
			placeholder="Geef hier opnieuw je wachtwoord in."
			errors={null}
		/>

		<div class="modal-action">
			<button type="submit" formnovalidate formmethod="dialog" class="btn btn-ghost"
				>Annuleer</button
			>
			<button type="submit" class={`btn btn-outline ${loading ? 'loading loading-spinner' : ''}`}
				>Opslaan</button
			>
		</div>
	</form>
</dialog>
