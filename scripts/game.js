// Connecting the start button to a script
var startButton = document.getElementsByClassName('start-button')[0];
var ButtonArray = [];

// Variables for game score and player names
var gameScore = document.querySelector('.gameScore');
var player1ScoreLine = document.getElementById('player1Score');
var player2ScoreLine = document.getElementById('player2Score');
var player1Score = 0;
var player2Score = 0;

// Variables for player lines, current cards, and turns
var player1CurrentLIne = document.querySelector('#player1Line');
var player2CurrentLine = document.querySelector('#player2Line');
let selectedCard1 = null;
let selectedCard2 = null;
var currentTurnPlayer1 = true;
var currentTurnPlayer2 = false;

// Variables for winner line, refresh button, and timer
var winnerDisplay = document.querySelector('#winner');
var refreshButton = document.querySelector('#refreshButton');
var seconds = 0;
var timerInterval;

// Game function
function game() {
    SpawnCards();
}

// Array of cards with numbers from 1 to 15 and corresponding letters (e.g., 15 == 15a)
var kaartjes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12a',
    '13a', '14a', '15a'];

// Get the article as a JS variable
var article = document.querySelector('article');

// Function to get a random index from an array
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

// Function to display player names
function setPlayerNames() {
    var speler1Name = document.getElementById('player1Name').value;
    var speler2Name = document.getElementById('player2Name').value;

    if (speler1Name || speler2Name) {
        player1CurrentLIne.innerText = speler1Name;
        player2CurrentLine.innerText = speler2Name;
    }

    let velden = document.querySelector('.inputVelden');
    velden.style.display = "none";
}

// Function to update the winner line based on the current scores
function updateWinnerLine() {
    if (player1Score > player2Score) {
        winnerDisplay.innerText = player1CurrentLIne.innerText + ' has won';
    } else if (player2Score > player1Score) {
        winnerDisplay.innerText = player2CurrentLine.innerText + ' has won';
    }
}

// Function to toggle the game timer
function toggleTimer() {
    if (timerInterval) {
        // If the timer is running, stop it
        clearInterval(timerInterval);
        timerInterval = null;
    } else {
        // If the timer is stopped, start it
        timerInterval = setInterval(updateTimer, 1000);
    }
}

// Function to update the game timer
function updateTimer() {
    seconds++;
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    document.getElementById('timer').innerText = minutes + ' minutes ' + remainingSeconds + ' seconds';
}

// Function to refresh the page
function refresh() {
    document.location.reload();
}

