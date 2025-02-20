import React from 'react'

type Props = {
    children: React.ReactNode;
}

const WorkspacePlaceholder = ({children}: Props) => {
  return (
    <span className='flex items-center justify-center gap-2 h-7 font-bold w-8 px-2 rounded-sm bg-[#545454]text-[#1D1D1D]'>
        { children }
    </span>
  )
}
export default WorkspacePlaceholder;