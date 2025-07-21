import { corsExtension } from './extensions/cors/cors.extension';
import { kyselyExtension } from './extensions/kysely/kysely.extension';
import { openApiExtension } from './extensions/open-api/open-api.extension';
import { scalarExtension } from './extensions/scalar/scalar.extension';
import { Bindings } from './types';
import { OpenAPIHono } from '@hono/zod-openapi';
import { changePasswordController } from './usecases/member/change-password/change-password.controller';
import { signUpController } from './usecases/member/sign-up/sign-up.controller';
import { signInController } from './usecases/member/sign-in/sign-in.controller';
import { refreshTokenController } from './usecases/member/refresh-token/refresh-token.controller';
import { retrievePersonalInformationController } from './usecases/member/retrieve-personal-information/retrieve-personal-information.controller';
import { updatePersonalInformationController } from './usecases/member/update-personal-information/update-personal-information.controller';
import { withdrawController } from './usecases/member/withdraw/withdraw.controller';
import { manageRoleController } from './usecases/member/manage-role/manage-role.controller';

// Tag 컨트롤러들
import { createTagController } from './usecases/tag/create/create-tag.controller';
import { retrieveTagListController } from './usecases/tag/retrieve-list/retrieve-tag-list.controller';
import { patchTagController } from './usecases/tag/patch/patch-tag.controller';
import { deleteTagController } from './usecases/tag/delete/delete-tag.controller';

// Theme 컨트롤러들
import { createThemeController } from './usecases/theme/create/create-theme.controller';
import { retrieveThemeListController } from './usecases/theme/retrieve-list/retrieve-theme-list.controller';
import { retrieveThemeDetailController } from './usecases/theme/retrieve-detail/retrieve-theme-detail.controller';
import { patchThemeController } from './usecases/theme/patch/patch-theme.controller';
import { deleteThemeController } from './usecases/theme/delete/delete-theme.controller';
import { likeThemeController } from './usecases/theme/like/like-theme.controller';
import { downloadThemeController } from './usecases/theme/download/download-theme.controller';
import { addTagController } from './usecases/theme/add-tag/add-tag.controller';
import { removeTagController } from './usecases/theme/remove-tag/remove-tag.controller';

async function bootstrap(): Promise<OpenAPIHono<Bindings>> {
  const app = new OpenAPIHono<Bindings>();

  // 확장 기능 등록
  [kyselyExtension, corsExtension, openApiExtension, scalarExtension].map((extension) => extension(app));

  // 인증이 필요없는 컨트롤러들
  [signUpController, signInController, refreshTokenController].map((controller) => controller(app));

  // Tag 컨트롤러들 (공개 조회, 관리자 전용 관리)
  [retrieveTagListController].map((controller) => controller(app));
  [createTagController, patchTagController, deleteTagController].map((controller) => controller(app));

  // Theme 컨트롤러들 (공개 조회, 다운로드)
  [retrieveThemeListController, retrieveThemeDetailController, downloadThemeController].map((controller) => controller(app));

  // 인증이 필요한 컨트롤러들
  [changePasswordController, retrievePersonalInformationController, updatePersonalInformationController, withdrawController].map(
    (controller) => controller(app)
  );

  // Theme 인증 필요 컨트롤러들
  [createThemeController, patchThemeController, deleteThemeController, likeThemeController, addTagController, removeTagController].map(
    (controller) => controller(app)
  );

  [manageRoleController].map((controller) => controller(app));

  return app;
}

export default await bootstrap();
