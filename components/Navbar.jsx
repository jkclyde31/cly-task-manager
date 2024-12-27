'use client'

import Image from "next/image"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';


const Navbar = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;



  return (
    <div className='flex items-center justify-between p-4'>
      {/* SEARCH BAR */}
      {/* <div className='hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
        <Image src="/search.png" alt="" width={14} height={14}/>
        <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none"/>
      </div> */}
      {/* ICONS AND USER */}
      <div className='flex items-center gap-6 justify-end w-full'>
        <Image src={profileImage || Image} alt="" width={36} height={36} className="rounded-full"/>
        <div className='flex flex-col'>
          <span className="text-xs leading-3 font-medium">{session?.user?.name}</span>
          {/* <span className="text-[10px] text-gray-500 text-right">Admin</span> */}
        </div> 

        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
          <Image src="/announcement.png" alt="" width={20} height={20}/>
          <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs'>1</div>
        </div>
        <button
                      onClick={() => {
                        signOut({ callbackUrl: '/' });
                      }}
                      className='block px-4 py-2 text-sm text-gray-700 bg-review p-5'
                      role='menuitem'
                      tabIndex='-1'
                      id='user-menu-item-2'
                    >
                      Sign Out
                    </button>
      </div>
    </div>
  )
}

export default Navbar