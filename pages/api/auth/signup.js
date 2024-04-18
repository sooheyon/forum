import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(400).json({ message: "Wrong Method" });
    }

    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Not exist data" });
    }

    const client = (await connectDB).db("forum");
    const existUser = await client.collection("user_cred").findOne({ email });

    if (existUser) {
      return res.status(400).json("Exist Account");
    }

    const result = await client
      .collection("user_cred")
      .insertOne({ name, email, password: hash });

    return res.status(200).json(result);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
