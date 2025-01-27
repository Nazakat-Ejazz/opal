import React from 'react';
import {
  getAllUserNotifications,
  getgetAllUserWorkspaces,
  onAuthenticateUser,
} from '@/actions/user';
import { redirect } from 'next/navigation';
import {
  verifyAccessToWorkspace,
  getWorkspaceFolders,
  getAllUserVideos,
} from '@/actions/workspace';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Sidebar from '@/components/global/sidebar';

type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

const Layout = async ({ params: { workspaceId }, children }: Props) => {
  const auth = await onAuthenticateUser();

  if (!auth.user?.workSpace || !auth.user?.workSpace.length) {
    redirect(`/auth/sign-in`);
  }

  const hasAccessToWorkspace = await verifyAccessToWorkspace(workspaceId);

  if (!hasAccessToWorkspace?.data?.workSpace) return null;
  if (hasAccessToWorkspace.status !== 200) {
    redirect(`/dashboard/${auth.user?.workSpace[0].id}`);
  }

  const query = new QueryClient();

  // to fetch all the folders inside the user's workspace,catching for server actions
  await query.prefetchQuery({
    queryKey: ['workspace-folders'],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });

  // to get all the workspaces of a user.
  await query.prefetchQuery({
    queryKey: ['user-workspaces'],
    queryFn: () => getgetAllUserWorkspaces(),
  });

  // to fetch all the videos of a user, not supplying user's id because we will get it from the authenticted user i.e from currentUser();
  await query.prefetchQuery({
    queryKey: ['user-videos'],
    queryFn: () => getAllUserVideos(workspaceId),
  });

  // to fetch all the notifications of a user again not providing the user's id here, will use current user like above.
  await query.prefetchQuery({
    queryKey: ['user-notifications'],
    queryFn: () => getAllUserNotifications(),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className='flex w-screen h-screen'>
        <Sidebar activeWorkspaceId={'hello'} />
      </div>
      {/* <div className='mt-4'>{children}</div> */}
    </HydrationBoundary>
  );
};

export default Layout;
