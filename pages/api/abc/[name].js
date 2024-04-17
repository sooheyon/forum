// url 파라미터 문법

export default function handler(req, res) {
  console.log(req.query);
  return res.status(200).json();
}
