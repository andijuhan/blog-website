import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const GET = async (
   req: Request,
   { params }: { params: { catSlug: string } }
) => {
   try {
      const postByCategory = await prismadb.category.findFirst({
         where: {
            slug: params.catSlug,
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

      if (!postByCategory) {
         return NextResponse.json(
            { message: 'No posts found' },
            { status: 404 }
         );
      }

      return NextResponse.json(postByCategory);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'Something went wrong' },
         { status: 500 }
      );
   }
};
