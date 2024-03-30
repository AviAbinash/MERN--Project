import React from 'react'
import Header from "./Header"
import Footer from './Footer';
type BoxProps = {
  children: React.ReactNode; // 👈️ type children
};
const Layout = ({children}:any) => {
  console.log(children,"children")
  return (
    <div>
      <Header/>{children}
      <Footer/>
    </div>
  )
}

export default Layout
