export function style(
  styles: React.CSSProperties &
    Record<`--${string}`, string | number | undefined>
): React.CSSProperties {
  return styles;
}
