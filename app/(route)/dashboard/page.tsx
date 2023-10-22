import Post from '@/components/post';
import { postsData } from '@/data';
import Link from 'next/link';

const Dashboard = () => {
   return (
      <div>
         <h1 className='mt-8 text-2xl font-bold'>My Post</h1>
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
            <div className='py-6'>
               No posts created yet.{' '}
               <Link className='underline' href={'/create-post'}>
                  Create New
               </Link>
            </div>
         )}
      </div>
   );
};

export default Dashboard;
