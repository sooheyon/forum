"use client";

import { useEffect, useState } from "react";

export default function Comment({ postId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const onClickSend = async () => {
    const result = await fetch("/api/comment/new", {
      method: "POST",
      body: JSON.stringify({ content: comment, postId }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setComments((prev) => [...prev, res]);
      });
    console.log(result);
  };

  async function getComments() {
    fetch(`/api/comment/list?postId=${postId}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setComments(res);
      });
  }

  const commentsMap = comments.map((comment, idx) => {
    return (
      <div className="comment-item">
        <p className="comment-author">{comment.author_name ?? '익명'}</p>
        <p className="comment-content" key={idx}>{comment.content}</p>
      </div>
    );
  });

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <hr></hr>
      <div>{comments.length > 0 ? commentsMap : "댓글 없음"}</div>
      <input value={comment} onChange={onChangeComment} />
      <button onClick={onClickSend}>댓글 전송</button>
    </div>
  );
}
