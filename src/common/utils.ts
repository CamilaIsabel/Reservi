import { format } from 'date-fns';

export function formatDateTime(date: Date | null) {
  if (!date) return '';
  return format(date, 'yyyy/MM/dd (HH:mm)');
}
