import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import Layout from "../components/Layout";
import utileStyle from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";

// SSGの場合
// getStaticProps() はNextjsが用意している関数
export async function getStaticProps() {
  const allPostsData = getPostsData();
  // id, title, date, thumbnail
  console.log(allPostsData);
  // getStaticProps() の特有の書き方
  return {
    props: {
      allPostsData,
    },
  };
}

/** 
// SSRの場合
export async function getServerSideProps(context) {
  // REST API や DBからデータを取得する処理
  return {
    props: {
      // コンポーネントにわたすためのprops
    },
  };
}
*/

// 外部のデータをSSGする場合に allPostsData を渡しておく
export default function Home({ allPostsData }) {
  return (
    <Layout>
      <section className={utileStyle.headingMd}>
        <p>
          私はフルスタックエンジニアです/Udemy講師として活動しています/好きな言語はJavascriptです
        </p>
      </section>

      <section className={`${utileStyle.headingMd} ${utileStyle.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utileStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utileStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
