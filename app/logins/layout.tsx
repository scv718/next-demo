import { ReactNode } from 'react';

type LoginLayoutProps = {
  children: ReactNode;
};

export default ({ children }: LoginLayoutProps) => {
  return <div>{children}</div>;
};
