import React,{useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../../public/vercel.svg";
import {headerData} from "../../../../utils/initialValues"
import { useRouter } from "next/router";
import {redirectUrl} from "../../../../utils/helper"
// import {useAppDispatch} from "../../../../redux/store"

import { postLogin ,setLoginRes} from "@/redux/slices/loginSlice";
import { useDispatch ,useSelector} from "react-redux";
type BoxProps = {
  children: React.ReactNode; // 👈️ type children
};
const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  console.log(dispatch,"dispatch")
  console.log(headerData,"data")
  const handleRoute = ()=>{
    router?.push("/") 
    // dispatch(postLogin())
  }
  useEffect(()=>{
    dispatch(postLogin())
  },[])
 const pathCreator = (ele:any)=>{
  console.log(ele,"ele")
  let path:any = "";
  switch(ele.route){
    case "root":
    path =  redirectUrl("/") 
     break;
     case "contact":
      path =  redirectUrl("contact")
      break;
      case "blog" : 
      path = redirectUrl("blog")
      break;
      case "login":
        path = redirectUrl("login")
  }
   return path
 }


  return (
    <>
      <header className="section-navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link href={"/"}>
              <Image src={logo} className="image" alt="logo"/>
            </Link>
          </div>
          <div className="navbar">
            <ul className="" >
              {headerData?.map((ele)=>(
                   <Link href={pathCreator(ele)} onClick={handleRoute} className="nav-link">
                   <li className="nav-item">{ele.name}</li>
                 </Link>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
