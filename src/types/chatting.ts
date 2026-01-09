import { Domain } from "./domain";

export type SenderType = "USER" | "VISITOR" | "SYSTEM";
export type ChattingRoomStatus = "OPEN" | "CLOSED";

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
export interface Message {
  id: string;
  content: string;
  senderType: SenderType;
  senderId: string;
  conversationId: string;
  createdAt: Date;
}

export interface Visitor {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface ChattingRoom {
  id: string;
  status: ChattingRoomStatus;
  domainId: string;
  assignedUserId: string;
  firstMessageAt: Date;
  lastMessageAt: Date;
  visitorId: string;
  createdAt: Date;
  updatedAt: Date;
  visitor: Visitor;
  domain: Domain;
  messages: Message[];
}

export interface ChattingRoomResponse {
  success: boolean;
  data: ChattingRoom | null;
  message?: string;
}
export interface ChattingRoomStatusResponse {
  success: boolean;
  message?: string;
}
