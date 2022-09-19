import Head from "next/head"; // Next.js 제공, React-Helmet 과 같은 역할
import Seo from "../components/Seo";

export default function Home() {
  return (
    <div>
      <Seo title="Home" />
      <h1>Hello</h1>
    </div>
  );
}
