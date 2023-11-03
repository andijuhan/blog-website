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
            category: true,
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

/**
 * Handles the POST request
 *
 * @param req The request object
 * @returns The response object
 */
export const POST = async (req: Request) => {
   // Get the session from the server
   const session = await getServerSession(authOptions);

   // If there is no session, return an unauthenticated error
   if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
   }

   // Destructure the request body
   const { title, slug, content, links, selectedCategory, imageUrl, publicId } =
      await req.json();

   // Check for duplicate slug
   const slugs = await prismadb.post.findMany({
      where: {
         slug,
      },
   });

   // If there are duplicate slugs, return an error
   if (slugs.length > 0) {
      return NextResponse.json(
         { message: 'Slug already exists' },
         { status: 401 }
      );
   }

   // Get the author's email from the session
   const authorEmail = session?.user?.email as string;

   // Check if title or content is missing
   if (!title || !content) {
      return new NextResponse('Title & content are required', { status: 500 });
   }

   try {
      // Create a new post in the database
      const newPost = await prismadb.post.create({
         data: {
            title,
            slug,
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
