import CreatePostForm from '@/components/create-post-form';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const CreatePost = async () => {
   const session = await getServerSession(authOptions);

   if (!session) {
      redirect('/sign-in');
   }

   return <CreatePostForm />;
};

export default CreatePost;
