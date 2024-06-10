let currentPokemon = [];
let filteredPokemonNames = [];
let filteredPokemon = [];
let pokemonNames = [];
let number;
let showPokemonFrom = 0;
let showPokemonUntil = 24;
let totalPokemonCount = 1025;

/**
 * Initializes the application by calling the `showPokemonFrontpage` and `showSearchedPokemon` functions asynchronously.
 *
 * @return {Promise<void>} A Promise that resolves when both functions have completed.
 */
async function init() {
  await showPokemonFrontpage();
  await showSearchedPokemon();
}

/**
 * Asynchronously fetches and renders the frontpage of Pokemon information.
 *
 * @return {Promise<void>} A Promise that resolves when all Pokemon data has been fetched and rendered.
 */
async function showPokemonFrontpage() {
  for (let i = showPokemonFrom; i < showPokemonUntil; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    try {
      let response = await fetch(url);
      let pokemonData = await response.json();
      currentPokemon[i] = pokemonData;
      renderPokemon(i);
    } catch (error) {
      console.error(error);
    }
  }
}

/**
 * Asynchronously fetches and stores the names of all Pokemon from the PokeAPI.
 *
 * @return {Promise<void>} A Promise that resolves when all Pokemon names have been fetched and stored.
 */
async function showSearchedPokemon() {
  for (let i = showPokemonFrom; i < totalPokemonCount; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    try {
      const response = await fetch(url);
      const pokemonData = await response.json();
      pokemonNames.push(pokemonData["name"]);
    } catch (error) {
      console.error(error);
    }
  }
}

/**
 * Asynchronously loads more Pokemon by updating the range of Pokemon to show.
 *
 * @return {Promise<void>} A Promise that resolves when the Pokemon have been loaded.
 */
async function loadMorePokemon() {
  if (showPokemonUntil >= totalPokemonCount) return;
  showPokemonFrom = showPokemonUntil;
  showPokemonUntil = Math.min(showPokemonUntil + 24, totalPokemonCount);
  await showPokemonFrontpage();
}

/**
 * Renders a Pokemon on the page.
 *
 * @param {number} i - The index of the Pokemon.
 * @return {void} This function does not return a value.
 */
function renderPokemon(i) {
  let pokemonData;
  if (filteredPokemon.length === 0) {
    pokemonData = currentPokemon[i];
  } else {
    pokemonData = i;
    i = i.id - 1;
  }
  pokemonCount(i);
  let pokemonName = capitalizeFirstLetter(pokemonData["name"]);
  let container = document.createElement("div");
  container.classList.add("pokemon-container");
  container.innerHTML = renderMiniCardTemplate(pokemonName, i);
  document.getElementById("content").appendChild(container);
  showAbilities(i, pokemonData);
}

/**
 * Asynchronously loops through an array of filtered Pokemon names and fetches their data from the PokeAPI.
 * If the fetched Pokemon name matches the original name, it is added to the filteredPokemon array.
 *
 * @return {Promise<void>} A Promise that resolves when all filtered Pokemon data has been fetched and added to the filteredPokemon array.
 */
