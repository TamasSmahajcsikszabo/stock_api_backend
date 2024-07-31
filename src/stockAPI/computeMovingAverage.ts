export function computeMovingAverage(
  data: (number | string)[],
  window: number,
): number[] {
  let bin: number = window;
  if (data.length < window) {
    bin = data.length;
  }

  let movingAverages: number[] = [];

  data.forEach((value: number | string, i: number) => {
    let subArray: number[] = data
      .slice(i, bin + i)
      .filter((value: string | number) => value !== undefined && value !== null)
      .map((value: string | number) => Number(value));
    if (subArray.length === bin) {
      const movingAverage = subArray.reduce((sum, a) => sum + a, 0);
      movingAverages.push(movingAverage / subArray.length);
    }
  });

  return movingAverages;
}
