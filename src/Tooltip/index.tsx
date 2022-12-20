import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
}

const Tooltip = ({ children, ...props }: TooltipProps) => {
  return <>{children}</>;
};

export { Tooltip };
