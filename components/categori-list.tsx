import Link from 'next/link';
import { TCategory } from '@/types';

const getCategories = async (): Promise<TCategory[] | null> => {
   try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
      if (res.ok) {
         const categories = await res.json();
         return categories;
      }
   } catch (error) {
      console.log(error);
   }
   return null;
};

const CategoryList = async () => {
   const categoriesData = await getCategories();

   return (
      <div className='flex gap-2 text-sm flex-wrap'>
         {categoriesData &&
            categoriesData.map((category) => (
               <Link
                  className='px-4 py-1 rounded-md bg-slate-800 text-white cursor-pointer'
                  key={category.id}
                  href={`/categories/${category.catName}`}
               >
                  {category.catName}
               </Link>
            ))}
      </div>
   );
};

export default CategoryList;
