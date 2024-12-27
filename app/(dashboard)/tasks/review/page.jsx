import { Bell, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { getNotification } from '@/app/actions/fetchNotifications';

export default async function NotificationsPage() {
  const notifications = await getNotification();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No new notifications
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {notification.taskId.name}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {notification.taskId.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          {notification.message}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}