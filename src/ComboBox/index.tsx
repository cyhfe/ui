import React from 'react';

interface ComboBoxProps {
  children?: React.ReactNode;
}

function ComboBox({ children }: ComboBoxProps) {
  return <div>{children}</div>;
}

function ComboBoxInput() {
  return <input type="text" />;
}

export { ComboBox, ComboBoxInput };
