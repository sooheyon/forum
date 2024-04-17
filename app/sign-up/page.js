export default function SignUp() {
  return (
    <div>
      <h4>회원 가입</h4>
      <form action="api/user" method="post">
        <input name="account" placeholder="id를 입력해 주세요" />
        <input name="password" placeholder="password를 입력해 주세요" />
        <button type="submit">가입</button>
      </form>
    </div>
  );
}
