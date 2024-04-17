import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  try {
    if (req.method == "POST") {
      const { title, content } = req.body;

      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res.status(400).json({ message: "Not exist session" });
      }

      if (!title || !content) {
        return res.status(400).json({ message: "Not exist data" });
      }

      const db = (await connectDB).db("forum");
      const result = await db
        .collection("post")
        .insertOne({ title, content, author: session.user.email });
      return res.status(200).redirect("/list");
    } else {
      return res.status(400).json({ message: "Not POST" });
    }
  } catch (error) {
    console.error(error);
    return req.status(500).json("Server Error");
  }
}
