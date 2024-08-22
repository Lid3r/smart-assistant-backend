import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Conversation } from './conversation.model';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation)
    private conversationModel: typeof Conversation,
  ) {
    this.init();
  }

  private async init() {
    await this.conversationModel.sync();
  }

  addConversation(cname: string, cuserid: number): Promise<Conversation> {
    return this.conversationModel.create({
      name: cname,
      userId: cuserid,
    });
  }

  async findAll(): Promise<Conversation[]> {
    return this.conversationModel.findAll();
  }

  getConversationsForUser(userId: number): Promise<Conversation[]> {
    return this.conversationModel.findAll({
      where: {
        userId,
      },
    });
  }

  findOne(id: string): Promise<Conversation | null> {
    return this.conversationModel.findOne({
      where: {
        id,
      },
    });
  }

  update(newName: string, id: number): Promise<[affectedCount: number]> {
    return this.conversationModel.update({ name: newName }, { where: { id } });
  }

  async obliterate() {
    await this.conversationModel.destroy({ where: {} });
  }

  async deleteById(id: number): Promise<number> {
    return this.conversationModel.destroy({ where: { id } });
  }
}
