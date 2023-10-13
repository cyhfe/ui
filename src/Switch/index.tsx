import { useControllableState } from 'rcl/useControllableState';
import { createContext } from '../createContext';
import React from 'react';
import { css } from '@emotion/react';

interface SwitchProps extends React.ComponentPropsWithoutRef<'button'> {
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?(checked: boolean): void;
}

type SwitchElement = React.ElementRef<'button'>;

const [SwitchProvider, useSwitch] = createContext<SwitchProps>('Switch');

const Root = React.forwardRef<SwitchElement, SwitchProps>((props, ref) => {
  const {
    defaultChecked = false,
    checked: checkedProp,
    onCheckedChange,
    ...rest
  } = props;

  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <SwitchProvider
      defaultChecked={defaultChecked}
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <button
        css={css`
          background: ${checked ? '#60a5fa' : '#94a3b8'};
          border: none;
          border-radius: 999px;
          padding: 0;
          font: inherit;
          color: inherit;
          cursor: pointer;
          outline: inherit;
          width: 60px;
          height: 30px;
          position: relative;
          transition: background-color 166ms ease-out 0s;
          box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
        `}
        ref={ref}
        onClick={() => {
          setChecked((prev) => !prev);
        }}
        {...rest}
      />
    </SwitchProvider>
  );
});

const ThumbBase = css`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 5px;
  right: 5px;
  border-radius: 100%;
  background-color: #fff;
  transition: all 166ms ease-out 0s;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
`;

const Thumb = () => {
  const { checked } = useSwitch('Thumb');

  return (
    <span
      css={[
        ThumbBase,
        css`
          left: ${checked ? '5px' : '35px'};
        `,
      ]}
    ></span>
  );
};

export { Root, Thumb };
