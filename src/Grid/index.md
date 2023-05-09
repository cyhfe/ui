# Grid

grid system

参考 `bootstrap`

## Grid Col Row

<code src="./demo.tsx"></code>

```css
.grid: {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  width: 100%;
  /* padding 实现间隔, row 用负 margin 撑开容器 */
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  /* 居中 */
  margin-right: auto;
  margin-left: auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
  ...;
}
```

```ts
function getSpan(span?: number) {
  if (!span) return null;
  const percentage = (span / 12) * 100 + '%';
  console.log(percentage);

  return css`
    flex: 0, 0, auto;
    width: ${percentage};
  `;
}
```
