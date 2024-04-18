export default function SignUp() {
  return (
    <div>
      <h4>회원 가입</h4>
      <form action="api/auth/signup" method="POST">
        <input name="name" placeholder="이름" />
        <input name="email" placeholder="이메일" />
        <input name="password" placeholder="비밀번호" />
        <button type="submit">가입 요청</button>
      </form>
    </div>
  );
}
