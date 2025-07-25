import { ReactNode } from 'react';

type ButtonExampleProps = {
  children: ReactNode;
};
export default function ButtonExample({ children }: ButtonExampleProps) {
  return <button>${children}</button>;
}
