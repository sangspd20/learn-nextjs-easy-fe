import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

export type PostProps = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
export default function Post({ post }: { post: PostProps }) {
  const router = useRouter();
  console.log('router.query:', router.query);
  return (
    <div>
      {/* <h1>{post.title}</h1>
      <p>{post.body}</p> */}
    </div>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const posts = await res.json();

//   const paths = posts.map((post: PostProps) => ({
//     params: { id: post.id.toString() },
//   }));

//   return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${params?.id}`
//   );
//   const post = await res.json();

//   return { props: { post } };
// };
