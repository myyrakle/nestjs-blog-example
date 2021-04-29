import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { checkToken } from 'src/lib/jwt';
import { UserService } from 'src/service/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    console.log('인증 가드 시작 >>>>');

    const request = context.switchToHttp().getRequest();

    //context.switchToHttp().

    // 핸들러단위 Role 목록
    const handlerRoles =
      this.reflector.get<string[]>('roles', context.getHandler()) || [];

    // 컨트롤러단위 Role 목록
    const controllerRoles =
      this.reflector.get<string[]>('roles', context.getClass()) || [];

    const url = request.url;
    const method = request.method;
    const headers = request.headers;
    const params = request.params;
    const query = request.query;
    const body = request.body;
    const cookies = request.cookies;

    const accessToken = cookies?.accessToken;

    if (accessToken) {
      try {
        const decoded = checkToken(accessToken);
        const user = await this.userService.findOneById(decoded?.userId);
        request.authUser = user;

        console.log('인증 성공: ', user.toJSON());
      } catch {}
    }

    let auth = true;

    if (handlerRoles.includes('ADMIN') || controllerRoles.includes('ADMIN')) {
      auth = request.authUser?.userType === 'ADMIN';
    } else if (
      handlerRoles.includes('USER') ||
      controllerRoles.includes('USER')
    ) {
      auth =
        request.authUser?.userType === 'ADMIN' ||
        request.authUser?.userType === 'USER';
    }

    console.log('인증 가드 종료 <<<<');

    return auth;
  }
}
