import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(400).json({ message: "Wrong method" });
    }

    const { postId, user } = req.body;

    if (!postId || !user) {
      return res.status(400).json({ message: "Not exist data" });
    }
    const db = (await connectDB).db("forum");
    const existPost = await db
      .collection("post")
      .findOne({ _id: new ObjectId(postId) });

    if (!existPost) {
      return res.status(400).json({ message: "Not exist post" });
    }

    const result = await db.collection("like").insertOne({ user, postId });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server error" });
  }
}
