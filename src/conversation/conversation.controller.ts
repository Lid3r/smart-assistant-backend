import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import {
  CreateConversationDto,
  UpdateConversationDto,
} from './conversation.dto';
import { ConversationService } from './conversation.service';
import { Conversation } from './conversation.model';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly _conversationService: ConversationService) {}

  @Post()
  async add(
    @Request() req: any,
    @Body() createConversationDto: CreateConversationDto,
  ): Promise<Conversation> {
    return await this._conversationService.addConversation(
      createConversationDto.name,
      req.user.sub,
    );
  }

  @Put()
  async update(
    @Body() updateConversationDto: UpdateConversationDto,
  ): Promise<[affectedCount: number]> {
    return await this._conversationService.update(
      updateConversationDto.name,
      updateConversationDto.conversationId,
    );
  }

  @Get()
  async getAllForUser(@Request() req: any): Promise<Conversation[]> {
    return this._conversationService.getConversationsForUser(req.user.sub);
  }

  @Delete(':conversationId')
  async deleteById(@Request() req: any): Promise<number> {
    return this._conversationService.deleteById(req.params.conversationId);
  }

  @Delete()
  async delete() {
    await this._conversationService.obliterate();
  }
}
