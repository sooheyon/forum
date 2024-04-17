import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    if (req.method === "DELETE") {
      const { id } = JSON.parse(req.body);
      console.log(id);
      const db = (await connectDB).db("forum");
      const result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(id) });
        
        if(result.deletedCount === 1){

          return res.status(200).json({ message: "삭제 완료" });
        }else{
          throw 'error'
        }
    } else {
      return res.status(400).json({ message: "Wrong method" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
}
