import { parseISO, format } from 'date-fns';

export function formatDate(isoString: string) {
  const date = parseISO(isoString);
  const formattedDate = format(date, 'dd MMM yyyy');

  return formattedDate;
}
