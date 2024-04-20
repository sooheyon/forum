import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import ImageUploader from "./ImageUploader";

export default async function Write() {
  const session = await getServerSession(authOptions);

  if (!session) return <div>로그인 후 작성해 주세요</div>;

  return (
    <div>
      <h4>글 작성</h4>
      <form action="/api/post/new" method="post">
        <input name="title" placeholder="글제목 입력 하세요" />
        <textarea name="content" placeholder="글내용 입력 하세요" />
        <ImageUploader />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
//presigned url 방식으로 이미지 서버 안거치고 바로 s3 업로드 <-> createObjectURL

/**
 * 1. 브라우저가 서버에 presigned url 요청
 * 2. 서버는 권한 확인 후 presigned url 전송
 * 3. url로 s3에서 이미지 업로드
 * 4. 이미지의 url 받아서 사용
 */