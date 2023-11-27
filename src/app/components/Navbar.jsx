'use client'
import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter()
  return (
    <nav  className='bg-celeste h-24 flex items-center'>
      <h1 onClick={() => router.push('/')}  className='text-3xl text-slate-500 font-semibold ml-5 cursor-pointer transition ease-in duration-75 hover:text-xl-custom'>My-Tasks</h1>
    </nav>
  );
};

export default Navbar;
