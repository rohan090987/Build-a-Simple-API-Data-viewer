const container = document.getElementById("dogContainer");
const filterInput = document.getElementById("breedFilter");
const refreshBtn = document.getElementById("refreshBtn");

async function fetchDogs() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random/10");
  const data = await res.json();
  return data.message;
}

function extractBreed(url) {
  const match = url.match(/breeds\/([^\/]*)\//);
  return match ? match[1] : "unknown";
}

function renderDogs(dogs, filter = "") {
  container.innerHTML = "";
  const filtered = dogs.filter((url) => extractBreed(url).includes(filter.toLowerCase()));
  const displayDogs = filtered.slice(0, 5);

  displayDogs.forEach((url) => {
    const breed = extractBreed(url);
    const card = document.createElement("div");
    card.className = "dog-card";
    card.innerHTML = `<img src="${url}" alt="${breed}"><p>${breed}</p>`;
    container.appendChild(card);
  });
}

let currentDogs = [];

async function loadDogs() {
  currentDogs = await fetchDogs();
  renderDogs(currentDogs);
}

filterInput.addEventListener("input", () => {
  const filter = filterInput.value;
  renderDogs(currentDogs, filter);
});

refreshBtn.addEventListener("click", loadDogs);

loadDogs();
