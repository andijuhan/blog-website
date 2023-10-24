import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

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
   } catch (error) {
      console.log(error);
      return new NextResponse('Something went wrong', { status: 500 });
   }
};

export const PUT = async (
   req: Request,
   { params }: { params: { postId: string } }
) => {
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
   try {
      const updatedPost = await prismadb.post.delete({
         where: {
            id: params.postId,
         },
      });

      return NextResponse.json(updatedPost);
   } catch (error) {
      console.log(error);
      return new NextResponse('Something went wrong', { status: 500 });
   }
};
