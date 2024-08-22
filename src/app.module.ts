import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { UserModule } from './user/user.module';
import { ConversationController } from './conversation/conversation.controller';
import { MessageController } from './message/message.controller';
import { UserService } from './user/user.service';
import { Conversation } from './conversation/conversation.model';
import { Message } from './message/message.model';
import { ConversationService } from './conversation/conversation.service';
import { ConversationModule } from './conversation/conversation.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { MessageService } from './message/message.service';
import { MessageModule } from './message/message.module';
import { AuthController } from './auth/auth.controller';
import { WhisperModule } from './whisper/whisper.module';
import { LlamaModule } from './llama/llama.module';
import { LlamaController } from './llama/llama.controller';
import { LlamaService } from './llama/llama.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
      models: [User, Conversation, Message],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ConversationModule,
    AuthModule,
    MessageModule,
    WhisperModule,
    LlamaModule,
  ],
  controllers: [
    AppController,
    UserController,
    ConversationController,
    MessageController,
    AuthController,
    LlamaController,
  ],
  providers: [
    AppService,
    UserService,
    ConversationService,
    MessageService,
    AuthService,
    LlamaService,
  ],
})
export class AppModule {}
