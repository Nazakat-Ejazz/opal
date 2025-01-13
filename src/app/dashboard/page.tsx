import React from 'react';
import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';

type Props = {};

const DashboardPage = async (props: Props) => {
  // Authenticate User
  const auth = await onAuthenticateUser();

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.workSpace[0].id}`);
  }

  if (auth.status === 400 || auth.status === 404 || auth.status === 500) {
    return redirect(`/auth/sign-in`);
  }
  return <div>dashboard page</div>;
};

export default DashboardPage;
