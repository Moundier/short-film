
export interface TokenDTO {
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

enum ErrorToken {
  ACCESS_DENIED = 'Invalid Token',
  EXPIRED_TOKEN = 'Expired Token',
  INVALID_TOKEN = 'Access Denied',
}

// export interface TokenCompleteDTO {
//   claims: { [key: string]: any },
//   subject: string,
//   issuer: string,
//   issuedAt: Date,
//   expiration: Date,
// }

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

