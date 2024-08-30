export enum PlansEnum {
  MOMENTS = 'Moments',
  MOMENTS_DELUXE_MONTHLY = 'Moments Deluxe (Monthly)',
  MOMENTS_DELUXE_ANNUAL = 'Moments Deluxe (Annual)'
}

export enum UserStatusEnum {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  UNVERIFIED = 'unverified'
}
export enum UserRolesEnum {
  USER = 'user',
  ADMIN = 'admin'
}
export interface UserResponse {
  id: number
  name: string
  email: string
  role: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface TrustedAccountType {
  firstName: string
  lastName: string
  email: string
  relationship: string
}

export interface UsersListType {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string | null
  role: UserRolesEnum

  //! Добавити енам планів коли буде додано нові плани
  subscriptionType: string
  status: UserStatusEnum
}
export interface UserType {
  birthDate: string
  categories: string[]
  trustedAccount: TrustedAccountType
  dependentAccount: string[]
  email: string
  firstName: string
  id: string
  lastName: string
  plan: PlansEnum
  questionsAmount: number
  status: UserStatusEnum
  voiceRecordsLength: number
}

export interface MetaType {
  page: number
  limit: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
