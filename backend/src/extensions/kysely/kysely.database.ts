import { MemberModel } from './models/member.model';
import { RefreshTokenModel } from './models/refresh-token.model';

export interface Database {
  member: MemberModel;
  refreshToken: RefreshTokenModel;
}
