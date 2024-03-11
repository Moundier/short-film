
export interface TokenResponse {
  accessToken: string,
  refreshToken: string
}

export interface LoginDTO {
  email: string,
  password: string,
}

export interface RegisterDTO {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export interface ErrorDTO {
  error: string,
  message: string,
}

export class UserModel {
  public userId?: number;
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public password?: string;
  public role?: RoleEnum;
  public termsAcceptedDate?: Date;
}

export enum RoleEnum {
  USER, /* Have limited access, can interact */
  GUEST, /* Have limited access, cant interact */
  ADMIN, /* Have complete access and can modify */
  CREATOR, /* Have limited access and can modify */
}

enum ErrorToken {
  ACCESS_DENIED = 'Invalid Token',
  EXPIRED_TOKEN = 'Expired Token',
  INVALID_TOKEN = 'Access Denied',
}

export interface UserToInteractions {
  userId?: number,
  programId?: number,
  date?: Date,
  json?: string,
  actionType?: Interaction
}

export enum Interaction {
  ACTION_LIKE,
  ACTION_DISLIKE,
  ACTION_RATING,
  ACTION_SHARE,
  ACTION_BOOKMARK,
  ACTION_REPORT,
  ACTION_COMMENT,
  // Not sent
  ACTION_VOLUME, // NOT SENT
  ACTION_PLAY_STOP, // NOT SENT
  ACTION_OPTIONS, // NOT SENT
  // Not sent by now
  ACTION_SEE_MORE_USER, // NOT SENT BY NOW
  ACTION_SEE_MORE_ITEM, // NOT SENT BY NOW
}