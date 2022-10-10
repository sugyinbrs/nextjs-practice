import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  console.log("[id] router", router);
  return (
    <div>
      <h4>{router.query.title || "Loading... "}</h4>
    </div>
  );
}

// router.query.title 은 유저가 홈페이지에서 상세 페이지로 넘어갈 때만 보임
// 시크릿 모드에서 바로 상세 페이지 url 을 입력 해서 이동한다면 Loading 화면만 뜨게 됨