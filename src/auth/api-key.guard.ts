import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'] as string;
    const validApiKey = process.env.API_KEY ?? 'my-incredible-secret-key';
    if (!apiKey || apiKey !== validApiKey) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
