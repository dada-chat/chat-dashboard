export const formatDateTime = (date: string | Date) =>
  new Date(date).toLocaleString("ko-KR", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

export const formatChatDate = (date: string | Date) => {
  const target = new Date(date);
  const now = new Date();

  // 날짜 비교용 (시간 제거)
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfTarget = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );

  const diffDays =
    (startOfToday.getTime() - startOfTarget.getTime()) / (1000 * 60 * 60 * 24);

  // 오늘
  if (diffDays === 0) {
    return target.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  // 어제
  if (diffDays === 1) {
    return "어제";
  }

  // 다른 연도
  if (target.getFullYear() !== now.getFullYear()) {
    return target.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  // 올해 + 어제 이전
  return target.toLocaleDateString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
  });
};
