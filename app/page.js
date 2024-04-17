import { connectDB } from "@/util/database";


export const revalidate = 60 //페이지 캐싱

export default async function Home() {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();
  console.log(result);
  //db 직접 출력 결과 캐시 방법
  //1. 서버 api로 변경 (fetch)
  //2. revalidate 옵션 사용

  // await fetch("/", {
  //   cache: "force-cache", //force-cache 디폴트 <-> no store 실시간 데이터 중요시
  //   next: { revalidate: 60 }, // 60초마다 캐싱된 데이터 갱신
  // });

  return <div>안녕</div>;
}
