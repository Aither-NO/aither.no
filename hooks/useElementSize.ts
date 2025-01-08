import { useCallback, useState } from "react";
import { useResizeObserver } from "./useResizeObserver";

export function useElementSize<T extends HTMLElement>() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const onResize = useCallback((node: T) => {
    setSize({
      width: node.clientWidth,
      height: node.clientHeight,
    });
  }, []);
  const ref = useResizeObserver<T>(onResize);
  return [ref, size] as const;
}
