import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export const GET = async () => {
   try {
      const posts = await prismadb.post.findMany({
         include: {
            author: {
               select: {
                  name: true,
               },
            },
         },
         orderBy: {
            createdAt: 'desc',
         },
      });

      return NextResponse.json(posts);
   } catch (error) {
      console.log(error);
      return new NextResponse('Something went wrong', { status: 500 });
   }
};

export const POST = async (req: Request) => {
   const session = await getServerSession(authOptions);

   if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
   }

   const { title, content, links, selectedCategory, imageUrl, publicId } =
      await req.json();

   const authorEmail = session?.user?.email as string;

   if (!title || !content) {
      return new NextResponse('Title & content are required', { status: 500 });
   }

   try {
      const newPost = await prismadb.post.create({
         data: {
            title,
            content,
            links,
            catName: selectedCategory,
            imageUrl,
            publicId,
            authorEmail,
         },
      });

      return NextResponse.json(newPost);
   } catch (error) {
      console.log(error);
      return new NextResponse('Something went wrong', { status: 500 });
   }
};
