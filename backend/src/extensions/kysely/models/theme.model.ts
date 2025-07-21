import { Generated } from 'kysely';

export interface ThemeModel {
  id: Generated<number>;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;

  memberId: number;

  name: string;
  summary: string; // 한줄 요약 (리스트용)
  description: string; // 상세 설명 (상세페이지용)
  svg: string;

  // 통계 필드
  likeCount: Generated<number>; // 좋아요 수
  downloadCount: Generated<number>; // 다운로드 수
}
