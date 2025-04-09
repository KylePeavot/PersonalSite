export function getRandomCoord(
  from: number = -180,
  to: number = 180,
  fixed: number = 5
): number {
  return +(Math.random() * (to - from) + from).toFixed(fixed);
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

export function getRandomCoords(): { lng: number; lat: number } {
  return {
    lng: getRandomCoord(),
    lat: getRandomCoord(-90, 90),
  };
}
