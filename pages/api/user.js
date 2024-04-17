import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  try {
    const { account, password } = req.body;

    if (!account || !password) {
      return res.status(400).json({ message: "Not exist data" });
    }

    const client = (await connectDB).db("forum");
    const existUser = await client.collection("user").findOne({ account });

    if (existUser) {
      return res.status(400).json("Exist Account");
    }

    const result = await client
      .collection("user")
      .insertOne({ account, password });

      return res.status(200).json(result)

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
