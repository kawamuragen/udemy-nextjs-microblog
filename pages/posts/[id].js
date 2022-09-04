import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";

// 動的ルートページにもSSG設定を行う
// Next.jsで用意されている関数
export async function getStaticPaths() {
  const paths = getAllPostIds();
  // fallback: false -> pathsに含まれてない他のページは404になる
  // fallback: true -> 予期しないページを生成しようとしてくれる→ERRORになる
  return {
    paths,
    fallback: false,
  };
}

// getStaticPathsを使うときは合わせてgetStaticPropsを使ってPost()にわたす必要がある
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

// nf
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        {/* Reactで用意されているHTML文字列をDOMに挿入するもの */}
        {/* 他人が悪意のあるコードを書くと、問題あり。本来はサニタイズする必要がある */}
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
      </article>
    </Layout>
  );
}
