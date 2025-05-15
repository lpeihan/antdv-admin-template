import dayjs from 'dayjs';

export function formatTime(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) {
    return null;
  }

  return dayjs(date).format(format);
}
