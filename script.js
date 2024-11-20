

const words = 'the and is it to in a of you that for with on are as was but or by not at from have be this which can will if up out one all about there when make know time who where how your come go see get use what like day work way many such her him me us them a lot another always ask baby back ball bank bat beach bed big bird blue book box boy bread brother brown bus cake call can car cat chair children city class clean cold come cookie cup dark day desk dirty dog door down eat egg end fast find floor flower fly food foot friend full game garden girl give good green ground happy hat head help high home hot house how if inside jump keep kind kitchen know laugh letter light like little live long look make man may mean milk mom morning mother move name near never new night no not now of old on open orange other our out over paper party people pick place play put quiet red remember run sad same school sea see sell small some sun take talk tea tell that the them then there they think this those three time to too top town tree truck try under us very walk water well when where which white who why will wind with woman word work year yes you your'.split(' ');

let currentWords = words;

const wordsCount= words.length;
const gameTime = 30 * 1000;
window.timer = null;
window.gameStart= null;


function addClass(el,name){
  el.className += ' '+name;
}
function removeClass(el,name){
  el.className = el.className.replace(name,'');
}

function randomWord(){
  const randomIndex= Math.ceil(Math.random()*wordsCount);
  return words[randomIndex - 1];
}

function formatWord(word){
  return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}

function newGame(){
  document.getElementById('words').innerHTML='';
  for(let i=0;i<300;i++){
    document.getElementById('words').innerHTML += formatWord(randomWord());
  }
  addClass(document.querySelector(".word"),'current');
  addClass(document.querySelector(".letter"),'current');
  document.getElementById('timer').innerHTML = (gameTime/1000) + '';
  window.timer = null;
}

//this is the code for toggle the website to dark and light mode
const toggleButton = document.querySelector('.switch input[type="checkbox"]');
const body = document.body;

