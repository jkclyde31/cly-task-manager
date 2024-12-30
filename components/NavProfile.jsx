'use client'

import { useSession, signOut } from 'next-auth/react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function NavProfile() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect to login if no session
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // Show loading state while checking session
  if (status === 'loading') {
    return <div className="animate-pulse h-9 w-36 bg-gray-200 rounded-full" />
  }

  // Only render profile if authenticated
  if (!session?.user) {
    return null
  }

  const { image: profileImage, name } = session.user

  return (
    <div className='flex items-center gap-6'>
      {/* Default fallback image if no profile image */}
      <Image 
        src={profileImage || '/default-avatar.png'} 
        alt="Profile picture"
        width={36} 
        height={36} 
        className="rounded-full object-cover"
        priority
      />
      
      <div className='flex flex-col'>
        <span className="text-xs leading-3 font-medium">
          {name || 'User'}
        </span>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
          transition-colors rounded-md'
        role='menuitem'
      >
        Sign Out
      </button>
    </div>
  )
}