import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const client = (await connectDB).db("forum");
  let result = await client
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div>
      <h4>글 수정</h4>
      <form action={`/api/post/edit`} method="post">
        <input
          name="title"
          placeholder="글제목 입력 하세요"
          defaultValue={result.title}
        />
        <textarea
          name="content"
          placeholder="글내용 입력 하세요"
          defaultValue={result.content}
        />
        <input
          style={{ display: "none" }}
          name="_id"
          defaultValue={result._id.toString()}
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
