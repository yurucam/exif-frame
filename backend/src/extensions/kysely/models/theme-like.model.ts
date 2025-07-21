import { Generated } from 'kysely';

export interface ThemeLikeModel {
  id: Generated<number>;
  createdAt: Generated<Date>;

  themeId: number;
  memberId: number;
}
