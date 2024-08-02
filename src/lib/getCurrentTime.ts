export function getCurrentTime(): string {
  const now = Date.now();
  const dateObject = new Date(now);
  const date = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const hour = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();
  return `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`;
}
