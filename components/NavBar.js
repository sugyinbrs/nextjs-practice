import Link from "next/link";
import { useRouter } from "next/router";
// 프레임워크 Next.js 는 미리 갖춰놓음, 가져다 사용하기만 하면 됨
// package.json 의 dependencies 가 적음

export default function NavBar() {
  const router = useRouter();
  console.log("router", router);

  return (
    <nav>
      <Link href="/">
        <a style={{ color: router.pathname === "/" ? "red" : "blue" }}>Home</a>
      </Link>
      <Link href="/about">
        <a style={{ color: router.pathname === "/about" ? "red" : "blue" }}>
          About
        </a>
      </Link>
    </nav>
  );
}
