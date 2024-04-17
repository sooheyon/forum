import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  try {
    if (req.method == "POST") {
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({ message: "Not exist data" });
      }

      const db = (await connectDB).db("forum");
      const result = await db.collection("post").insertOne({ title, content });
      return res.status(200).json(result).redirect("/list");
    } else{
      return res.status(400).json({ message: "Not POST" });
    }
  } catch (error) {
    console.error(error);
    return req.status(500).json("Server Error");
  }
}
