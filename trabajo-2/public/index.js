//

// Get the elements

const province_select_element = document.querySelector("#province-select");

const canton_select_element = document.querySelector("#canton-select");

const district_select_element = document.querySelector("#district-select");

// Set cantons based on province

const set_cantons = async (province = province_select_element.value) => {
  // Clear cantons
  canton_select_element.textContent = "";

  const cantons = await fetch(`/cantons.php?province=${province}`);

  const json = await cantons.json();

  for (const canton of json) {
    const element = document.createElement("option");

    element.value = `${canton.id}`;
    element.textContent = canton.name;

    canton_select_element.appendChild(element);
  }

  return province;
};

// Set districts based on cantons and province

const set_districts = async (
  province = province_select_element.value,
  canton = canton_select_element.value
) => {
  // Clear districts
  district_select_element.textContent = "";

  const districts = await fetch(
    `/districts.php?province=${province}&canton=${canton}`
  );

  const json = await districts.json();

  for (const district of json) {
    const element = document.createElement("option");

    element.value = `${district.id}`;
    element.textContent = district.name;

    district_select_element.appendChild(element);
  }
};

// On province change

province_select_element.addEventListener("change", async () => {
  const province = await set_cantons();

  set_districts(province);
});

// On canton change

canton_select_element.addEventListener("change", () => {
  set_districts();
});

// On start

set_cantons(1);
set_districts(1, 1);
