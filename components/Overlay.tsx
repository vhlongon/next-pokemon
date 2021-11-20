import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
const Overlay = ({ children }: Props) => {
  return (
    <div className="fixed top-0 h-full w-full bg-opacity-20 bg-black flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default Overlay;
