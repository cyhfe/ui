import { css } from '@emotion/react';
import React, { forwardRef } from 'react';

const gridStyle = css`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  width: 100%;
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  margin-right: auto;
  margin-left: auto;
`;

const rowStyle = css`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;

  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
  & > * {
    box-sizing: border-box;
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    padding-right: calc(var(--bs-gutter-x) * 0.5);
    padding-left: calc(var(--bs-gutter-x) * 0.5);
    margin-top: var(--bs-gutter-y);
  }
`;

const colStyle = css`
  /* flex: 1 0 0%; */
`;

interface GridProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, ...rest }, ref) => {
    return (
      <div css={gridStyle} ref={ref} {...rest}>
        {children}
      </div>
    );
  },
);

interface RowProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode;
}

const Row = forwardRef<HTMLDivElement, RowProps>(
  ({ children, ...rest }, ref) => {
    return (
      <div css={rowStyle} ref={ref} {...rest}>
        {children}
      </div>
    );
  },
);
interface ColProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode;
  span?: number;
}

function getSpan(span?: number) {
  if (!span) return null;
  const percentage = (span / 12) * 100 + '%';

  return css`
    flex: 0, 0, auto;
    width: ${percentage};
  `;
}

const Col = forwardRef<HTMLDivElement, ColProps>(
  ({ span, children, ...rest }, ref) => {
    return (
      <div css={[colStyle, getSpan(span)]} ref={ref} {...rest}>
        {children}
      </div>
    );
  },
);
export { Grid, Row, Col };
