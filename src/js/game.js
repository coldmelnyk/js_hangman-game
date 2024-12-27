import { createHangmanImg, createPlaceholdersHTML, WORDS } from './utils';
import { createKeyboardHTML } from './utils/createKeyboardHTML';

const gameDiv = document.getElementById('game');
const logoH1 = document.getElementById('logo');

let triesLeft;
let winCount;

const checkLetter = letter => {
  const wordWeAreGuessing = sessionStorage.getItem('wordToGuess').toLowerCase();
  const inputLetter = letter.toLowerCase();

  if (!wordWeAreGuessing.includes(inputLetter)) {
    const triesLeftSpan = document.getElementById('tries-left');
    const hangmanImage = document.getElementById('hangman-img');

    triesLeft -= 1;

    if (triesLeft === 0) {
      stopGame('lose');

      return;
    }

    triesLeftSpan.innerText = triesLeft;
    hangmanImage.src = `./images/hg-${10 - triesLeft}.png`;
  } else {
    Array.from(wordWeAreGuessing).forEach((ch, i) => {
      if (ch === inputLetter) {
        winCount++;

        if (winCount === wordWeAreGuessing.length) {
          stopGame('win');

          return;
        }
        const letterToReplace = document.getElementById(`letter_${i}`);
        letterToReplace.innerText = inputLetter.toUpperCase();
      }
    });
  }
};

export const startGame = () => {
  triesLeft = 10;
  winCount = 0;

  logoH1.classList.add('logo-small');
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];

  sessionStorage.setItem('wordToGuess', wordToGuess);

  gameDiv.innerHTML = createPlaceholdersHTML();

  gameDiv.innerHTML += `<p id="tries-text" class="mt-2">TRIES LEFT: <span id="tries-left"
    class="font-medium text-red-600">${triesLeft}</span></p>`;

  const keyboardDiv = createKeyboardHTML();

  keyboardDiv.addEventListener('click', event => {
    if (event.target.tagName.toLowerCase() === 'button') {
      checkLetter(event.target.id);
      event.target.disabled = true;
    }
  });
  gameDiv.appendChild(keyboardDiv);

  gameDiv.prepend(createHangmanImg());

  gameDiv.insertAdjacentHTML(
    'beforeend',
    '<button id="quit" class="px-2 py-1 mt-4 border border-black hover:bg-slate-100 dark:border-white dark:hover:bg-zinc-600 rounded-md ">Quit</button>'
  );
  document.getElementById('quit').onclick = () => {
    if (confirm('Are you sure you want to quit and lose your progress?')) {
      stopGame('quit');
    }
  };
};

const stopGame = status => {
  const imageOfHangman = document.getElementById('hangman-img');
  const wordWeAreGuessing = sessionStorage.getItem('wordToGuess');
  
  document.getElementById('quit').remove();
  document.getElementById('placeholders').remove();
  document.getElementById('tries-text').remove();
  document.getElementById('keyboard').remove();

  if (status === 'win') {
    imageOfHangman.src = './images/hg-win.png';
    gameDiv.innerHTML +=
      '<h2 class="text-2xl font-bold text-lime-600 mt-4 " >You won!</h2>';
  }

  if (status === 'lose') {
    imageOfHangman.src = './images/hg-10.png';
    gameDiv.innerHTML +=
      '<h2 class="text-2xl font-bold text-red-600 mt-4" >You lost :(</h2>';
  }

  if (status === 'quit') {
    logoH1.classList.remove('logo-small');
    document.getElementById('hangman-img').remove();
  }

  gameDiv.innerHTML += `<p>The word was: <span class="font-medium">${wordWeAreGuessing.toUpperCase()}</span></p>
    <button type="button" id="play-again" class="disabled:opacity-20 disabled:cursor-not-allowed dark:text-white dark:bg-indigo-500 enabled:dark:hover:bg-indigo-600 font-medium rounded-lg p-2 bg-slate-200 enabled:hover:bg-slate-300 px-5 py-2 mt-5"
      >
        Play again
    </button>`;
  document.getElementById('play-again').onclick = startGame;
};
