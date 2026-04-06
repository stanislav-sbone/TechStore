export const formatDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleString('ru-RU');
};
