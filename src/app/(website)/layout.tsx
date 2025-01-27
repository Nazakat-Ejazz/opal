import React from 'react';
import LandingPageNavBar from './_components/LandingPageNavbar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='felx flex-col py-10 px-10 xl:px-0 container'>
      <LandingPageNavBar />
      {children}
    </div>
  );
};

export default Layout;
