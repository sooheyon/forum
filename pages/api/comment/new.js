import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(400).json({ message: "Wrong Method" });
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(400).json({ message: "Not exist session" });
    }

    const { content, postId } = JSON.parse(req.body);

    if (!content || !postId) {
      return res.status(400).json({ message: "Not exist data" });
    }

    const db = (await connectDB).db("forum");
    const result = await db.collection("comment").insertOne({
      content,
      author: session.user.email,
      author_name: session.user.name,
      parent: new ObjectId(postId),
    });

    if (!result.insertedId) {
      throw "error";
    }

    const newComments = await db
      .collection("comment")
      .findOne({ _id: new ObjectId(result.insertedId) });

    return res.status(200).json(newComments);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server error" });
  }
}
