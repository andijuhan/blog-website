import Image from 'next/image';
import Link from 'next/link';
import { HiLink } from 'react-icons/hi2';
import DeleteButton from './delete-button';

interface PostProps {
   id: string;
   author: string;
   date: string;
   thumbnail?: string;
   authorEmail?: string;
   title: string;
   content: string;
   links?: string[];
   category?: string;
}

const Post = ({
   id,
   author,
   date,
   thumbnail,
   authorEmail,
   title,
   content,
   links,
   category,
}: PostProps) => {
   const isEditable = true;

   return (
      <div className='my-4 py-8 border-b border-b-300'>
         <div className='mb-4'>
            Posted by: <span className='font-bold'>{author}</span> on {date}
         </div>
         <div className='w-full h-72 relative'>
            {thumbnail ? (
               <Image
                  src={thumbnail}
                  alt={title}
                  fill
                  className='object-cover object-center rounded-md'
               />
            ) : (
               <Image
                  src={'/thumbnail-placeholder.png'}
                  alt={title}
                  fill
                  className='object-cover object-center rounded-md'
               />
            )}
         </div>
         {category && (
            <Link
               className='bg-slate-800 w-fit text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block'
               href={`/categories/${category}`}
            >
               {category}
            </Link>
         )}
         <h2 className='text-2xl font-bold my-4'>{title}</h2>
         <p className='leading-loose line-clamp-3'>{content}</p>
         {links && (
            <div className='my-4 flex flex-col gap-3'>
               {links.map((link, index) => (
                  <div key={index} className='flex gap-2 items-center'>
                     <HiLink size={25} />
                     <Link
                        className='text-[#7563DF] font-bold max-w-full overflow-hidden text-ellipsis'
                        href={link}
                     >
                        {link}
                     </Link>
                  </div>
               ))}
            </div>
         )}

         {isEditable && (
            <div className='flex gap-3 font-bold py-2 px-4 rounded-md bg-slate-200 w-fit'>
               <Link href={`/edit-post/${id}`}>Edit</Link>
               <DeleteButton />
            </div>
         )}
      </div>
   );
};

export default Post;
