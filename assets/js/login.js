
// login
function login() {
  const data = {
    loginId: $('#loginId').val(),
    password: $('#password').val(),
  };
  axios
    .post('http://localhost:3000/api/login', data)
    .then((response) => {
      console.log(data);
      alert('회원님 어서오세요');
      location.href = '../index.html';
    })
    .catch((error) => {
      alert('회원가입을 해주시거나 계정정보를 다시 확인해주세요.'); // 로그인 실패 시 얼럿 메시지 표시
      location.href = '../login.html';
    });
}