import Data from '../data.js';

export default function calculateMonth(month) {
  const date = new Date(new Date().getFullYear(), month , 1, 0, 0, 0, 0);
  const nowYear = date.getFullYear();
  const nowMonth = date.getMonth();

  const firstDayOfCurrentMonth  = new Date(nowYear, nowMonth, 1, 0, 0, 0, 0).getDay();
  const lastDayOfCurrentMonth   = new Date(nowYear, nowMonth + 1, 0, 0, 0, 0, 0).getDay();
  const numberOFDaysBeforeMonth = new Date(nowYear, nowMonth, 0, 0, 0, 0, 0).getDate();
  const daysInCurrentMonth      = new Date(nowYear, nowMonth + 1, 0, 0, 0, 0, 0).getDate();

  const beforeDays = new Array(Data.DayOfWeakPlus[firstDayOfCurrentMonth]);
  const nowDays = new Array(daysInCurrentMonth);
  const nextDays = new Array(6 - Data.DayOfWeakPlus[lastDayOfCurrentMonth]);

  for (let i = 0; i < beforeDays.length; i++) {
    beforeDays[i] = numberOFDaysBeforeMonth - Data.DayOfWeakPlus[firstDayOfCurrentMonth] + i + 1;
  }

  for (let i = 0; i < nowDays.length; i++) {
    nowDays[i] = i + 1;
  }

  for (let i = 0; i < nextDays.length; i++) {
    nextDays[i] = i + 1;
  }

  const mounth ={
                week: Data.Week,
                beforeDays: beforeDays,
                nowDays: nowDays,
                nextDays: nextDays,
                monthName: Data.Year[nowMonth],
                month: nowMonth
                }

  return (
    mounth
  )
}