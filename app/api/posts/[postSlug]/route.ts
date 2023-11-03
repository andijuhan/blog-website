import prismadb from '@/lib/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export const GET = async (
   req: Request,
   { params }: { params: { postSlug: string } }
) => {
   try {
      const post = await prismadb.post.findFirst({
         where: {
            slug: params.postSlug,
         },
         include: {
            author: {
               select: {
                  name: true,
               },
            },
            category: true,
         },
      });

      if (!post) {
         return NextResponse.json(
            { message: 'No posts found' },
            { status: 404 }
         );
      }

      return NextResponse.json(post);
   } catch (error: any) {
      console.log(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
};

/**
 * Updates a post with the given postId.
 *
 * @param {Request} req - The request object.
 * @param {Object} params - The parameters object containing the postId.
 * @param {string} params.postId - The ID of the post to update.
 * @returns {NextResponse} - The response object.
 */
export const PATCH = async (
   req: Request,
   { params }: { params: { postId: string } }
): Promise<NextResponse> => {
   // Authenticate the session
   const session = await getServerSession(authOptions);

   if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
   }

   // Get the request body
   const { title, slug, content, links, selectedCategory, imageUrl, publicId } =
      await req.json();

   if (!title || !content) {
      return new NextResponse('Title & content are required', { status: 500 });
   }

   // Check for duplicate slug
   const slugs = await prismadb.post.findMany({
      where: {
         slug,
      },
   });

   if (slugs.length > 0 && slugs[0].id !== params.postId) {
      return NextResponse.json(
         { message: 'Slug already exists' },
         { status: 401 }
      );
   }

   try {
      // Update the post
      const updatedPost = await prismadb.post.update({
         where: {
            id: params.postId,
         },
         data: {
            title,
            slug,
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
