export default function handler(req, res) {
  try {
    if(req.method !== 'DELETE'){
      return res.status(400).json({message:"Wrong Method"})
    }

    

    return res.status(200).json()

  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server Error" });
  }
}
