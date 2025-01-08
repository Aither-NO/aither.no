import { Card } from "@radix-ui/themes";

export function ColoredCard({
  children,
  style,
  color,
  ...props
}: Parameters<typeof Card>[0] & {
  color: string;
}) {
  return (
    <Card
      {...props}
      style={{
        background: `var(--${color}-2)`,
        borderColor: `var(--${color}-9)`,
        color: `var(--${color}-12)`,
        ...style,
      }}
    >
      {children}
    </Card>
  );
}
