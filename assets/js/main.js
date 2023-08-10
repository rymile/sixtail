const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', function () {
  const mainElement = document.querySelector('.main');
  mainElement.classList.toggle('active');
});
