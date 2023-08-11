// 햄버거 메뉴 js
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', function () {
  const mainElement = document.querySelector('.main');
  mainElement.classList.toggle('active');
});

// logout
function logout() {
  try {
    axios.post('http://localhost:3000/api/logout').then((response) => {
      alert('회원님! 살펴가십쇼!!');
    });
  } catch (error) {
    console.log(error);
  }
}
