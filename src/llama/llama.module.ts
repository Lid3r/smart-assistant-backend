import { Module } from '@nestjs/common';
import { LlamaService } from './llama.service';
import { LlamaController } from './llama.controller';
import { ConversationService } from 'src/conversation/conversation.service';
import { MessageService } from 'src/message/message.service';
import { ConditionalModule } from '@nestjs/config';
import { MessageModule } from 'src/message/message.module';
import { ConversationModule } from 'src/conversation/conversation.module';

@Module({
  controllers: [LlamaController],
  providers: [
    LlamaService,
    ConversationService,
    MessageService,
  ],
  imports: [
    ConversationModule,
    MessageModule,
  ]
})
export class LlamaModule {}
