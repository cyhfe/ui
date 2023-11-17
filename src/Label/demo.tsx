import * as Label from '.';
import { css } from '@emotion/react';
const LabelDemo = () => (
  <div
    css={css({
      display: 'flex',
      padding: '0 20px',
      flexWrap: 'wrap',
      gap: 15,
      alignItems: 'center',
    })}
  >
    <Label.Root className="LabelRoot" htmlFor="firstName" css={css``}>
      First name
    </Label.Root>
    <input
      css={css`
        /* all: unset; */
        width: 200px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        padding: 0 10px;
        height: 35px;
        font-size: 15px;
        line-height: 1;
        color: '#475569';
        background-color: '#000000';
        box-shadow: 0 0 0 1px '#000000';
        border: 1px solid '#94a3b8';
      `}
      type="text"
      id="firstName"
      defaultValue="Pedro Duarte"
    />
  </div>
);

export default LabelDemo;
