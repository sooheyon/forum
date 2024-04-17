export default function Write() {
  return (
    <div>
      <h4>글작성</h4>
      <form action="/api/post/new" method="post">
        <input name="title" placeholder="글제목 입력 하세요" />
        <textarea name="content" placeholder="글내용 입력 하세요" />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
