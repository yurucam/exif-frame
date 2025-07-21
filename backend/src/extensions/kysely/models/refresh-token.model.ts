import { Generated } from 'kysely';

export interface RefreshTokenModel {
  id: Generated<number>;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;

  token: string; // ! Unique
  memberId: number;
  expiresAt: Date;
  isRevoked: boolean;
}
