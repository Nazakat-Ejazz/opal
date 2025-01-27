import React from 'react';

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId: string }: Props) => {
  console.log('Sidebar is being rendered!');
  return (
    <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col items-center gap-4 '>
      <div className='bg-[#111111] p-4 gap-2 justify-center items-center mb-1 absolute top-0 left-0 right-0'>
        {' '}
        Sidebarrrr!
      </div>
    </div>
  );
};

export default Sidebar;
