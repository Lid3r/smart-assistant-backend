import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Conversation } from './conversation.model';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';

@Module({
  imports: [SequelizeModule.forFeature([Conversation])],
  exports: [SequelizeModule, ConversationService],
  providers: [ConversationService],
  controllers: [ConversationController],
})
export class ConversationModule {}
