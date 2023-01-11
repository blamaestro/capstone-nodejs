export function getTodayISO() {
  const currentDate = new Date();
  return currentDate.toISOString().slice(0, 10);
}
