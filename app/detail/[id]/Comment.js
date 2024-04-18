"use client";

import { useState } from "react";

export default function Comment() {
  const [comment, setComment] = useState("");

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const onClickSend = async () => {
    fetch("/", { method: "POST", body: comment });
  };

  return (
    <div>
      <div>댓글 목록</div>
      <input value={comment} onChange={onChangeComment} />
      <button onClick={onClickSend}>댓글 전송</button>
    </div>
  );
}
