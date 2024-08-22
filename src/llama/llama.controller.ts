import { Controller, Post, Body, Param } from '@nestjs/common';
import { LlamaService } from './llama.service';
import { LlamaMessage } from './llama-message.dto';
import { LlamaResponse } from './llama-response.dto';
import { ConversationService } from 'src/conversation/conversation.service';
import { MessageService } from 'src/message/message.service';

const TITLE_PROMPT =
  'Create a short conversation TITLE based on the following prompt. Do not write anything but the title itself, do not include quotes: ';
@Controller('llama')
export class LlamaController {
  constructor(
    private readonly llamaService: LlamaService,
    private readonly conversationService: ConversationService,
    private readonly messageService: MessageService,
  ) {}

  @Post()
  async prompt(@Body() llamaMessage: LlamaMessage) {
    const llamaPrompt = llamaMessage.message;
    const userId = llamaMessage.userId;

    const llamaResponseContent = this.llamaService.prompt(llamaPrompt);

    const convName = await this.llamaService.prompt(TITLE_PROMPT + llamaPrompt);

    const conversation = await this.conversationService.addConversation(
      convName,
      userId,
    );
    const conversationId = conversation.id;

    this.messageService.addMessage(llamaPrompt, conversationId);
    const literalResponse = await llamaResponseContent;
    this.messageService.addMessage(literalResponse, conversationId);

    const llamaResponse = new LlamaResponse(
      await llamaResponseContent,
      conversationId,
    );
    return llamaResponse;
  }

  @Post(':conversationId')
  async continuePrompt(
    @Body() llamaMessage: LlamaMessage,
    @Param('conversationId') conversationId: number,
  ) {
    const llamaPrompt = llamaMessage.message;

    await this.messageService.addMessage(llamaPrompt, conversationId);
    const messages =
      await this.messageService.findAllForConversation(conversationId);

    const llamaResponseContent =
      await this.llamaService.continuePrompt(messages);
    this.messageService.addMessage(llamaResponseContent, conversationId);

    const llamaResponse = new LlamaResponse(
      llamaResponseContent,
      conversationId,
    );
    return llamaResponse;
  }
}
