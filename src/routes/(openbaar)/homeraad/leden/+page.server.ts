export async function load({ locals, url }) {
	const sorteer_door_functie = (a: string, b: string): number => {
		return functie_rank(b) - functie_rank(a);
	};

	const functie_rank = (functie: string) => {
		switch (functie) {
			case 'Praeses':
				return 21;
			case 'Vice-Praeses':
				return 20;
			case 'Penning':
				return 19;
			case 'Secretaris':
				return 18;
			case 'ICT':
				return 17;
			case 'Milieu':
				return 16;
			case 'Keizer-Sport' :
				return 15;
			case 'Sport':
				return 14;
			case 'Bar':
				return 13;
			case 'Cultuur':
				return 12;
			case 'Feest':
				return 11;
			case 'PR-Extern':
				return 10;
			case 'PR-Intern':
				return 9;
			case 'Scriptor':
				return 8;
			case 'Internationaal':
				return 7;
			case 'Schachtentemmer':
				return 6;
			case 'Zeden':
				return 5;
			case 'Cantor':
				return 4;
			case 'Lustrum':
				return 3;
			case 'Meter':
				return 2;
			case 'Peter':
				return 1;
			case 'VM':
				return 0;
			default:
				return -1;
		}
	};

	const academiejaar_query = new URL(url).searchParams.get('aj');

	const academiejaren = locals.pb
		.collection('praesidia')
		.getFullList({ fields: 'academiejaar', sort: '-academiejaar' })
		.then(r => r.map(a => a.academiejaar));


	const praesidium_leden =
		locals.pb.collection('praesidium_leden').
			getFullList(
				{
					filter: `praesidium.academiejaar = '${academiejaar_query ?? locals.praesidium?.academiejaar}'`,
					expand: 'functie'
				}).then(r => r.sort((a, b) => sorteer_door_functie(a.expand?.functie?.username.replace(/[0-9]/g, ''), b.expand?.functie?.username.replace(/[0-9]/g, ''))).map(a => ({
					...a,
					avatar: locals.pb.files.getUrl(a, a.avatar)
				})))

	return {
		praesidium_leden,
		academiejaar: locals.praesidium?.academiejaar,
		academiejaar_query,
		academiejaren
	};
}
