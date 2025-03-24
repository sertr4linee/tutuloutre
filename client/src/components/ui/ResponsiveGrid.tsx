import { ReactNode } from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
}

export default function ResponsiveGrid({
  children,
  className = '',
  columns = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
    '2xl': 4
  },
  gap = {
    sm: 4,
    md: 6,
    lg: 8,
    xl: 8,
    '2xl': 8
  }
}: ResponsiveGridProps) {
  const { breakpoint } = useBreakpoint();
  
  const currentColumns = columns[breakpoint] || columns.sm;
  const currentGap = gap[breakpoint] ?? gap.sm ?? 4;
  
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${currentColumns}, minmax(0, 1fr))`,
    gap: `${currentGap * 0.25}rem`,
  };

  return (
    <div className={className} style={gridStyle}>
      {children}
    </div>
  );
} 