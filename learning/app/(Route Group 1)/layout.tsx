import Navbar1 from '@/components/Navbar1';
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar1/>
      {children}
    </div>
  )
}

export default Layout