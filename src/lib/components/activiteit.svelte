<script lang="ts">
	import type { PubliekeActiviteit } from '../../routes/api/activiteiten/+server';
	import { CalendarClock, CalendarDays } from 'lucide-svelte';
	import type { RecordModel } from 'pocketbase';

	export let activiteit: PubliekeActiviteit;
	const huidige_datum = new Date();
	const activiteits_datum = new Date(activiteit.datum);
</script>

<div class="card w-[400px] bg-base-200 shadow-xl m-5">
	<figure class="w-[400px] h-[200px] rounded">
		<img
			loading="lazy"
			src={activiteit.banner ?? '/foto_placeholder.png'}
			class="object-scale-down"
			height={200}
			width={400}
			alt="Banner"
		/>
	</figure>
	<div class="card-body">
		<h2 class="card-title text-center text-3xl self-center mb-5 break-all">{activiteit.naam}</h2>
		<h3 class="flex flex-row gap-2 self-center">
			<CalendarDays className="h-4 w-4" />
			{activiteits_datum.toLocaleDateString()}
		</h3>
		<h3 class="flex flex-row gap-2 self-center">
			<CalendarClock className="h-4 w-4" />
			{activiteits_datum.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
		</h3>
		<div class="divider" />
		<div class="collapse collapse-arrow bg-base-300">
			<input type="checkbox" name="omschrijving" /> 
			<div class="collapse-title text-xl font-medium">
			  Omschrijving
			</div>
			<div class="collapse-content"> 
			  <p>{activiteit.omschrijving}</p>
			</div>
		  </div>
		<div class="card-actions text-center self-center">
			{#if activiteit.inschrijven && activiteits_datum.getTime() > huidige_datum.getTime() }
				<a href={activiteit.formlink} class="btn btn-primary btn-wide" data-umami-event="Inschrijving activiteit">Schrijf je in!</a>
			{/if}
		</div>
	</div>
</div>
