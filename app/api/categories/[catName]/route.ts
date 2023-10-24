import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const GET = async (
   req: Request,
   { params }: { params: { catName: string } }
) => {
   try {
      const postByCategory = await prismadb.category.findMany({
         where: {
            catName: params.catName,
         },
         include: {
            posts: {
               include: {
                  author: {
                     select: {
                        name: true,
                     },
                  },
               },
               orderBy: {
                  updatedAt: 'desc',
               },
            },
         },
      });

      return NextResponse.json(postByCategory);
   } catch (error) {
      console.log(error);
      return new NextResponse('Something went wrong', { status: 500 });
   }
};
