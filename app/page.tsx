import CategoryList from '@/components/categori-list';
import Post from '@/components/post';
import { postsData } from '@/data';

export default function Home() {
   return (
      <>
         <CategoryList />
         {postsData && postsData.length > 0 ? (
            postsData.map((post) => (
               <Post
                  key={post.id}
                  id={post.id}
                  author={post.author}
                  date={post.datepublished}
                  thumbnail={post.thumbnail}
                  authorEmail=''
                  title={post.title}
                  content={post.content}
                  links={post.links || []}
                  category={post.category}
               />
            ))
         ) : (
            <div className='py-6'>No posts to display</div>
         )}
      </>
   );
}
