import CategoryList from '@/components/categori-list';
import Post from '@/components/post';
import { TPost } from '@/types';

const getPosts = async (): Promise<TPost[] | null> => {
   try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
         cache: 'no-store',
      });
      if (res.ok) {
         const posts = await res.json();
         return posts;
      }
   } catch (error) {
      console.log(error);
   }
   return null;
};

export default async function Home() {
   const posts = await getPosts();

   return (
      <>
         <CategoryList />
         {posts && posts.length > 0 ? (
            posts.map((post) => (
               <Post
                  key={post.id}
                  id={post.id}
                  author={post.author.name}
                  date={post.updatedAt}
                  thumbnail={post.imageUrl}
                  authorEmail={post.authorEmail}
                  title={post.title}
                  content={post.content}
                  links={post.links || []}
                  category={post.catName}
               />
            ))
         ) : (
            <div className='py-6'>No posts to display</div>
         )}
      </>
   );
}
