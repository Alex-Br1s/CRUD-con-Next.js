import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 flex justify-between px-6 items-center h-20">
      <Link href="/">
        <h3 className="font-bold text-3xl">NextCRUD</h3>
      </Link>
      <ul className="flex gap-5 text-lg font-bold">
        <li>
          <Link href="/new" className="text-slate-200 hover:text-slate-400">
            New
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-slate-200 hover:text-slate-400">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
