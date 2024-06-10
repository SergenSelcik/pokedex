/**
 * Renders a mini card template for a given Pokemon.
 *
 * @param {string} pokemonName - The name of the Pokemon.
 * @param {number} i - The index of the Pokemon.
 * @return {string} The HTML string representing the mini card template.
 */
function renderMiniCardTemplate(pokemonName, i) {
    return /*html*/ `
      <div onclick="openPopup('${pokemonName}', ${i})" class="pokemon-image-container">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png">
      </div>
      <div class="pokemon-info">
          <p class="pokemon-count">Nr. ${number}${i + 1}</p>
          <h5>${pokemonName}</h5>
      </div>
      <div class="ability-container" id="abilityCheck${i}">
      </div>
  `;
}
/**
 * Renders a popup for a given Pokemon.
 *
 * @param {string} nameOfPokemon - The name of the Pokemon.
 * @param {number} i - The index of the Pokemon.
 * @return {string} The HTML string representing the popup.
 */
function renderPokemonPopup(nameOfPokemon, i) {
    return `
      <div class="close-button-container"><img class="close-button" onclick="closePopup()" src="./img/close.png"></div>
          <div class="pokemon-info-big">
          <span class="pokemon-count-big">Nr. ${number}${i + 1}</span>
          <span>${nameOfPokemon}</span>
          </div>
          <div class="popup-image-container">
              <img class="popup-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png">
          </div>
          <div class="ability-container-big" id="abilityCheckBig${i}">
          </div>
          <div class="pokemon-stats">
              <div class="chart-container">
              <canvas class="chart" id="myChart"></canvas>
              </div>
          </div>
          <div class="arrow-container">
          <div class="back-arrow-container">
              <img src="./img/back.png" onclick="showPreviousPokemon(${i})" alt="">
          </div>
          <div class="next-arrow-container">
              <img src="./img/next.png" onclick="showNextPokemon(${i})" alt="">
          </div>
        </div> 
      </div>
      `;
}