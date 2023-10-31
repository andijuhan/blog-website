import prismadb from '@/lib/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export const GET = async (
   req: Request,
   { params }: { params: { postId: string } }
) => {
   try {
      const post = await prismadb.post.findUnique({
         where: {
            id: params.postId,
         },
         include: {
            author: {
               select: {
                  name: true,
               },
            },
         },
      });

      return NextResponse.json(post);
   } catch (error: any) {
      console.log(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
};

export const PATCH = async (
   req: Request,
   { params }: { params: { postId: string } }
) => {
   const session = await getServerSession(authOptions);

   if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
   }

   const { title, content, links, selectedCategory, imageUrl, publicId } =
      await req.json();

   if (!title || !content) {
      return new NextResponse('Title & content are required', { status: 500 });
   }

   try {
      const updatedPost = await prismadb.post.update({
         where: {
            id: params.postId,
         },
         data: {
            title,
            content,
            links,
            catName: selectedCategory,
            imageUrl,
            publicId,
         },
      });

      return NextResponse.json(updatedPost);
   } catch (error) {
      console.log(error);
      return new NextResponse('Something went wrong', { status: 500 });
   }
};

export const DELETE = async (
   req: Request,
   { params }: { params: { postId: string } }
) => {
   const session = await getServerSession(authOptions);

   if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
   }

   try {
      const deletedPost = await prismadb.post.delete({
         where: {
            id: params.postId,
         },
      });

      return NextResponse.json(deletedPost);
   } catch (error) {
      console.log(error);
      return new NextResponse('Something went wrong', { status: 500 });
   }
};