toggleButton.addEventListener('change', () => {
  if (toggleButton.checked) {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
});

// Get the current mode from local storage
let currentMode = localStorage.getItem('mode');
if (currentMode === 'dark') {
  body.classList.add('dark-mode');
  toggleButton.checked = true;
} else {
  body.classList.remove('dark-mode');
  toggleButton.checked = false;
}

toggleButton.addEventListener('change', () => {
  if (toggleButton.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('mode', 'dark');
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('mode', 'light');
  }
});



// Get the timer display element
const timerDisplay = document.getElementById('timer');

// Get the timer interval links
const timerIntervals = document.querySelectorAll('.nav-link.active');

// Initialize the selected time interval
let selectedInterval = 0;
let timerRunning = false;
let startTime = 0;
let typedWords = 0;

// Add an event listener to each timer interval link
timerIntervals.forEach((interval) => {
  interval.addEventListener('click', (e) => {
    // Get the selected time interval
    selectedInterval = parseInt(e.target.getAttribute('date-time'));

    // Update the timer display
    timerDisplay.innerText = `${selectedInterval / 1000}`; // Only show the number
  });
});

// Add an event listener to the document to listen for key presses
document.addEventListener('keydown', (e) => {
  // If a key is pressed and the selected interval is greater than 0 and the timer is not running
  if (selectedInterval > 0 && !timerRunning) {
    // Start the countdown
    countdown(selectedInterval);
    timerRunning = true;
    startTime = new Date().getTime();
  }
});

// Add an event listener to the document to listen for key presses
document.addEventListener('keydown', (e) => {
  // If a key is pressed and the selected interval is greater than 0 and the timer is running
  if (selectedInterval > 0 && timerRunning) {
    // Increment the typed words count
    typedWords++;
  }
});

// Countdown function
// Modify the countdown function to call gameOver when time reaches zero
function countdown(time) {
  let intervalId = setInterval(() => {
    time -= 1000; // decrement by 1 second
    timerDisplay.innerText = `${time / 1000}`; // Show only the number

    if (time <= 0) {
      clearInterval(intervalId);
      gameOver(); // Call gameOver function when timer reaches 0
    }
  }, 1000); // update every 1 second
}

// Calculate WPM function
function calculateWPM() {
  if (timerValue <= 0) {
    clearInterval(window.timer);
    const endTime = new Date().getTime();
    const elapsedTime = (endTime - startTime) / 1000 / 60; // convert to minutes
    const wpm = (typedWords / elapsedTime) * 60;
    document.getElementById('timer').innerHTML = `WPM: ${wpm.toFixed(2)}`; // Display WPM result
  }
}

let timerValue = gameTime; // Default to 30 seconds
// const timerDisplay = document.getElementById('timer');

// Add an event listener to each timer interval link
document.querySelectorAll('.nav-link[data-time]').forEach(link => {
  link.addEventListener('click', (e) => {
    timerValue = parseInt(e.target.getAttribute('data-time'), 10);
    timerDisplay.innerHTML = `${timerValue / 1000}`; // Only show the number without "seconds"
    newGame(); // Start a new game
    startTimer(); // Start the countdown
  });
});

// Set the initial timer display when the game starts
document.getElementById('timer').innerHTML = `${gameTime / 1000}`; // Only show the number


function displayWords() {
  const wordsContainer = document.getElementById('words');
  wordsContainer.innerHTML = ''; // Clear previous words

  // Create a span for each word and append it to the container
  currentWords.forEach(word => {
    const wordSpan = document.createElement('span');
    wordSpan.textContent = word + ' '; // Add a space for separation
    wordsContainer.appendChild(wordSpan);
  });
}

// document.getElementById('dropdown').addEventListener('change', (event) => {
//   const selectedValue = event.target.value;

//   // Update currentWords based on the selected value
//   switch (selectedValue) {
//     case 'english':
//       currentWords = words;
//       break;
//     case 'english1':
//       currentWords = english1Words;
//       break;
//     case 'english2':
//       currentWords = english2Words;
//       break;
//     default:
//       currentWords = words; // Fallback to default
//   }
  
//   // Display the words based on the selected value
//   displayWords();

//   // Restart the game with new words
//   newGame();
//   // Reset the timer
//   timerValue = gameTime;
//   document.getElementById('timer').innerHTML = `${timerValue / 1000}`;
// });

// Initial display of words
displayWords();

// Function to start the game
function startGame() {
  // Start the timer
  window.timer = setInterval(() => {
    if (!window.gameStart) {
      window.gameStart = (new Date()).getTime();
    }
    const currentTime = (new Date()).getTime();
    const msPassed = currentTime - window.gameStart;
    const sPassed = Math.round(msPassed / 1000);
    const sLeft = (timerValue / 1000) - sPassed;
    if (sLeft <= 0) {
      gameOver();
      return;
    }
    document.getElementById('timer').innerHTML = sLeft + '';
  }, 1000);
}

function getWpm(){
    const words = [...document.querySelectorAll('.word')];
    const lastTypedWord = document.querySelector('.word.current');
    const lastTypedWordIndex = words.indexOf(lastTypedWord);
    const typedWords = words.slice(0, lastTypedWordIndex);
    const correntWords = typedWords.filter(word => {
        const letters = [...word.children];
        const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect'));
        const correctletters = letters.filter(letter => letter.className.includes('correct'));
        return incorrectLetters.length === 0 && correctletters.length === letters.length;
    });
    return correntWords.length / gameTime * 60000;
}

// Game over function
function gameOver() {
  clearInterval(window.timer); // Stop the timer
  addClass(document.getElementById('game'), 'over'); // Add 'over' class to the game
  const wpm = getWpm().toFixed(2); // Calculate WPM
  document.getElementById('timer').innerHTML = `WPM: ${wpm}`; // Display WPM result
}

document.addEventListener('keydown', () => {
  const game = document.getElementById('game');
  if (document.activeElement !== game) {
    game.focus(); 
  }
});


document.getElementById('game').addEventListener('keydown', ev =>{ 
  const key= ev.key;
  const currentWord = document.querySelector('.word.current');
  const currentLetter = document.querySelector('.letter.current');
  const expected = currentLetter?.innerHTML || ' '; 
  const isLetter = key.length === 1 && key !== ' ';
  const isExtra = document.querySelector(".letter.incorrect.extra");
  const isSpace = key === ' ';
  const isBackspace = key === 'Backspace';
  const isFirstLetter = currentLetter === currentWord.firstChild;
  const isFirstWord = !currentWord.previousSibling;

  if(document.querySelector('#game.over')){
    return;
  }
    if(!window.timer && isLetter){
        window.timer = setInterval(()=> {
            if(!window.gameStart){
                window.gameStart = (new Date()).getTime();
            }
            const currentTime = (new Date()).getTime();
            const msPassed = currentTime - window.gameStart;
            const sPassed = Math.round(msPassed/1000);
            const sLeft = (gameTime/1000) - sPassed;
            if(sLeft <= 0){
                gameOver();
                return;
            }
            document.getElementById('timer').innerHTML = sLeft + '';
        },1000);
        
    }

  if(isLetter){
    if(currentLetter){
      addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
      removeClass(currentLetter, 'current');
      if(currentLetter.nextSibling){
        addClass(currentLetter.nextSibling, 'current');
      }
    } else{
      const incorrectLetter = document.createElement('span');
      incorrectLetter.innerHTML = key;
      incorrectLetter.className = 'letter incorrect extra';
      currentWord.appendChild(incorrectLetter); 
    }
  }

  if(isSpace){
    if(expected != ' '){
      const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
      lettersToInvalidate.forEach(letter => {
        addClass(letter,'incorrect');
      });
    }
    removeClass(currentWord,'current');
    addClass(currentWord.nextSibling, 'current');
    if(currentLetter){
      removeClass(currentLetter,'current');
    }
    addClass(currentWord.nextSibling.firstChild, 'current');
  }

  if(isBackspace){
    if (isFirstWord && isFirstLetter) {
      return; // Stop backspacing if it's the first word and the first letter
    }
    if(isExtra){
      currentWord.removeChild(currentWord.lastChild);
    }
    else if(!currentWord.previousSibling && isFirstLetter){
      return;
    }
    else if(currentLetter && isFirstLetter){
      removeClass(currentWord, 'current');
      addClass(currentWord.previousSibling, 'current');
      removeClass(currentLetter, 'current');
      addClass(currentWord.previousSibling.lastChild, 'current');
      removeClass(currentWord.previousSibling.lastChild, 'incorrect');
      removeClass(currentWord.previousSibling.lastChild, 'correct');
    }
    else if(currentLetter && !isFirstLetter){
      removeClass(currentLetter,'current');
      addClass(currentLetter.previousSibling,'current');
      removeClass(currentLetter.previousSibling, 'incorrect');
      removeClass(currentLetter.previousSibling, 'correct');
    } 
    else if(!currentLetter){
      addClass(currentWord.lastChild,'current');
      removeClass(currentWord.lastChild, 'incorrect');
      removeClass(currentWord.lastChild, 'correct');
    }

    // if (currentWord.getBoundingClientRect().top < 230) {
    //   const words = document.getElementById('words');
    //   const margin = parseInt(words.style.marginTop || '0px');
    //   words.style.marginTop = (margin + 45) + 'px';
    // }
  }

  // moving lines up
  if(currentWord.getBoundingClientRect().top > 230){
    const words = document.getElementById('words');
    const margin = parseInt(words.style.marginTop || '0px');
    words.style.marginTop = (margin - 45) + 'px';
  }

  //moving cursor
  const nextLetter = document.querySelector('.letter.current');
  const nextWord = document.querySelector('.word.current');
  const cursor = document.getElementById('cursor');

  cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top + 2 + 'px';
  cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right'] + 'px';
})

document.getElementById('reset-button').addEventListener('click', () => {
    location.reload();
    // gameOver();
    // newGame();
})

newGame();