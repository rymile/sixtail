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

// 보드 값 출력
const data = {
  boardTitle: $('#boardTitle').val(),
  boardContent: $('#boardContent').val(),
};
axios
 .get('http://localhost:3000/api/board/get', data)
  .then((response) => {
  console.log(response);
  alert('보드 db get 완료');
  const dataArray = response.data.data;
        generateTableRows(dataArray);
  })
  .catch((error) => {
  alert('보드 정보 조회 실패!');
  console.log(error);
});

// 테이블 행을 동적으로 생성하는 함수
function generateTableRows(dataArray) {
  const board = document.querySelector("#board");
  if (!board) {
    console.error("#board 요소를 찾을 수 없습니다.");
    return;
  }

  board.innerHTML = ""; // 기존의 행들을 삭제합니다.

  for (let i = 0; i < dataArray.length; i++) {
    const item = dataArray[i];

    const listItem = document.createElement("li");
    listItem.classList.add("boardRow");

    const cardLink = document.createElement("a");
    cardLink.href = "#";

    const cardTitle = document.createElement("h3");
    cardTitle.textContent = item.boardTitle;
    cardLink.appendChild(cardTitle);

    const cardContent = document.createElement("p");
    cardContent.textContent = item.boardContent;
    cardContent.setAttribute("onclick", "location.href='cmt.html'");
    cardLink.appendChild(cardContent);

    listItem.appendChild(cardLink);

    const addButton = document.createElement("button");
    addButton.classList.add("addBtn");
    addButton.textContent = "+ Add a card";
    addButton.onclick = openPopup;
    listItem.appendChild(addButton);

    board.appendChild(listItem);
  }
}

// 카드 추가 팝업 열기
function openPopup() {
  const popup = document.getElementById("cardAddPopup");
  popup.style.display = "block";
}

// 카드 추가 팝업 닫기
function closePopup() {
  const popup = document.getElementById("cardAddPopup");
  popup.style.display = "none";
}

// 카드 추가 함수
function addCard() {
  const cardContentInput = document.getElementById("cardContent");
  const cardContent = cardContentInput.value;

  if (cardContent.trim() !== "") {
    // 여기에서 서버에 카드 데이터를 전송하는 로직을 추가할 수 있음

    const dataArray = [
      // 새로운 카드 데이터를 추가해야 함
      { boardTitle: "New Title", boardContent: cardContent } // 예시 데이터
    ];

    generateTableRows(dataArray); // 테이블 다시 생성
    closePopup(); // 팝업 닫기
  }
}

// 초기 데이터로 테스트용 데이터 배열 생성
const initialDataArray = [
  { boardTitle: "To Do", boardContent: "content" }
];

// 초기 데이터로 테이블 생성
generateTableRows(initialDataArray);


// add a Card
function addCard(cardId, cardContent) {
  const popup = document.getElementById("cardAddPopup");
  const form = document.getElementById("cardForm");

  // 팝업에 정보 채우기!
  document.getElementById("cardId").value = cardId;
  document.getElementById("cardContent").value = cardContent;

  popup.style.display = "block";
}
