"use client";

import BigBtn from "@/components/BigBtn/BigBtn";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const page = () => {
  const [user,setUser] = useState('')
  const curUser = localStorage.getItem("curUser");
  useEffect(() => {
    setUser(`${curUser}`)
    if (curUser=='') {
      redirect("/");
    }
  }, []);
  return (
    <>
      {user == 'admin' && <h1 className="text-3xl  font-bold ">Admin Panel</h1>}
      {user == 'user' && <h1 className="text-3xl  font-bold ">User</h1>}
    </>
  );
};

export default page;
