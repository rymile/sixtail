function cmt(cmtContent) {
    const data = {
        cmt: $('#cmtContent').val(),
      };
      axios
        .post('http://localhost:3000/api/cmt', data)
        .then((response) => {
          console.log(data);
          alert('댓글이 등록되었습니다');
          location.href = './cmt.html';
        })
        .catch((error) => {
          alert('댓글을 만들 수 없습니다.'); // 로그인 실패 시 얼럿 메시지 표시
          console.log(error);
        });
}