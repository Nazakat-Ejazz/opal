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
import { useRouter } from 'next/navigation';
import { userQueryData } from '@/hooks/userQueryData';
import { getAllUserWorkspaces } from '@/actions/user';
import { WorkspaceProps } from '@/types/index.types';

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();

  // data fetching
  const { data, isFetched } = userQueryData(
    ['user-workspaces'],
    getAllUserWorkspaces
  );

  console.log('data --', data);

  // const { data: workspaces } = data as WorkspaceProps;
  const { userWorkspaces: workspaces } = data as WorkspaceProps;

  console.log('oww ', workspaces);

  // method to handle workspace change
  const handleWorkSpaceChanger = (val: string) => {
    router.push(`/workspace/${val}`);
  };

  return (
    <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col items-center gap-4 text-white '>
      <div className='bg-[#111111] p-4 gap-2 justify-center items-center mb-1 absolute top-0 left-0 right-0'>
        {/* <!-- brand info --> */}
        <div className='flex item-center justify-center gap-4'>
          <Image
            src={'/opal-logo.svg'}
            alt='opal logo'
            width={40}
            height={40}
          />
          <h1 className='text3xl text-white'>Opal</h1>
        </div>
        {/* workspace select dropdown */}
        <Select
          defaultValue={activeWorkspaceId}
          onValueChange={handleWorkSpaceChanger}
        >
          <SelectTrigger className='mt-16 text-neutral-400 bg-transparent'>
            <SelectValue>Switch Workspace</SelectValue>
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
      </div>
    </div>
  );
};

export default Sidebar;
