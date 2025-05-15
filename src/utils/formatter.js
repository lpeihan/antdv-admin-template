import dayjs from 'dayjs';

export function formatTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!time) {
    return null;
  }

  return dayjs(time).format(format);
}
