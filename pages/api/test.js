import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const db = (await connectDB).db("forum");
    const result = await db.collection("post").find().toArray();

    return res.status(200).json(result);
  }
  return res.status(200).json("처리 완료");
}

// 응답 안해주면 무한 응답 대기상태 됨
// status code
