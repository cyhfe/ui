import { composeEventHandlers } from '.';
export default function Demo() {
  function handler1(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log('handler1', e);
  }
  function handler2(a: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log('handler2', a);
  }

  return (
    <button onClick={composeEventHandlers(handler1, handler2)}>click me</button>
  );
}
