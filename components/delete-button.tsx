'use client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

interface DeleteButtonPros {
   postId: string;
}

const DeleteButton = ({ postId }: DeleteButtonPros) => {
   const router = useRouter();

   const handleDelete = async () => {
      const confirmed = window.confirm('Delete this post?');

      if (confirmed) {
         try {
            const res = await axios.delete(`/api/posts/${postId}`);

            if (res.status === 200) {
               toast.success('Post deleted.');
               router.refresh();
            }
         } catch (error) {
            toast.error('Something went wrong.');
            console.log(error);
         }
      }
   };
   return (
      <button onClick={handleDelete} className='text-red-600'>
         Delete
      </button>
   );
};

export default DeleteButton;
