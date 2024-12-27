export const createPlaceholdersHTML = () => {
  const wordFromSessionStore = sessionStorage.getItem('wordToGuess');
  const placeholdersOfWordToGuess = Array.from(wordFromSessionStore).reduce(
    (acc, curr, i) =>
      acc + `<h1 id="letter_${i}" class="mx-2 text-3xl font-medium">_</h1>`,
    ''
  );

  return `<div id="placeholders" class="flex flex-row">${placeholdersOfWordToGuess}</div>`;
};