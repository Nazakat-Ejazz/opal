'use client';
import React from 'react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryData } from '@/hooks/useQueryData';
import { getAllUserWorkspaces } from '@/actions/user';
import { WorkspaceProps } from '@/types/index.types';
import Modal from '../modal';
import { PlusCircleIcon } from 'lucide-react';
import Search from '../search';
import { MENU_ITEMS } from '@/constants';
import SidebarItems from './SidebarItem';

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();

  // data fetching
  const { data, isFetched } = useQueryData(
    ['user-workspaces'],
    getAllUserWorkspaces
  );

  console.log('data --', data);
  const { userWorkspaces: workspaces } = data as WorkspaceProps;

  const currentWorkspace = workspaces.workSpace.find(
    (ws) => ws.id === activeWorkspaceId
  );

  const menuItems = MENU_ITEMS(currentWorkspace?.id as string);

  // method to handle workspace change
  const handleWorkSpaceChange = (val: string) => {
    router.push(`/workspace/${val}`);
  };

  const pathname = usePathname();

  return (
    <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col items-center gap-4 text-white overflow-hidden'>
      <div className='bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0'>
        {/* <!-- brand info --> */}
        <Image src={'/opal-logo.svg'} alt='opal logo' width={40} height={40} />
        <p className='text3xl text-white'>Opal</p>
      </div>
      {/* workspace select dropdown */}
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={handleWorkSpaceChange}
      >
        <SelectTrigger className='mt-16 text-neutral-400 bg-transparent'>
          <SelectValue placeholder='Switch Workspace!'></SelectValue>
        </SelectTrigger>
        <SelectContent className='bg-blur-xl bg-[#111111] text-neutral-50'>
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator className='my-2' />
            {workspaces.workSpace.map((ws) => (
              <SelectItem key={ws.id} value={ws.id}>
                {ws.name}
              </SelectItem>
            ))}

            {workspaces.members &&
              workspaces.members.map((ws) => (
                <SelectItem value={ws.Workspace.id} key={ws.Workspace.id}>
                  {ws.Workspace.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* if currently selected workspace in public and user has a paid subscription only then show invite other members button to the user */}
      {currentWorkspace?.type === 'PUBLIC' &&
        workspaces.subscription?.plan === 'PRO' && (
          <Modal
            className=''
            trigger={
              <span className='text-sm flex items-center justify-center cursor-pointer bg-neutral-800/90 hover:bg-neutral-800/70 w-full rounded-sm gap-[5px] px-4 py-2'>
                <PlusCircleIcon
                  className='text-neutral-800/90 fill-neutral-500'
                  size={16}
                />
                <span className='text-neutral-400 text-sm font-semibold'>
                  Invite Members
                </span>
              </span>
            }
            title={'Invite your team members!'}
            description={'Invite the people, you want to collaborate with'}
          >
            <Search workspaceId={activeWorkspaceId} />
          </Modal>
        )}

      <p className='w-full text-[#9D9D9D] font-bold mt-4'>Menu</p>
      <nav className='w-full'>
        <ul>
          {menuItems.map((it, index) => (
            <SidebarItems
              href={it.href}
              icon={it.icon}
              selected={pathname === it.href}
              title={it.title}
              key={index}
              notifications={[]} // 3:37:10
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
