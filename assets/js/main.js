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

// 보드 생성
function boardCreate() {

}

// add a Card
function addCard(cardId, cardContent) {
  const popup = document.getElementById("cardAddPopup");
  const form = document.getElementById("cardForm");

  // 팝업에 정보 채우기!
  document.getElementById("cardId").value = cardId;
  document.getElementById("cardContent").value = cardContent;

  popup.style.display = "block";
}
function closePopup() {
  const popup = document.getElementById("cardAddPopup");
  popup.style.display = "none";
}

// 댓글 페이지로 이동!



// 보드 li 이동
