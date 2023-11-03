import Post from '@/components/post';
import { TPost } from '@/types';
import { notFound } from 'next/navigation';

const getCategoryPosts = async (catSlug: string) => {
   try {
      const res = await fetch(
         `${process.env.NEXTAUTH_URL}/api/categories/${catSlug}`,
         { next: { revalidate: 0 } }
      );
      if (res.ok) {
         const category = await res.json();

         return category;
      } else {
         notFound();
      }
   } catch (error) {
      notFound();
   }
};

const CategoryPosts = async ({ params }: { params: { catSlug: string } }) => {
   const categoryPost = await getCategoryPosts(params.catSlug);

   return (
      <>
         <h1 className='mt-8 text-2xl font-bold'>
            <span className='font-normal'>Category:</span>{' '}
            {categoryPost?.catName}
         </h1>
         {categoryPost?.posts && categoryPost?.posts.length > 0 ? (
            categoryPost.posts.map((post: TPost) => (
               <Post
                  key={post.id}
                  id={post.id}
                  author={post.author.name}
                  date={post.updatedAt}
                  thumbnail={post.imageUrl}
                  authorEmail={post.authorEmail}
                  title={post.title}
                  slug={post.slug}
                  content={post.content}
                  links={post.links || []}
                  catName={post.catName}
               />
            ))
         ) : (
            <div className='py-6'>No posts to display</div>
         )}
      </>
   );
};

export default CategoryPosts;
