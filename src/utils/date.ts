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
    const timeString = target.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // "오전 12:"로 시작하는 경우 "오전 00:"으로 교체
    return timeString.replace("오전 12:", "오전 00:");
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