// Function to handle game rules
async function GameRules(id) {
    if ((currentTurnPlayer1 && selectedCard1 === null) || (currentTurnPlayer2 && selectedCard1 === null)) {
        selectedCard1 = id;
        // Show the current image of the button
        let button1 = ButtonArray.find(button => button.id === selectedCard1);
        let imageButton1 = button1.querySelector('img');
        let logoImage = button1.querySelector('#logo' + button1.id);
        logoImage.style.display = 'none';
        imageButton1.style.display = 'block';
        console.log("First card selected: ", selectedCard1);
    } else if ((currentTurnPlayer1 && selectedCard2 === null) || (currentTurnPlayer2 && selectedCard2 === null)) {
        selectedCard2 = id;
        let button2 = ButtonArray.find(button => button.id === selectedCard2);
        let imageButton2 = button2.querySelector('img');
        let logoImage = button2.querySelector('#logo' + button2.id);
        logoImage.style.display = 'none';
        imageButton2.style.display = 'block';
        console.log("Second card selected:", selectedCard2);

        if (selectedCard1 == selectedCard2 + "a" || selectedCard2 == selectedCard1 + "a") { // If cards match
            let button1 = ButtonArray.find(button => button.id === selectedCard1);
            let button2 = ButtonArray.find(button => button.id === selectedCard2);
            console.log("win");
            ClearCards(selectedCard1, selectedCard2);
            HideElementsWithPause(button1, button2);
            if (currentTurnPlayer1 && currentTurnPlayer2 == false) {
                player1Score++;
                player1ScoreLine.innerText = player1Score;
            } else if (currentTurnPlayer2 && currentTurnPlayer1 == false) {
                player2Score++;
                player2ScoreLine.innerText = player2Score;
            }
        } else {
            let button1 = ButtonArray.find(button => button.id === selectedCard1);
            let button2 = ButtonArray.find(button => button.id === selectedCard2);
            let imageOfButton1 = button1.querySelector('img');
            let imageOfButton2 = button2.querySelector('img');
            let logoImage1 = button1.querySelector('#logo' + button1.id);
            let logoImage2 = button2.querySelector('#logo' + button2.id);
            HideElementsWithPauseWithLogos(imageOfButton1, imageOfButton2, logoImage1, logoImage2);

            if (currentTurnPlayer1) {
                player1CurrentLIne.style.color = 'black';
                player2CurrentLine.style.color = 'red';
                currentTurnPlayer1 = false;
                currentTurnPlayer2 = true;
            } else {
                player2CurrentLine.style.color = 'black';
                player1CurrentLIne.style.color = 'red';
                currentTurnPlayer1 = true;
                currentTurnPlayer2 = false;
            }
            ClearCards(selectedCard1, selectedCard2);
            console.log("Player" + (currentTurnPlayer1 ? "1" : "2") + " is done!!!!!");
        }
    }
    // Check if the game is over
    if (player1Score + player2Score == 15) {
        updateWinnerLine();
        refreshButton.style.display = 'block';
        clearInterval(timerInterval);
    }
}

// Function to clear selected cards
function ClearCards() {
    selectedCard1 = null;
    selectedCard2 = null;
}

// Function to hide elements with a pause
async function HideElementsWithPause(element1, element2) {
    setTimeout(function () {
        element1.style.display = 'none';
        element2.style.display = 'none';
    }, 500);
}

// Function to hide elements with a pause and show logos after one second
async function HideElementsWithPauseWithLogos(element1, element2, logo1, logo2) {
    setTimeout(function () {
        element1.style.display = 'none';
        element2.style.display = 'none';

        setTimeout(function () {
            logo1.style.display = 'block';
            logo2.style.display = 'block';
        }, 10);
    }, 500);
}

// Function to spawn cards on the game board
function SpawnCards() {
    setPlayerNames();
    toggleTimer();
    gameScore.style.display = "block";
    player1CurrentLIne.style.color = 'red';

    // Creating the table
    createTable();

    console.log(ButtonArray);
}

// Function to create the game table
function createTable() {
    var tbl = document.createElement("table");
    for (let rows = 0; rows < 5; rows++) {
        var row = tbl.insertRow(rows);
        for (let cells = 0; cells < 6; cells++) {
            // Get one element from the array
            let randomNumber = getRandomIndex(kaartjes);

            // Remove chosen element from the array to avoid duplication
            let cellId = kaartjes.splice(randomNumber, 1)[0];

            // Make a cell
            var cell = row.insertCell(cells);

            // Make a button
            createCardButton(cell, cellId);
        }
    }
    // Append the table to the article tags of HTML and make the start button disappear
    article.appendChild(tbl);
    startButton.style.display = 'none';
}

// Function to create a card button
function createCardButton(cell, cellId) {
    var button = document.createElement("button");
    button.id = cellId;
    cell.appendChild(button);

    // Append an image to every button
    var img = document.createElement("img");
    img.src = "css/cards/" + cellId + ".png";
    button.appendChild(img);

    // Append logo image to every button
    var rocimage = document.createElement('img');
    rocimage.src = "css/logo/logo.png"
    rocimage.id = "logo" + cellId;
    button.appendChild(rocimage);

    // Hide images and add the button to the array 
    img.style.display = 'none';
    ButtonArray.push(button);

    // Add event listener to the button
    button.addEventListener("click", function (id) {
        return function () {
            GameRules(id);
        };
    }(button.id));
}
