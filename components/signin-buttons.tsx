'use client';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

const SigninButtons = () => {
   return (
      <>
         <h1 className='text-center mt-8 text-2xl font-bold'>Sign In</h1>
         <div className='mt-4 p-4 flex flex-col items-center justify-center gap-4'>
            <button
               onClick={() => signIn('github')}
               className='flex items-center border p-4 rounded-full gap-4 hover:bg-slate-100/25 transition'
            >
               <span>
                  <Image
                     src={'/github-logo.svg'}
                     width={30}
                     height={30}
                     alt=''
                  />
               </span>
               Sign In With Github
            </button>
            <button
               onClick={() => signIn('google')}
               className='flex items-center border p-4 rounded-full gap-4 hover:bg-slate-100/25 transition'
            >
               <span>
                  <Image
                     src={'/google-logo.svg'}
                     width={30}
                     height={30}
                     alt=''
                  />
               </span>
               Sign In With Google
            </button>
         </div>
      </>
   );
};

export default SigninButtons;
