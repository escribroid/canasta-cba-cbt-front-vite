//
const table_members_model_1 = `<table class="min-w-full table-auto">
								<thead class=" ">
									<tr class="border border-neutral-600">
										<th class="border-r-4 border-blue-500 font-semibold px-2 py-2 text-left">Integrante</th>
										<th class="font-normal border border-neutral-600 px-1 py-2 text-center">Mujer</th>
										<th class="font-normal border border-neutral-600 px-1 py-2 text-center">Varon</th>
										<th class="font-normal border border-neutral-600 px-1 py-2 text-center">Mujer</th>
										
									</tr>
									<tr class="rounded-ee-full border border-neutral-600">
										<th class="border-r-4 border-blue-500 font-semibold px-2 py-2 text-left">Edad</th>
										<th class="font-normal border border-neutral-600 px-1 py-2 text-center">35</th>
										<th class="font-normal border border-neutral-600 px-1 py-2 text-center">18</th>
										<th class="font-normal border border-neutral-600 px-1 py-2 text-center">61</th>
									</tr>
								</thead>
							</table>`;

const table_members_model_2 = `<table class="min-w-full table-auto">
							<thead class=" ">
								<tr class=" py-5 border border-neutral-600">
									<th class="border-r-3 border-blue-500 font-semibold px-2 py-2 text-left">Integrante</th>
									<th class="font-normal border border-neutral-600 px-1 py-2 text-center">Varon</th>
									<th class="font-normal border border-neutral-600 px-1 py-2 text-center">Mujer</th>
									<th class="font-normal border border-neutral-600 px-1 py-2 text-center">Niña</th>
									<th class="font-normal border border-neutral-600 px-1 py-2 text-center">Niño</th>
								</tr>
								<tr class="rounded-ee-full border border-neutral-600">
									<th class=" border-r-3 border-blue-500 font-semibold px-2 py-2 text-left">Edad</th>
									<th class="font-normal border border-neutral-600 px-1 py-2 text-center">35</th>
									<th class="font-normal border border-neutral-600 px-1 py-2 text-center">31</th>
									<th class="font-normal border border-neutral-600 px-1 py-2 text-center">8</th>
									<th class="font-normal border border-neutral-600 px-1 py-2 text-center">6</th>
								</tr>
							</thead>
						</table>`;

const table_members_model_3 = `<table class="min-w-full table-auto">
								<thead class=" ">
									<tr class="border border-neutral-600">
										<th class="border-r-4 border-blue-500 text-white font-semibold p-1 text-left">Integrante</th>
										<th class="font-normal border border-neutral-600 px-1 py-2 text-center">Mujer</th>
										<th class="font-normal border border-neutral-600 px-1 py-2 text-center">Varon</th>
										<th class="font-normal border border-neutral-600 px-1 py-2 text-center">Niño</th>
										<th class="font-normal border border-neutral-600 px-1 py-2 text-center">Niño</th>
										<th class="font-normal border border-neutral-600 px-1 py-2 text-center">Niño</th>
									</tr>
									<tr class="rounded-ee-full border border-neutral-600">
										<th class="border-r-4 border-blue-500 text-white font-semibold p-1 text-left">Edad </th>
										<th class="font-normal border border-neutral-600 px-1 py-2 text-center">30</th>
										<th class="font-normal border border-neutral-600 px-1 py-2 text-center">30</th>
										<th class="font-normal border border-neutral-600 px-1 py-2 text-center">5</th>
										<th class="font-normal border border-neutral-600 px-1 py-2 text-center">3</th>
										<th class="font-normal border border-neutral-600 px-1 py-2 text-center">1</th>
									</tr>
								</thead>
							</table>`;

const members = document.querySelector('[data-table="table_members"]');

const selectMembers = document.querySelector('[data-select="select-models-families"]');

const members_num = document.querySelector('[data-members-num="members-num"]');

if (selectMembers.value === "1") {
	members.innerHTML = table_members_model_1;
	members_num.innerHTML = 3;
}

document.querySelector('[data-select="select-models-families"]').addEventListener("change", function () {
	if (selectMembers.value === "1") {
		members.innerHTML = table_members_model_1;
		members_num.innerHTML = 3;
	} else if (selectMembers.value === "2") {
		members.innerHTML = table_members_model_2;
		members_num.innerHTML = 4;
	} else if (selectMembers.value === "3") {
		members.innerHTML = table_members_model_3;
		members_num.innerHTML = 5;
	}
});
