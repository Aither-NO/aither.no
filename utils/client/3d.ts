export function angleToDirection(angle: number) {
  const index =
    Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) %
    8;
  return [
    "North",
    "North-East",
    "East",
    "South-East",
    "South",
    "South-West",
    "West",
    "North-West",
  ][index];
}
