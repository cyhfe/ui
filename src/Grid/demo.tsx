import { Col, Grid, Row } from './index';

import { css } from '@emotion/react';
const StyledCol = css`
  background-color: #2196f3;
`;

function Demo() {
  return (
    <Grid>
      <Row
        css={css`
          margin-bottom: 2rem;
        `}
      >
        <Col span={2}>
          <div css={StyledCol}>2</div>
        </Col>
        <Col span={4}>
          <div css={StyledCol}>4</div>
        </Col>
        <Col span={4}>
          <div css={StyledCol}>4</div>
        </Col>
        <Col span={2}>
          <div css={StyledCol}>2</div>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <div css={StyledCol}>6</div>
        </Col>
        <Col span={6}>
          <div css={StyledCol}>6</div>
        </Col>
      </Row>
    </Grid>
  );
}

export default Demo;
