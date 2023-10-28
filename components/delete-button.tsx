'use client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface DeleteButtonPros {
   postId: string;
}

const DeleteButton = ({ postId }: DeleteButtonPros) => {
   const router = useRouter();

   const handleDelete = async () => {
      const confirmed = window.confirm('Delete this post?');

      if (confirmed) {
         try {
            const res = await fetch(`/api/posts/${postId}`, {
               method: 'DELETE',
               headers: {
                  'Content-type': 'application/json',
               },
            });

            if (res.ok) {
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
