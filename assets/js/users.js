// 1. login
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
      location.href = './index.html';
    })
    .catch((error) => {
      alert('회원이 아닙니다'); // 로그인 실패 시 얼럿 메시지 표시
      console.log(error);
    });
}

// 2. signup
function signUp() {
  const data = {
    loginId: $('#loginId').val(),
    password: $('#password').val(),
    confirm: $('#passwordConfirm').val(),
    nickname: $('#nickname').val(),
  };
  console.log(data);
  axios
    .post('http://localhost:3000/api/signup', data)
    .then((response) => {
      // 회원가입 성공 시
      alert('회원가입이 완료되었습니다.');
      location.href = './index.html';
    })
    .catch(function (error) {
      alert('회원가입에 실패하였습니다. 다시 돌아가주세요.');
      location.href = './signup.html';
    });
}

// 3. 회원 수정

// 4. 회원 탈퇴
