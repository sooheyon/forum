"use client"; //필수

export default function Error({ error, reset }) {
  return (
    <div>
      <h4>에러 났어여</h4>
      <button
        onClick={() => {
          reset();
        }}
      >
        리셋
      </button>
    </div>
  );
}

//없으면 상위폴더로 가서 찾아서 에러 페이지 보여줌 (로딩도 같은 동작)
//layout.js error는 체크 못함 => global-error.js