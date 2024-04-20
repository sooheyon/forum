// "use client";

import { connectDB } from "@/util/database";
import { handleSubmit } from "./actions";
import { revalidatePath } from "next/cache";

export default async function Write2() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post_test").find().toArray();

  async function handleSubmit2(formData) {
    "use server";
    const db = (await connectDB).db("forum");

    await db
      .collection("post_test")
      .insertOne({ title: formData.get("title") });

    revalidatePath('/write2') // 전체 새로고침 x 차이점만 바꾸기
  }

  return (
    <div>
      <form action={handleSubmit2}>
        <input name="title"></input>
        <button type="submit">버튼</button>
      </form>
      {result
        ? result.map((post) => {
            return <p>글제목: {post.title}</p>;
          })
        : null}
    </div>
  );
}
