import { Injectable } from '@nestjs/common';
import ollama from 'ollama';
import { Message, MessageSender } from '../message/message.model';

@Injectable()
export class LlamaService {
  async prompt(message: string) {
    const response = await ollama.chat({
      model: 'llama3',
      messages: [{ role: 'user', content: message }],
      options: { mirostat_eta: 0.7 },
    });

    return response.message.content;
  }

  async continuePrompt(messages: Message[]) {
    const response = await ollama.chat({
      model: 'llama3',
      messages: this.convertMessages(messages),
      options: { mirostat_eta: 0.7 },
    });

    return response.message.content;
  }

  convertMessages(messages: Message[]) {
    const llamaMessages = messages
      .sort((a, b) => {
        return a.order - b.order;
      })
      .map((message) => {
        return {
          role: message.sender == MessageSender.USER ? 'user' : 'assistant',
          content: message.text,
        };
      });

    return llamaMessages;
  }
}
