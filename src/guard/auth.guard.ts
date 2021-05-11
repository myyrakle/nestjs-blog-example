import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector, REQUEST } from '@nestjs/core';
import { checkToken } from '../lib/jwt';
import { AuthUser } from '../provider/auth_user.provider';
import { UserView } from '../user/dto/user-view.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private userService: UserService,
    @Inject(REQUEST) private authUser: AuthUser,
  ) {}

  async canActivate(context: ExecutionContext) {
    console.log('인증 가드 시작 >>>>');

    const request = context.switchToHttp().getRequest();

    // 핸들러단위 Role 목록
    const handlerRoles =
      this.reflector.get<string[]>('roles', context.getHandler()) || [];

    // 컨트롤러단위 Role 목록
    const controllerRoles =
      this.reflector.get<string[]>('roles', context.getClass()) || [];

    // const url = request.url;
    // const method = request.method;
    // const headers = request.headers;
    // const params = request.params;
    // const query = request.query;
    // const body = request.body;
    const cookies = request.cookies;

    const accessToken = cookies?.accessToken;

    if (accessToken) {
      try {
        const decoded = checkToken(accessToken);
        const user = await this.userService.findOneById(decoded?.userId);
        const userView: UserView = {
          id: user?.id,
          email: user?.email,
          name: user?.name,
          userType: user?.userType,
        };
        request.authUser = userView;
        this.authUser.authorized = true;
        this.authUser.user = userView;

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
