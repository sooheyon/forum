"use client";

import { useRouter } from "next/navigation";

export default function DetailLink() {
  let router = useRouter();

  return (
    <button
      onClick={() => {
        router.back();
      }}
    >
      버튼
    </button>
  );
}

//router.refresh() soft refresh
//router.prefetch('/') 미리 로드하면 방문할때 빠르게 방문 가능  Link 태그사용하면 prefetch 동작함

// usePathname = 현재 url
// useSearchParams = query string
// useParams =  dynamic route 자리에 작성한것