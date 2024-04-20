import aws from "aws-sdk";

export default async function handler(req, res) {
  try {
    aws.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
      region: "ap-northeast-2",
      signatureVersion: "v4",
    });

    const s3 = new aws.S3();

    const url = await s3.createPresignedPost({
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      Fields: { key: req.query.file },
      Expires: 60,
      Conditions: [["content-length-range", 0, 1048576]],
    });

    return res.status(200).json(url);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
