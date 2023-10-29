'use client';
import { HiPlus } from 'react-icons/hi2';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiLink, HiOutlineTrash } from 'react-icons/hi2';
import { TCategory, TPost } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface PostFormProps {
   initialData?: TPost | null;
}

const PostForm = ({ initialData }: PostFormProps) => {
   const [links, setLinks] = useState<string[]>(initialData?.links || []);
   const [linkInput, setLinkInput] = useState('');
   const [title, setTitle] = useState(initialData?.title || '');
   const [content, setContent] = useState(initialData?.content || '');
   const [categories, setCategories] = useState<TCategory[]>([]);
   const [selectedCategory, setSelectedCategory] = useState(
      initialData?.catName || ''
   );
   const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
   const [publicId, setPublicId] = useState(initialData?.publicId || '');
   const [error, setError] = useState('');
   const router = useRouter();

   useEffect(() => {
      const fetchAllCategories = async () => {
         const res = await axios.get('/api/categories');
         setCategories(res.data);
      };
      fetchAllCategories();
   }, []);

   const onAddLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (linkInput.trim() !== '') {
         setLinks((prev) => [...prev, linkInput]);
         setLinkInput('');
      }
   };

   const onDeleteLink = (deleteLink: string) => {
      setLinks((prev) => prev.filter((link) => link !== deleteLink));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!title || !content) {
         setError('Title & content are require');
         return;
      }

      try {
         if (initialData) {
            const res = await axios.patch(`/api/posts/${initialData.id}`, {
               title,
               content,
               links,
               selectedCategory,
            });
            if (res.status === 200) {
               router.refresh();
               router.push('/dashboard');
               toast.success('Post updated.');
            }
         } else {
            const res = await axios.post('/api/posts', {
               title,
               content,
               links,
               selectedCategory,
               imageUrl,
            });
            if (res.status === 200) {
               router.refresh();
               router.push('/dashboard');
               toast.success('New post added.');
            }
         }
      } catch (error) {
         toast.error('Something went wrong.');
         console.log(error);
      }
   };

   return (
      <div>
         <h2 className='text-2xl font-bold my-4'>Create Post</h2>
         <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <input
               onChange={(e) => setTitle(e.target.value)}
               value={title}
               type='text'
               placeholder='Title'
            />
            <textarea
               onChange={(e) => setContent(e.target.value)}
               placeholder='Content'
               value={content}
            ></textarea>
            {links &&
               links.map((link, index) => (
                  <div className='flex gap-4 items-center' key={index}>
                     <HiLink size={25} />
                     <Link className='link' href={link}>
                        {link}
                     </Link>
                     <HiOutlineTrash
                        onClick={() => onDeleteLink(link)}
                        className='cursor-pointer'
                        size={25}
                     />
                  </div>
               ))}
            <div className='flex gap-2'>
               <input
                  className='flex-1'
                  type='text'
                  onChange={(e) => setLinkInput(e.target.value)}
                  value={linkInput}
                  placeholder='Input the link'
               />
               <button
                  onClick={onAddLink}
                  className='btn flex gap-2 items-center'
               >
                  <HiPlus />
                  Add
               </button>
            </div>
            <select
               onChange={(e) => setSelectedCategory(e.target.value)}
               className='p-3 rounded-md border appearance-none'
               value={selectedCategory}
            >
               <option value=''>Select A Category</option>
               {categories &&
                  categories.map((category) => (
                     <option key={category.id} value={category.catName}>
                        {category.catName}
                     </option>
                  ))}
            </select>

            <button className='primary-btn' type='submit'>
               {initialData ? 'Update Post' : 'Create Post'}
            </button>
            {error ? (
               <div className='p-3 text-red-500 font-bold'>{error}</div>
            ) : null}
         </form>
      </div>
   );
};

export default PostForm;
