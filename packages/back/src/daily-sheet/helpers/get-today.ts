export function getToday(): string {
  return new Date().toISOString().substr(0, 10);
}