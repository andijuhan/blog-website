import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import axios from 'axios';
import PostForm from '@/components/post-form';
import { TPost } from '@/types';

const getPost = async (id: string): Promise<TPost | null> => {
   try {
      const { data } = await axios.get(
         `${process.env.NEXTAUTH_URL}/api/posts/${id}`
      );
      return data;
   } catch (error) {
      console.log(error);
      redirect('/dashboard');
   }
};

const EditPost = async ({ params }: { params: { postId: string } }) => {
   const session = await getServerSession(authOptions);

   if (!session) {
      redirect('/sign-in');
   }

   const post = await getPost(params.postId);

   return <PostForm initialData={post} />;
};

export default EditPost;
