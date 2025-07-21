import { Generated } from 'kysely';

export interface TagModel {
  id: Generated<number>;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;

  name: string; // 태그명 (unique)
  color: string; // 태그 색상 (hex)
  usageCount: Generated<number>; // 사용 횟수
}
