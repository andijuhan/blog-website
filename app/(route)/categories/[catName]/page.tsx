import Post from '@/components/post';
import { TPost } from '@/types';
import { notFound } from 'next/navigation';

const getPosts = async (catName: string): Promise<TPost[] | null> => {
   try {
      const res = await fetch(
         `${process.env.NEXTAUTH_URL}/api/categories/${catName}`,
         { next: { revalidate: 1 } }
      );
      if (res.ok) {
         const category = await res.json();

         const posts = category.posts;
         return posts;
      }
   } catch (error) {
      console.log(error);
      notFound();
   }
   return null;
};

const CategoryPosts = async ({ params }: { params: { catName: string } }) => {
   const catName = decodeURIComponent(params.catName);

   const posts = await getPosts(catName);

   return (
      <>
         <h1 className='mt-8 text-2xl font-bold'>
            <span className='font-normal'>Category:</span> {catName}
         </h1>
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
};

export default CategoryPosts;
