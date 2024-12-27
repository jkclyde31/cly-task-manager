import { getNotification } from "@/app/actions/fetchNotifications"
import NotificationCount from "./NotificationCount"
 
export async function NotificationWrapper() {
  const notifications = await getNotification()
  const count = notifications.length
  
  return <NotificationCount 
    initialCount={count} 
    notifications={notifications}
  />
}