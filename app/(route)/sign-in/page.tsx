import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SigninButtons from '@/components/signin-buttons';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const SignIn = async () => {
   const session = await getServerSession(authOptions);

   if (session) {
      redirect('/dashboard');
   }

   return <SigninButtons />;
};

export default SignIn;
