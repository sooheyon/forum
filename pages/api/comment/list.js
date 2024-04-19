import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(400).json({ message: "Wrong Method" });
    }

    const { postId } = req.query;

    if (!postId) {
      return res.status(400).json({ message: "Not exist post id" });
    }

    const db = (await connectDB).db("forum");
    const result = await db
      .collection("comment")
      .find({ parent: new ObjectId(postId) })
      .toArray();

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
}
