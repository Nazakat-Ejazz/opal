import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';

const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser();

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.workSpace[0].id}`);
  }

  if (auth.status === 404 || auth.status === 403 || auth.status === 500) {
    return redirect('/auth/sign-in');
  }
};

export default AuthCallbackPage;