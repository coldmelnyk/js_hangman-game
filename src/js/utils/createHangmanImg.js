export const createHangmanImg = () => {
  const image = document.createElement('img');
  image.src = './images/hg-0.png';
  image.id = 'hangman-img';
  image.classList.add('hangman-img');
  image.alt = 'hangman image';

  return image;
};