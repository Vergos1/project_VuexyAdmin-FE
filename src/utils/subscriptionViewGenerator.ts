import { SubscriptionType } from '@/types/userTypes'

export const subscriptionViewGenerator = (plan: string) => {
  switch (plan) {
    case SubscriptionType.Free:
      return 'Moments'
    case SubscriptionType.Monthly:
      return 'Moments Deluxe (Monthly)'
    case SubscriptionType.Annual:
      return 'Moments Deluxe (Annual)'
    default:
      return 'Moments'
  }
}
