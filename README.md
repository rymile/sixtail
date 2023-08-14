# Sixtail Board

내배캠 Sixtail 협업툴 프로젝트

와이어프레임
![와이어프레임](https://github.com/tuy112/sixtail/assets/46676916/675d5b39-ddd3-4451-914d-5d54b120a1c9)

ERD
![ERD](https://github.com/tuy112/sixtail/assets/46676916/52d0b684-cb45-48de-8679-7302d9a5e166)

API 주소
https://jh-healing-place.tistory.com/124

<h2>보드</h2>
보드 생성: <POST> localhost:3000/api/board <br>
보드 수정: <PUT> localhost:3000/api/board/:boardId <br>
보드 삭제: <DELETE> localhost:3000/api/board/:boardId <br>
보드 상세조회: <GET> localhost:3000/api/board/:boardId <br>
보드 권한 설정 <POST> localhost:3000/api/board/auth/:boardId

<h2컬럼</h2>
컬럼 생성: <POST> localhost:3000/api/column/:boardId <br>
컬럼 수정: <PUT> localhost:3000/api/column/:columnId <br>
컬럼 삭제: <DELETE> localhost:3000/api/column/:columnId <br>
컬럼 이동: <PATCH> localhost:3000/api/column/:boardId/move/:columnId

<h2>카드</h2>
카드 생성: <POST> localhost:3000/api/cardmanage/:columnId <br>
카드 수정: <PUT> localhost:3000/api/cardmanage/:cardId <br>
카드 삭제: <DELETE> localhost:3000/api/cardmanage/:cardId <br>
<!-- 카드 이동: <PATCH> localhost:3000/api/cardmanage/:boardId/move/:columnId -->
카드 댓글 생성: <POST> localhost:3000/api/cardcmt/:cardId <br>
카드 댓글 수정: <PUT> localhost:3000/api/cardcmt/:cmtId <br>
카드 댓글 삭제: <DELETE> localhost:3000/api/cardcmt/:cmtId

<h2>유저</h2>
회원가입 <POST> localhost:3000/api/signup <br>
로그인 <POST> localhost:3000/api/login <br>
유저 조회 <GET> localhost:3000/api/user <br>
유저 정보 수정 <PUT> localhost:3000/api/user <br>
유저 삭제 <DELETE> localhost:3000/api/user
