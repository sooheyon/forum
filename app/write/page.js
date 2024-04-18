import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Write() {
  const session = await getServerSession(authOptions);

  if (!session) return <div>로그인 후 작성해 주세요</div>;

  return (
    <div>
      <h4>글 작성</h4>
      <form action="/api/post/new" method="post">
        <input name="title" placeholder="글제목 입력 하세요" />
        <textarea name="content" placeholder="글내용 입력 하세요" />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
