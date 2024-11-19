
export function getCalendarTimes (rows:number, startTime: number): string[] {
  const times: string[] = []
  for(let i=0; i < rows; i++) {
    times.push(startTime+i + ":00")
  }
  return times;
}

export function isSameDay (date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
