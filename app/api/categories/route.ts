import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const GET = async () => {
   try {
      const categories = await prismadb.category.findMany();

      return NextResponse.json(categories);
   } catch (error) {
      console.log(error);
      return new NextResponse('Something went wrong', { status: 500 });
   }
};
