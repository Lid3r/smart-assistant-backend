import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';

import { CreateMessageDto } from './create-message.dto';
import { Message } from './message.model';

@Controller('message')
export class MessageController {
  constructor(private readonly _conversationService: MessageService) {}

  @Post()
  async add(@Body() createConversationDto: CreateMessageDto): Promise<Message> {
    return await this._conversationService.addMessage(
      createConversationDto.text,
      createConversationDto.conversationId,
    );
  }

  @Get(':conversationId')
  async getAllInConvo(
    @Param('conversationId') conversationId: number,
  ): Promise<Message[]> {
    return this._conversationService.findAllForConversation(conversationId);
  }

  @Delete()
  async delete() {
    await this._conversationService.obliterate();
  }
}
