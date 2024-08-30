export type LoginResponse = {
  token: string
  user: object
}

export enum AuthStatusEnum {
  IDLE = 'idle',
  UNAUTHENTICATED = 'unauthenticated',
  AUTHENTICATED = 'authenticated'
}
