"use client";

import { useState } from "react";

export default function ImageUploader() {
  const [src, setSrc] = useState("");

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          let file = e.target.files[0];
          let filename = encodeURIComponent(file.name); //한글파일명 깨지기때문
          let res = await fetch(`api/post/image?file=${filename}`);
          res = await res.json();

          const formData = new FormData();

          Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
            formData.append(key, value);
          });

          let result = await fetch(res.url, {
            method: "POST",
            body: formData,
          });

          console.log(result.url + "/" + filename);
          if (result.ok) {
            setSrc(result.url + "/" + filename);
          }
        }}
      />
      <img src={src} />
    </div>
  );
}
