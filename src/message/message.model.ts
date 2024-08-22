import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Conversation } from 'src/conversation/conversation.model';

export enum MessageSender {
  USER = 0,
  AI = 1,
}

@Table({ tableName: 'messages' })
export class Message extends Model {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  order: number;

  @Column(DataType.INTEGER)
  sender: MessageSender;

  @Column(DataType.STRING(10000))
  text: string;

  @BelongsTo(() => Conversation)
  conversation: Conversation;

  @ForeignKey(() => Conversation)
  conversationId: number;
}
