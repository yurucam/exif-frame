import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { Bindings } from '../../../types';
import { signUpInput } from './sign-up.input';
import { signUpOutput } from './sign-up.output';
import { hashPassword } from '../../../utils/password.util';

export function signUpController(app: OpenAPIHono<Bindings>): void {
  app.openapi(
    createRoute({
      method: 'post',
      path: '/sign-up',
      tags: ['Member'],
      summary: '회원가입',
      description: '새로운 사용자를 등록합니다.',
      request: {
        body: {
          content: {
            'application/json': {
              schema: signUpInput,
            },
          },
        },
      },
      responses: {
        200: {
          description: '응답',
          content: {
            'application/json': {
              schema: signUpOutput,
            },
          },
        },
      },
    }),
    async (context) => {
      const input = context.req.valid('json');
      const db = context.env.db;

      // 1. 중복 사용자명 체크
      const existingUser = await db.selectFrom('member').select(['id']).where('name', '=', input.name).executeTakeFirst();

      if (existingUser) {
        // 중복 사용자가 있으면 에러 발생 (실제로는 적절한 에러 응답 필요)
        throw new Error('이미 존재하는 사용자명입니다.');
      }

      // 2. 패스워드 해싱
      const hashedPassword = await hashPassword(input.password);

      // 3. 사용자 생성
      const newUser = await db
        .insertInto('member')
        .values({
          name: input.name,
          password: hashedPassword,
          nickname: input.nickname,
          bio: input.bio || '',
          role: 'user', // 기본 권한을 'user'로 설정
        })
        .returning(['id', 'name', 'nickname', 'bio', 'role', 'createdAt'])
        .executeTakeFirstOrThrow();

      // 4. 응답 반환
      return context.json(
        {
          id: newUser.id,
          name: newUser.name,
          nickname: newUser.nickname,
          bio: newUser.bio,
          role: newUser.role,
          createdAt: newUser.createdAt,
        },
        200
      );
    }
  );
}
