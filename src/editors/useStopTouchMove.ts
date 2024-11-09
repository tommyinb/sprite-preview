import { RefObject, useEffect } from "react";

export function useStopTouchMove(
  ref: RefObject<HTMLDivElement>,
  stop: boolean
) {
  useEffect(() => {
    const callback = (event: Event) => {
      if (stop) {
        event.preventDefault();
      }
    };

    window.addEventListener("touchmove", callback, { passive: false });

    const { current } = ref;
    current?.addEventListener("touchmove", callback, {
      passive: false,
    });

    return () => {
      window.removeEventListener("touchmove", callback);
      current?.removeEventListener("touchmove", callback);
    };
  }, [ref, stop]);
}
