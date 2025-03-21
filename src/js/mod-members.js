//
const members = document.querySelector('[data-table="table_members"]');
console.log(members.dataset.tbMembers); // "clasePrueba"

const selectMembers = document.querySelector('[data-select="select-models-families"]');
console.log("1111", selectMembers.value); // "1"

if (selectMembers.value === "1") {
	console.log("1111", selectMembers.value); // "1" variables valores
} else if (selectMembers.value === "2") {
	console.log("2222", selectMembers.value); // "2"
} else if (selectMembers.value === "3") {
	console.log("3333", selectMembers.value); // "3"
}

const table_members = `<table class="min-w-full table-auto">
								<thead class=" ">
									<tr class="p-1">
										<th class="font-normal p-1">Integrante</th>
										<th class="font-normal border border-neutral-600 p-1 text-center">Varon</th>
										<th class="border font-normal border-neutral-600 p-1 text-center">Mujer</th>
										<th class="border border-neutral-600 font-normal font-normal p-1 text-center">
											Joven
										</th>
										<th class="border border-neutral-600 font-normal p-1 text-center">Niña</th>
										<th class="border border-neutral-600 font-normal p-1 text-center">Niño</th>
									</tr>
									<tr class="rounded-ee-full">
										<th class="border font-normal p-1 border-neutral-600">Edad</th>
										<th class="border font-normal p-1 border-neutral-600 text-center">35</th>
										<th class="border border-neutral-600 font-normal p-1 text-center">31</th>
										<th class="border border-neutral-600 font-normal p-1 text-center">16</th>
										<th class="border border-neutral-600 font-normal p-1 text-center">8</th>
										<th class="border border-neutral-600 font-normal p-1 text-center">6</th>
									</tr>
								</thead>
							</table>` ;

members.innerHTML = table_members;

