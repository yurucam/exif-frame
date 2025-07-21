import { Generated } from 'kysely';

export interface ThemeTagModel {
  id: Generated<number>;
  createdAt: Generated<Date>;

  themeId: number;
  tagId: number;
}
