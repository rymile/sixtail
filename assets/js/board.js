// 보드생성 페이지로 이동 함수
function boardCreate() {
    window.location.href = '../board.html';
  }
// 보드 생성
function bCreate() {
const data = {
    boardTitle: $('#boardTitle').val(),
    boardContent: $('#boardContent').val(),
};
axios
    .post('http://localhost:3000/api/board', data)
    .then((response) => {
    console.log(data);
    alert('보드 생성 완료');
    // addBoardToList(boardTitle,boardContent)
    location.href = '../index.html';
    })
    .catch((error) => {
    alert('보드생성 실패');
    console.log(error);
    });
}

// function addBoardToList(boardTitle, boardContent) {
//   const boardList = document.querySelector(".board");

//   const li = document.createElement("li")
// li.innerHTML = `
//     <a href="#">
//       <h3>${title}</h3>
//       <p>${content}</p>
//     </a>
//     <button class="addBtn">+ Add a card</button>
//   `;
  
//   boardList.appendChild(li)
// }
