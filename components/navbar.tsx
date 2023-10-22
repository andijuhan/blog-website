import Link from 'next/link';

const Navbar = () => {
   return (
      <div className='flex justify-between pb-4 border-b mb-4'>
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
         <div className='flex items-center'>
            <Link className='btn' href={'/sign-in'}>
               Sign In
            </Link>
         </div>
      </div>
   );
};

export default Navbar;
