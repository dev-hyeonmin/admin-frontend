export function formatToWon(price: number): string {
  return price.toLocaleString('ko-KR');
}

type DateFormat = 'full' | 'date';

export function formatDate(date: Date | string, format: DateFormat = 'full'): string {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  if (format === 'date') {
    return `${year}-${month}-${day}`;
  }

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
