/*
_app.js (프레임워크 내에 설정된 파일명)
Next.js 가 모든 페이지를 렌더링 할 수 있게 하는 파일
Next.js 확인 순서
* _app.js -> index.js

주로 google analytics, SEO 와 관련된 것 등등과 관련된 코드를 구성하는 곳이기에
Layout 이라는 컴포넌트를 사용하여 가볍게 처리
 */

import Layout from "../components/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
