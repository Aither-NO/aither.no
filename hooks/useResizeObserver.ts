import { useEffect, useRef } from "react";
import { useIsClient } from "./useIsClient";

export function useResizeObserver<T extends HTMLElement>(
  onChange: (node: T) => void
) {
  const isClient = useIsClient();
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;
    if (!isClient) return;
    const resizeObserver = new ResizeObserver(() => {
      if (onChange) {
        onChange(elementRef.current!);
      }
    });
    resizeObserver.observe(elementRef.current);
    return () => {
      resizeObserver.disconnect();
    }; // clean up
  }, [onChange, isClient]);
  return elementRef;
}
