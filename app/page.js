'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push('/admin');
    }else{
      router.push('/login');
    }
  }, [session, router]);

  return (
    <h1>
      {/* Homepage */}
    </h1>
  );
}

export default Navbar