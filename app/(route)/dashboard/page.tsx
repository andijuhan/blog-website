import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Post from '@/components/post';
import { TPost } from '@/types';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const getPosts = async (email: string) => {
   try {
      const res = await fetch(
         `${process.env.NEXTAUTH_URL}/api/authors/${email}`,
         {
            cache: 'no-store',
         }
      );
      const { posts } = await res.json();

      return posts;
   } catch (error) {
      console.log(error);
      return null;
   }
};

const Dashboard = async () => {
   const session = await getServerSession(authOptions);

   const email = session?.user?.email;

   let posts = [];

   if (!session) {
      redirect('/sign-in');
   }

   if (email) {
      posts = await getPosts(email);
   }

   return (
      <div>
         <h1 className='mt-8 text-2xl font-bold'>My Post</h1>
         {posts && posts.length > 0 ? (
            posts.map((post: TPost) => (
               <Post
                  key={post.id}
                  id={post.id}
                  author=''
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
