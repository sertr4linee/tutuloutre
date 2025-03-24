import { ReactNode } from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
}

const maxWidths = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  'full': 'max-w-full'
};

export default function Container({
  children,
  className = '',
  maxWidth = 'xl',
  padding = true
}: ContainerProps) {
  const { isMobile } = useBreakpoint();

  return (
    <div
      className={`
        mx-auto
        ${maxWidths[maxWidth]}
        ${padding ? `px-4 ${isMobile ? 'py-4' : 'py-8'}` : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
} 