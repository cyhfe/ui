import { useEffect } from 'react';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART];

type PossibleEvent = MouseEvent | TouchEvent;
type Handler = (event: PossibleEvent) => void;

const events: HandledEvents = [MOUSEDOWN, TOUCHSTART];

export function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: Handler | null,
  options?: AddEventListenerOptions,
) {
  useEffect(() => {
    if (!handler) {
      return;
    }

    const listener = (event: PossibleEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    events.forEach((event) => {
      document.addEventListener(event, listener, options);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, listener);
      });
    };
  }, [handler, options, ref]);
}
