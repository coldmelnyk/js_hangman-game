export const handleTheme = () => {
  const themeToggler = document.getElementById('toggleTheme');
  const htmlElement = document.documentElement;

  if (localStorage.getItem('theme') === 'dark') {
    htmlElement.classList.add('dark');
    themeToggler.checked = true;
  }

  themeToggler.addEventListener('input', () => {
    htmlElement.classList.toggle('dark');

    if (htmlElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
};