async function loopFilteredPokemonNames() {
  for (let j = 0; j < filteredPokemonNames.length; j++) {
    let pokemonName = filteredPokemonNames[j];
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    try {
      let response = await fetch(url);
      let pokemonData = await response.json();
      if (pokemonName === pokemonData["name"]) {
        filteredPokemon.push(pokemonData);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

/**
 * Renders the filtered Pokemon on the page.
 *
 * @param {Array} filteredPokemon - An array of Pokemon objects to be rendered.
 * @return {void} This function does not return a value.
 */
function renderFilteredPokemon(filteredPokemon) {
  document.getElementById("content").innerHTML = "";
  filteredPokemon.forEach((i) => renderPokemon(i));
}

/**
 * Asynchronously searches for Pokemon based on a search term entered by the user.
 * If the search term is longer than 2 characters, it loops through all Pokemon names
 * to find matches, fetches the data for each matching Pokemon, and renders the filtered
 * Pokemon on the page. If the search term is empty or shorter than 2 characters, it
 * renders the current Pokemon on the page. Additionally, it toggles the display of a
 * button based on whether there are filtered Pokemon or not.
 *
 * @return {Promise<void>} A Promise that resolves when the search is complete and the
 * filtered Pokemon have been rendered.
 */
async function searchPokemon() {
  document.getElementById("content").innerHTML = "";
  let searchTerm = document.getElementById("searchPokemonInputField");
  let searchKeyWord = searchTerm.value.toLowerCase();
  if (searchTerm.value.length > 2) {
    filteredPokemonNames = [];
    filteredPokemon = [];
    loopAllPokemonNames(searchKeyWord);
    await loopFilteredPokemonNames();
    renderFilteredPokemon(filteredPokemon);
    document.getElementById('button').style.display = 'none';
  } else {
    filteredPokemon = [];
    filteredPokemonNames = [];
    showPokemonFrom = 0;
    for (let i = showPokemonFrom; i < showPokemonUntil; i++) {
      renderPokemon(i);
    }
    document.getElementById('button').style.display = '';
  }
}

/**
 * Loops through an array of Pokemon names and filters out those that start with the given search keyword.
 *
 * @param {string} searchKeyWord - The keyword to search for in the Pokemon names.
 * @return {void} This function does not return a value.
 */
function loopAllPokemonNames(searchKeyWord) {
  for (let i = showPokemonFrom; i < pokemonNames.length; i++) {
    const pokemonData = pokemonNames[i];
    if (pokemonData && pokemonData.toLowerCase().startsWith(searchKeyWord)) {
      filteredPokemonNames.push(pokemonData);
    }
  }
}

/**
 * Displays the abilities of a Pokemon.
 *
 * @param {number} i - The index of the Pokemon in the currentPokemon array.
 * @param {object} pokemon - The Pokemon object if it is filtered, otherwise undefined.
 * @return {void} This function does not return a value.
 */
function showAbilities(i, pokemon) {
  let pokemonData;
  if (filteredPokemon.length === 0) {
    pokemonData = currentPokemon[i];
  } else {
    pokemonData = pokemon;
  }
  renderPokemonAbilitiesSmall(pokemonData, i);
}

/**
 * Renders the abilities of a Pokemon in a small format.
 *
 * @param {object} pokemonData - The data of the Pokemon.
 * @param {number} i - The index of the Pokemon.
 * @return {void} This function does not return a value.
 */
function renderPokemonAbilitiesSmall(pokemonData, i) {
  let pokemonType = pokemonData["types"];
  let abilityCheck = document.getElementById(`abilityCheck${i}`);
  for (let j = 0; j < pokemonType.length; j++) {
    const type = pokemonType[j]["type"]["name"];
    abilityCheck.innerHTML += /*html*/ `
            <div class="ability-border">
                <span class="ability-border" id="ability${i}${j}">${type}</span>
            </div>
            `;
    document.getElementById(`ability${i}${j}`).style.backgroundColor =
      colours[type];
  }
}

/**
 * Renders the abilities of a Pokemon in a big format.
 *
 * @param {number} i - The index of the Pokemon.
 * @param {Array} pokemonType - An array of Pokemon types.
 * @return {void} This function does not return a value.
 */
function renderPokemonAbilitiesBig(i, pokemonType) {
  let abilityCheck = document.getElementById(`abilityCheckBig${i}`);
  for (let j = 0; j < pokemonType.length; j++) {
    const type = pokemonType[j]["type"]["name"];
    abilityCheck.innerHTML += /*html*/ `
            <div class="ability-border-big">
                <span class="ability-border-big" id="abilityBig${i}${j}">${type}</span>
            </div>
            `;
    document.getElementById(`abilityBig${i}${j}`).style.backgroundColor =
      colours[type];
  }
}

/**
 * Opens a popup for a given Pokemon.
 *
 * @param {string} pokemonName - The name of the Pokemon.
 * @param {number} i - The index of the Pokemon.
 * @return {Promise<void>} A promise that resolves when the popup is opened.
 */
async function openPopup(pokemonName, i) {
  let pokemonType;
  let pokemonData;
  if (filteredPokemon.length === 0) {
    pokemonData = currentPokemon[i];
    pokemonType = pokemonData["types"];
    renderPopupContent(pokemonName, i, pokemonType);
    document.querySelector(".arrow-container").style = "";
  } else {
    pokemonData = filteredPokemon.filter((pokemon) => pokemon.id === i + 1);
    pokemonType = pokemonData[0] ? pokemonData[0]["types"] : null;
    renderPopupContent(pokemonName, i, pokemonType);
    document.querySelector(".arrow-container").style.display = "none";
  }
}

/**
 * Closes the popup by hiding the popup background element.
 *
 * @return {void} This function does not return anything.
 */
function closePopup() {
  const popupBackground = document.getElementById("popupBackground");
  popupBackground.style.display = "none";
}

/**
 * Renders the content of a popup for a given Pokemon.
 *
 * @param {string} pokemonName - The name of the Pokemon.
 * @param {number} i - The index of the Pokemon.
 * @param {Array} pokemonType - An array of Pokemon types.
 * @return {Promise<void>} A promise that resolves when the content is rendered.
 */
async function renderPopupContent(pokemonName, i, pokemonType) {
  pokemonCount(i);
  const nameOfPokemon = capitalizeFirstLetter(pokemonName);
  const popupContent = document.getElementById("popupContent");
  popupContent.innerHTML = renderPokemonPopup(nameOfPokemon, i);
  await createChart(i);
  renderPokemonAbilitiesBig(i, pokemonType);
  const popupBackground = document.getElementById("popupBackground");
  popupBackground.style.display = "flex";
}

/**
 * Asynchronously loads the stats of a Pokemon from the PokeAPI.
 *
 * @param {number} i - The index of the Pokemon to load stats for.
 * @return {Promise<Array<number>>} A Promise that resolves to an array of the Pokemon's stats: HP, Attack, Defense, Special Attack, Special Defense, and Speed.
 */
async function loadPokemonStatsPopup(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
  let response = await fetch(url);
  let responseAsJson = await response.json();
  let hp = await responseAsJson["stats"][0]["base_stat"];
  let attack = await responseAsJson["stats"][1]["base_stat"];
  let defense = await responseAsJson["stats"][2]["base_stat"];
  let specialAttack = await responseAsJson["stats"][3]["base_stat"];
  let specialDefense = await responseAsJson["stats"][4]["base_stat"];
  let speed = await responseAsJson["stats"][5]["base_stat"];
  return [hp, attack, defense, specialAttack, specialDefense, speed];
}

/**
 * Calculates the number representation for a given Pokemon index.
 *
 * @param {number} i - The index of the Pokemon.
 * @return {string} The number representation for the given Pokemon index.
 */
function pokemonCount(i) {
  if (i <= 9) {
    number = "#000";
  } else if (i <= 99) {
    number = "#00";
  } else if (i <= 999) {
    number = "#0";
  } else {
    number = "#";
  }
}

/**
 * Shows the next Pokemon in the list.
 *
 * @param {number} i - The index of the current Pokemon.
 * @return {void} This function does not return a value.
 */
function showNextPokemon(i) {
  let pokemonData;
  if (i === showPokemonUntil - 1) {
    i = 0;
  } else {
    i++;
  }
  if (filteredPokemon.length === 0) {
    pokemonData = currentPokemon[i];
  } else {
    pokemonData = i;
    i = i.id;
  }
  let pokemonName = capitalizeFirstLetter(pokemonData["name"]);
  openPopup(pokemonName, i);
}

/**
 * Shows the previous Pokemon in the list.
 *
 * @param {number} i - The index of the current Pokemon.
 * @return {void} This function does not return a value.
 */
function showPreviousPokemon(i) {
  let pokemonData;
  if (i === 0) {
    i = showPokemonUntil - 1;
  } else {
    i--;
  }
  if (filteredPokemon.length === 0) {
    pokemonData = currentPokemon[i];
  } else {
    pokemonData = i;
    i = i.id;
  }
  let pokemonName = capitalizeFirstLetter(pokemonData["name"]);
  openPopup(pokemonName, i);
}

/**
 * Reloads the current page.
 *
 * @return {void} This function does not return a value.
 */
function reloadPage() {
  window.location.reload();
}

/**
 * Capitalizes the first letter of a string and converts the rest to lowercase.
 *
 * @param {string} string - The string to be capitalized.
 * @return {string} The string with the first letter capitalized and the rest in lowercase.
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}