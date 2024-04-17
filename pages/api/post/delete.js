import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  try {
    if (req.method === "DELETE") {

      const session = await getServerSession(req,res,authOptions)

      if(!session){
        return res.status(400).json({message:'Not exist session'})
      }


      const { id } = JSON.parse(req.body);
      const db = (await connectDB).db("forum");

      const existPost = await db.collection('post').findOne({_id:new ObjectId(id)});

      if(!existPost){
        return res.status(400).json({message:"Not exist post"})
      }

      if(session.user.email !== existPost.author){
        return res.status(400).json({message:"Access denied"})
      }


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
