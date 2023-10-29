import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import PostForm from '@/components/post-form';

const CreatePost = async () => {
   const session = await getServerSession(authOptions);

   if (!session) {
      redirect('/sign-in');
   }

   return <PostForm />;
};

export default CreatePost;
