import React from 'react';

const toast = () => {};

interface ToasterProps {
  children: React.ReactNode;
}

const Toaster = ({ children, ...props }: ToasterProps) => {
  return (
    <div {...props} className="toaster">
      {children}
    </div>
  );
};

export { Toaster, toast };
