'use client'
 
import { Bell } from 'lucide-react'
import { useState } from 'react'
 
function NotificationCount({ initialCount }) {
  const [count] = useState(initialCount)
  
  return (
    <div className="relative">
      <Bell className="w-6 h-6 text-gray-600" />
      {count > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
          rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </div>
      )}
    </div>
  )
}

export default NotificationCount