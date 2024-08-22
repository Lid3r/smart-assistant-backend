export class LlamaMessage {
    message: string;
    userId: number;     // when continuing conversation it may be null - value isn't read
    conversationName: string;   // when continuing conversation it may be null - value isn't read
}