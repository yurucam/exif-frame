import { corsExtension } from './extensions/cors/cors.extension';
import { kyselyExtension } from './extensions/kysely/kysely.extension';
import { openApiExtension } from './extensions/open-api/open-api.extension';
import { scalarExtension } from './extensions/scalar/scalar.extension';
import { Bindings } from './types';
import { OpenAPIHono } from '@hono/zod-openapi';
import { changePasswordController } from './usecases/member/change-password/change-password.controller';
import { signUpController } from './usecases/member/sign-up/sign-up.controller';
import { signInController } from './usecases/member/sign-in/sign-in.controller';
import { retrievePersonalInformationController } from './usecases/member/retrieve-personal-information/retrieve-personal-information.controller';
import { updatePersonalInformationController } from './usecases/member/update-personal-information/update-personal-information.controller';
import { withdrawController } from './usecases/member/withdraw/withdraw.controller';
import { manageRoleController } from './usecases/member/manage-role/manage-role.controller';

async function bootstrap(): Promise<OpenAPIHono<Bindings>> {
  const app = new OpenAPIHono<Bindings>();

  // 확장 기능 등록
  [kyselyExtension, corsExtension, openApiExtension, scalarExtension].map((extension) => extension(app));

  // 인증이 필요없는 컨트롤러들
  [signUpController, signInController].map((controller) => controller(app));

  // 인증이 필요한 컨트롤러들
  [changePasswordController, retrievePersonalInformationController, updatePersonalInformationController, withdrawController].map(
    (controller) => controller(app)
  );

  [manageRoleController].map((controller) => controller(app));

  return app;
}

export default await bootstrap();
