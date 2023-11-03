import { TPost } from '@/types';
import { notFound } from 'next/navigation';

/**
 * Retrieves a post by its slug.
 *
 * @param {string} slug - The slug of the post to retrieve.
 * @returns {Promise<TPost | null>} - The retrieved post or null if not found.
 */
const getPost = async (slug: string): Promise<TPost | null> => {
   try {
      // Make a GET request to the API endpoint for the specified slug
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${slug}`, {
         next: { revalidate: 0 },
      });
      if (res.ok) {
         // If the response is successful, parse the JSON and return the post
         const post = await res.json();
         return post;
      } else {
         // If the response is not successful, call the notFound function
         notFound();
      }
   } catch (error) {
      // If an error occurs, call the notFound function
      notFound();
   }
};

const SinglePost = async ({ params }: { params: { postSlug: string } }) => {
   const post = await getPost(params.postSlug);
   //console.log(post);
   return <div>SinglePost</div>;
};

export default SinglePost;
