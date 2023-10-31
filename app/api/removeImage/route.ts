import cloudinary from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.v2.config({
   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: Request) => {
   const { publicId } = await req.json();
   try {
      await cloudinary.v2.uploader.destroy(publicId);
      console.log('Image removed.');
      return NextResponse.json({ message: 'success' });
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'something went wrong' },
         { status: 500 }
      );
   }
};
