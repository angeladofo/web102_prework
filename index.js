
// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
let allGames = document.getElementById("games-container");
function addGamesToPage(games) {
  // loop over each item in the data
  games.forEach((game, index) => {
    let newDiv = document.createElement("div");

    // add a base class for styling cards
    newDiv.classList.add("game-card");

    // add a unique class identifier
    newDiv.classList.add(`my-item${index}`);

    // set the inner HTML of the new div to include an image and two text sections
    newDiv.innerHTML = `<img class="game-img" src="${game.img}" />
    <div>${game.name}</div>
    <div>${game.description}</div>`;

    // append to the container
    allGames.appendChild(newDiv);
  });
}
// call the function
addGamesToPage(GAMES_JSON);


// grab the contributions card element
const totalContributions = GAMES_JSON.reduce((accum, elem) => { return accum + elem.backers}, 0)
const contributionsCard = document.getElementById("num-contributions");
contributionsCard.innerHTML = `${totalContributions.toLocaleString('en-US')}`

// grab the amount raised card, then use reduce() to find the total amount raised
const totalRaised = GAMES_JSON.reduce((accum, elem) => { return accum + elem.pledged}, 0)
const raisedCard = document.getElementById("total-raised");
raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`

// grab number of games card and set its inner HTML
const totalGames = GAMES_JSON.reduce((accum, elem) => { return accum + 1}, 0)
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${totalGames}`

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);
  let unfundedGames = GAMES_JSON.filter((element) => {
    return element.pledged < element.goal
  })
  addGamesToPage(unfundedGames)
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);
  let fundedGames = GAMES_JSON.filter((element) => {
   return element.pledged >= element.goal
  })
  addGamesToPage(fundedGames)
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', () => {filterUnfundedOnly()})
fundedBtn.addEventListener('click', () => {filterFundedOnly()})
allBtn.addEventListener('click', () => {showAllGames()})

// grab the description container
const descriptionContainer = document.getElementById("description-container");


// use filter or reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter((elem) => elem.goal > elem.pledged).length
console.log(numUnfundedGames)

// create a string that explains the number of unfunded games using the ternary operator
const unfundedDescription = document.createElement('p')
unfundedDescription.innerHTML = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGames} games. Currently, ${numUnfundedGames} ${numUnfundedGames > 1 ? 'games remain' : 'game remains'} unfunded. We need your help to fund these amazing games!`
console.log(descriptionContainer)
descriptionContainer.appendChild(unfundedDescription)




const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;
console.log(rest)

// create a new element to hold the name of the top pledge game and second pledge
let topFunded = document.createElement('p')
topFunded.innerHTML = firstGame.name
let runnerFunded = document.createElement('p')
runnerFunded.innerHTML = secondGame.name

// append it to the correct element
firstGameContainer.appendChild(topFunded)
secondGameContainer.appendChild(runnerFunded)



