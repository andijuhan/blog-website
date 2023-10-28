import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const GET = async (
   req: Request,
   { params }: { params: { authorEmail: string } }
) => {
   try {
      const postAuthor = await prismadb.user.findUnique({
         where: {
            email: params.authorEmail,
         },
         include: {
            posts: {
               include: {
                  category: true,
               },
               orderBy: {
                  updatedAt: 'desc',
               },
            },
         },
      });

      return NextResponse.json(postAuthor);
   } catch (error) {
      console.log(error);
      return new NextResponse('Something went wrong', { status: 500 });
   }
};
