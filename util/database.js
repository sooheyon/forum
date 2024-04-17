import { MongoClient } from "mongodb";
const url =
  "mongodb+srv://SoohyeonJo:siIX5C2Yv66samHw@cluster0.oxkdua9.mongodb.net/?retryWrites=true&w=majority";
const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }

  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}

export { connectDB };

//다른 데이터 베이스 생성을 막으려면 net/ 뒤에 정확한 db 이름을 기입해야함