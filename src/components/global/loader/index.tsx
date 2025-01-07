import React from 'react';
import { Spinner } from './Spinner';
import { cn } from '@/lib/utils';

type Props = {
  state: boolean;
  className?: string;
  color?: string;
  children?: React.ReactNode;
};

const Loader = ({ state, color, className, children }: Props) => {
  // state ? <Spinner color={color} /> : <>{children}</>;
  return state ? (
    <div className={cn(className)}>
      <Spinner />
    </div>
  ) : (
    children
  );
};

export default Loader;
