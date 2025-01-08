import { ReactElement, useEffect, useState } from "react";

export function clientOnly<
  TProps extends Record<string, unknown>
>(
  Component: (props: TProps) => ReactElement | null,
  displayName?: string
) {
  const WrappedComponent = (props: TProps) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
      setIsClient(true);
    }, []);
    if (!isClient) return null;
    return <Component {...props} />;
  };
  WrappedComponent.displayName = displayName
    ? (`ClientOnly(${displayName})` as const)
    : (`ClientOnly` as const);
  return WrappedComponent;
}
