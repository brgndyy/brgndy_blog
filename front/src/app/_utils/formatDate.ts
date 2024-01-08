const formatDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export default formatDate;
