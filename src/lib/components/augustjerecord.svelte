<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Augustje } from '$lib/types';
	import { Edit, Trash, File } from 'lucide-svelte';
	import toast from 'svelte-french-toast';

	export let augustje: Augustje;
	export let dialog: HTMLDialogElement;
	export let geselecteerd_augustje: Augustje | null;
	let loading = false;

	const bewerk_augustje = () => {
		geselecteerd_augustje = augustje;
		dialog.showModal();
	};

	const verwijder_augustje = () => {
		loading = true;

		return async ({ result, update }: { result: any; update: any }) => {
			switch (result.type) {
				case 'success':
					toast.success('Verwijdering voltooid.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					await update();
					break;
				case 'invalid':
					toast.error('Verwijdering mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					await update();
					break;
				case 'error':
					toast.error('Verwijdering mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<tr>
	<td>
		<div class="flex flex-row gap-2">
			<button class="btn btn-square h-7 w-7" on:click={bewerk_augustje}>
				<Edit class="h-4 w-4" />
			</button>
			<form use:enhance={verwijder_augustje} method="post" action="?/verwijder">
				<input type="hidden" name="id" value={augustje.id} />
				<button
					type="submit"
					class={`btn btn-square btn-error h-7 w-7 ${loading ? 'loading-spinner loading' : ''}`}
				>
					<Trash class="h-4 w-4" />
				</button>
			</form>
		</div>
	</td>
	<td>
		<div class="font-bold">{augustje.naam}</div>
	</td>
	<td>
		<a class="btn" href={augustje.bestand} target="_blank">
			<File class="h-4 w-4" />
		</a>
	</td>
	<td>
		<div>{augustje.created}</div>
	</td>
</tr>
