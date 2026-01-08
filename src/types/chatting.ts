export interface ChattingListItem {
  id: string;
  visitorName: string;
  lastMessage: string;
  lastMessageAt: Date;
  firstMessageAt: Date | null;
  assignedUserName: string | null;
  unreadCount: number;
}

export interface ChattingListResponse {
  success: boolean;
  data: ChattingListItem[];
  message?: string;
}
