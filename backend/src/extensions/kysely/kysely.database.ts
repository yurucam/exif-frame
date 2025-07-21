import { MemberModel } from './models/member.model';
import { RefreshTokenModel } from './models/refresh-token.model';
import { ThemeModel } from './models/theme.model';
import { TagModel } from './models/tag.model';
import { ThemeTagModel } from './models/theme-tag.model';
import { ThemeLikeModel } from './models/theme-like.model';

export interface Database {
  member: MemberModel;
  refreshToken: RefreshTokenModel;
  theme: ThemeModel;
  tag: TagModel;
  themeTag: ThemeTagModel;
  themeLike: ThemeLikeModel;
}
