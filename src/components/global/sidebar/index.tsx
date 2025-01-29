'use client';
import React from 'react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();

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
          <SelectContent className='bg-blur-xl bg-[#111111] bg-slate-500'>
            <SelectGroup>
              <SelectLabel>Workspaces</SelectLabel>
              <Separator />
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Sidebar;
