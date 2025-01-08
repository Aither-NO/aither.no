import React from "react";

export function useMount(callback: () => any) {
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
    const res = callback();
    return () => {
      if (typeof res === "function") res();
    };
  }, []);
}
