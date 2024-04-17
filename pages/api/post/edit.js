import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { title, content, _id } = req.body;

      if (!title || !content) {
        return res.status(400).json({ message: "Not exist data" });
      }

      const db = (await connectDB).db("forum");
      const result = await db
        .collection("post")
        .updateOne(
          { _id: new ObjectId(_id) },
          { $set: { title, content } }
        );

        return res.status(200).redirect('/list')
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
}

//$set -> $inc