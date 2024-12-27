import '../css/style.css';
import { startGame } from './game';
import { handleTheme } from './utils';

handleTheme();

const startGameButton = document.getElementById('startGame');

startGameButton.addEventListener('click', () => {
  alert('Game started!');
  startGame();
});
