export const throttle = (
  callback: (e: MouseEvent) => void,
  delay: number
): ((e: MouseEvent) => void) => {
  let throttleTimeout: number | null = null;
  let storedEvent: MouseEvent | null = null;

  const throttledEventHandler = (event: MouseEvent) => {
    storedEvent = event;

    const shouldHandleEvent = !throttleTimeout;

    if (shouldHandleEvent) {
      callback(storedEvent);

      storedEvent = null;

      const throttled = function () {
        throttleTimeout = null;

        if (storedEvent) {
          throttledEventHandler(storedEvent);
        }
      };

      throttleTimeout = window.setTimeout(throttled, delay);
    }
  };

  return throttledEventHandler;
};
