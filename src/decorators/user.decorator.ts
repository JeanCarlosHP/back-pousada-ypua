import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const UserEmail = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    if (!token) {
      return null;
    }

    const jwtService = new JwtService({
      secret: new ConfigService().get<string>('JWT_SECRET'),
    });

    try {
      const payload = await jwtService.verifyAsync(token);
      return payload.email;
    } catch {
      return null;
    }
  },
);

function extractTokenFromHeader(request: any): string | null {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : null;
}