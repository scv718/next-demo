import { ReactNode } from 'react';

type LoginLoadingProps = {
  children: ReactNode;
};

export default ({ children }: LoginLoadingProps) => {
  return <div>{children}</div>;
};
