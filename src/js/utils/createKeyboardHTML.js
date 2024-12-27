import { KEYBOARD_LETTERS } from './consts';

export const createKeyboardHTML = () => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  keyboard.id = 'keyboard';

  const keyboardHTML = KEYBOARD_LETTERS.reduce(
    (acc, curr) =>
      acc +
      `<button id="${curr}" type="button" class=" disabled:opacity-20 disabled:cursor-not-allowed dark:text-white dark:bg-indigo-500 enabled:dark:hover:bg-indigo-600 font-medium rounded-lg p-2 bg-slate-200 enabled:hover:bg-slate-300 w-10 h-10 sm:w-14 sm:h-14 m-1 sm:m-2" >${curr}</button>`,
    ''
  );

  keyboard.innerHTML = keyboardHTML;
  return keyboard;
};
