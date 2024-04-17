import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  const listItemMap = result.map((item, idx) => {
    return (
      <div className="list-item" key={idx}>
        <Link prefetch={false} href={`/detail/${item._id.toString()}`}>
          <h4>{item.title}</h4>
        </Link>
        <DetailLink />
        <p>1월 1일</p>
        <p>{item.content}</p>
      </div>
    );
  });

  return <div className="list-bg">{listItemMap}</div>;
}
