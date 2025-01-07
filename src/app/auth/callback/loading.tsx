import { Spinner } from '@/components/global/loader/Spinner';
import React from 'react';

type Props = {};

const AuthLoading = (props: Props) => {
  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <Spinner />
    </div>
  );
};

export default AuthLoading;
