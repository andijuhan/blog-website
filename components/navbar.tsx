'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import { useEffect, useRef, useState } from 'react';

const Navbar = () => {
   const { status, data: session } = useSession();
   const [isPopupVisible, setIsPopupVisible] = useState(false);
   const popupRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
         if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
            setIsPopupVisible(false);
         }
      };

      document.addEventListener('click', handleClickOutside);

      if (!isPopupVisible) {
         document.removeEventListener('click', handleClickOutside);
      }

      return () => {
         document.removeEventListener('click', handleClickOutside);
      };
   }, [isPopupVisible]);

   return (
      <div className='flex justify-between pb-4 border-b mb-4 relative'>
         <div>
            <Link href={'/'}>
               <h1 className='text-4xl font-bold tracking-tighter text-dark'>
                  Tech News
               </h1>
            </Link>
            <p className='text-sm'>
               Exploring Tomorrow&apos;s Inovation, <br /> One Byte at a Time.
            </p>
         </div>
         {status === 'authenticated' ? (
            <>
               <div
                  ref={popupRef}
                  className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md flex flex-col gap-2 text-right min-w-[160px] ${
                     isPopupVisible ? '' : 'hidden'
                  }`}
               >
                  <div className='font-bold'>{session?.user?.name}</div>
                  <Link
                     onClick={() => setIsPopupVisible(false)}
                     className='hover:underline'
                     href={'/dashboard'}
                  >
                     Dashboard
                  </Link>
                  <Link
                     onClick={() => setIsPopupVisible(false)}
                     className='hover:underline'
                     href={'/create-post'}
                  >
                     Create Post
                  </Link>
                  <button className='btn' onClick={() => signOut()}>
                     Sign Out
                  </button>
               </div>

               <div className='flex gap-2 items-center'>
                  <Link
                     className='hidden md:flex gap-2 items-center mr-6'
                     href={'/create-post'}
                  >
                     <HiOutlinePlusCircle size={25} />
                     Create Post
                  </Link>
                  <Image
                     src={session?.user?.image || ''}
                     alt=''
                     width={36}
                     height={36}
                     className='rounded-full cursor-pointer'
                     onClick={() => setIsPopupVisible((prev) => !prev)}
                  />
               </div>
            </>
         ) : (
            <div className='flex items-center'>
               <Link className='btn' href={'/sign-in'}>
                  Sign In
               </Link>
            </div>
         )}
      </div>
   );
};

export default Navbar;
