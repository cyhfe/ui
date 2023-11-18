import { css } from '@emotion/react';
interface VisiuallyHiddenProps {
  children?: React.ReactNode;
}

function VisuallyHidden({ children }: VisiuallyHiddenProps) {
  return (
    <div
      css={css`
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
      `}
    >
      {children}
    </div>
  );
}

export { VisuallyHidden };
