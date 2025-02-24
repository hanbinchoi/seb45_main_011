import { twMerge } from 'tailwind-merge';

import Logo from './Logo';
import Screws from './Screws';

import { DefaultProps } from '@/types/common';

interface IntroProps extends DefaultProps {
  children: React.ReactNode;
}

export default function Intro({ className, children }: IntroProps) {
  return (
    <div
      className={twMerge(
        'relative flex flex-col gap-3 justify-center items-center min-w-[440px] h-[360px] rounded-xl border-gradient shadow-container',
        className,
      )}>
      <Logo size="large" />
      <div className="flex flex-col gap-1 text-center">
        {children}
        <Screws />
      </div>
    </div>
  );
}
