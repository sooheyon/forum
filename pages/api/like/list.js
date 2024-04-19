export default function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(400).json({ message: "Wrong Method" });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Server error" });
  }
}
