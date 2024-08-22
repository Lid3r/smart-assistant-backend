import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message, MessageSender } from './message.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message)
    private MessageModel: typeof Message,
  ) {
    this.init();
  }

  private async init() {
    await this.MessageModel.sync();
  }

  async addMessage(mtext: string, mconversationId: number): Promise<Message> {
    const messages = await this.MessageModel.findAll({
      where: { conversationId: mconversationId },
    });

    //Find max order number to determine the next order number
    const maxOrder = Math.max(
      ...messages.map((message) => {
        return message.order;
      }),
    );

    const newOrder = maxOrder != -Infinity ? maxOrder + 1 : 0;

    //Alternate between AI and USER
    const newSender =
      newOrder == 0
        ? MessageSender.USER
        : messages.find((message) => message.order === maxOrder)!.sender ==
            MessageSender.AI
          ? MessageSender.USER
          : MessageSender.AI;

    return this.MessageModel.create({
      order: newOrder,
      sender: newSender,
      text: mtext,
      conversationId: mconversationId,
    });
  }

  async findAllForConversation(convID: number): Promise<Message[]> {
    const messages = await this.MessageModel.findAll({
      where: {
        conversationId: convID,
      },
    });
    return messages;
  }

  findOne(id: string): Promise<Message | null> {
    return this.MessageModel.findOne({
      where: {
        id,
      },
    });
  }

  async obliterate() {
    await this.MessageModel.destroy({ where: {} });
  }
}
