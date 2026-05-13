export interface StoredConversation {
  id: string;
  assistantKey: string;
  assistantName: string;
  title: string;
  messages: Array<{
    id: string;
    role: "user" | "assistant" | "error";
    content: string;
    timestamp: string;
    durationMs?: number;
    files?: string[];
    displayText?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}
