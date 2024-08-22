import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Conversation } from 'src/conversation/conversation.model';
import { ConversationService } from 'src/conversation/conversation.service';
import { IS_PUBLIC_KEY } from 'src/decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private conversationService: ConversationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      //Info about user
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    const isMessageRoute = request.route.path.includes('message/');
    const isConversationRoute = request.route.path.includes('conversation');
    if (
      (isMessageRoute || isConversationRoute) &&
      request.method.toLowerCase() !== 'post'
    ) {
      const isHasAccess = await this.isHasAccessToConversation(
        request[isMessageRoute ? 'params' : 'body'].conversationId,
        request['user'].sub,
      );
      if (!isHasAccess) throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async isHasAccessToConversation(
    conversationId: number,
    userId: number,
  ): Promise<boolean> {
    if (conversationId) {
      const usersConversations: Conversation[] =
        await this.conversationService.getConversationsForUser(userId);

      return usersConversations
        .map((conv) => conv.dataValues)
        .some((conversation) => {
          return conversation.id == conversationId;
        });
    }
    return true;
  }
}
