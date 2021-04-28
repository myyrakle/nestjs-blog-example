import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('인증 가드 시작 >>>>');

    const request = context.switchToHttp().getRequest();

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

    let auth = true;
    // 인증 처리...

    console.log('인증 가드 종료 <<<<');

    return auth;
  }
}
