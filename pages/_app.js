/*
_app.js (프레임워크 내에 설정된 파일명)
Next.js 가 모든 페이지를 렌더링 할 수 있게 하는 파일
Next.js 확인 순서
* _app.js -> index.js
 */

import NavBar from "../components/NavBar";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <style jsx global>{`
        a {
          color: white;
        }
      `}</style>
    </>
  );
}
