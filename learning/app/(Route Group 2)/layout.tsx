import Navbar2 from '@/components/Navbar2';
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar2/>
      {children}
    </div>
  )
}

export default Layout