import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  // const db = (await connectDB).db("forum");
  // const result = await db.collection("post").find().toArray();

  console.log(req.query) 

  return res.status(200).json({message: true});
}

// 응답 안해주면 무한 응답 대기상태 됨
// status code
