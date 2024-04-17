"use client";

import Link from "next/link";
import DetailLink from "./DetailLink";

export default function ListItem({ result }) {
  return (
    <div>
      {result.map((item, idx) => {
        const onClickDelete = (e) => {
          fetch('/api/abc/test?second=soohyeon&age=20') //query string 간편 더럽 민감한 정보x

          fetch("/api/post/delete", {
            method: "DELETE",
            body: JSON.stringify({ id: item._id }),
          })
            .then((response) => {
              if (response.status == 200) {
                return response.json();
              } else {
                // 서버가 에러코드 전송 시 실행
              }
            })
            .then((result) => {
              e.target.parentElement.style.opacity = 0
              setTimeout(()=>{
                e.target.parentElement.style.display = 'none'
              },1000)
              return console.log(result);


            })
            .catch((error) => {
              //인터넷 문제로 실패 시 실행
              console.error(error);
            });
        };

        return (
          <div className="list-item" key={idx}>
            <Link prefetch={false} href={`/detail/${item._id.toString()}`}>
              <h4>{item.title}</h4>
            </Link>
            <DetailLink />
            <Link href={`/edit/${item._id}`}>✏️</Link>
            <span onClick={onClickDelete}>🗑️</span>
            <p>1월 1일</p>
            <p>{item.content}</p>
          </div>
        );
      })}
    </div>
  );
}
