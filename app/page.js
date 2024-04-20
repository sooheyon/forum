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


//css 속성 중 prefers-color-scheme 사용하면 os테마에 맞춰 css 적용
/**
 * 동적 ui 만들기
 * 1. state 만들어서 ui 현재상태 보관
 * 2. state에 따라서 ui가 어떻게 보일지 작성
 * 3. 원할 때 state 변경
 */