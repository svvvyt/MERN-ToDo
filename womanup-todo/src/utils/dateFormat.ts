import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

export const formatDate = (date: string): string => {
  return dayjs(date).format('HH:mm of DD.MM.YYYY');
}

export const getTimeToDate = (startingDate: string | number, targetDate: string): string => {
  return dayjs(startingDate).to(targetDate, true)
}