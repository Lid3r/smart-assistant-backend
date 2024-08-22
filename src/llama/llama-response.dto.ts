export class LlamaResponse {
    message: string;
    conversationId: number;

    constructor(message: string, id: number) {
        this.message = message;
        this.conversationId = id;
    }
}