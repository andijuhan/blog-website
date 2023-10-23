'use client';
import { HiPlus } from 'react-icons/hi2';
import { categoriesData } from '@/data';
import { useState } from 'react';
import Link from 'next/link';
import { HiLink, HiOutlineTrash } from 'react-icons/hi2';

const CreatePostForm = () => {
   const [links, setLinks] = useState<string[]>([]);
   const [linkInput, setLinkInput] = useState('');

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

   return (
      <div>
         <h2 className='text-2xl font-bold my-4'>Create Post</h2>
         <form className='flex flex-col gap-2'>
            <input type='text' placeholder='Title' />
            <textarea placeholder='Content'></textarea>
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
            <select className='p-3 rounded-md border appearance-none'>
               <option value=''>Select A Category</option>
               {categoriesData &&
                  categoriesData.map((category) => (
                     <option key={category.id} value={category.id}>
                        {category.name}
                     </option>
                  ))}
            </select>

            <button className='primary-btn' type='submit'>
               Create Post
            </button>

            <div className='p-3 text-red-500 font-bold'>Error Message</div>
         </form>
      </div>
   );
};

export default CreatePostForm;
