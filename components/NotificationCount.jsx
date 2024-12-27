'use client'
 
import { Bell } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'

function NotificationCount({ initialCount, notifications }) {
  const [count, setCount] = useState(initialCount)
  const [isOpen, setIsOpen] = useState(false)
  const [notificationList, setNotificationList] = useState(notifications || [])
  const dropdownRef = useRef(null)

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative focus:outline-none"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {count > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
            rounded-full w-5 h-5 flex items-center justify-center">
            {count}
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-50 max-h-96 overflow-y-auto">
          <div className="px-4 py-2 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
          </div>
          
          {notificationList.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              No new notifications
            </div>
          ) : (
            notificationList.map((notification) => (
              <div 
                key={notification._id} 
                className={`px-4 py-3 hover:bg-gray-50 transition-colors ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
              >
                <p className="text-sm text-gray-800">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {format(new Date(notification.createdAt), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationCount