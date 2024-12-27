// components/UserProfile.js
'use client'

import { useSession, signOut } from 'next-auth/react';
import Image from "next/image";

export function NavProfile() {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;

  return (
    <div className='flex items-center gap-6'>
      <Image 
        src={profileImage || Image} 
        alt="" 
        width={36} 
        height={36} 
        className="rounded-full"
      />
      <div className='flex flex-col'>
        <span className="text-xs leading-3 font-medium">
          {session?.user?.name}
        </span>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className='block px-4 py-2 text-sm text-gray-700 bg-review p-5'
        role='menuitem'
      >
        Sign Out
      </button>
    </div>
  );
}
