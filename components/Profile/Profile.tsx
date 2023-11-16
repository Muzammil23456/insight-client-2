import React, { useEffect, useState } from "react";
const Profile = () => {

  const [email,setEmail] = useState()
  const [userName,setUserName] = useState()

  useEffect(()=>{
    const profile = JSON.parse(localStorage.getItem("profile") || "{}")
    const email = profile[1]
    const name = profile[0]
    setEmail(email)
    setUserName(name)
  },[])
  
  return (
    <>
      <div className="flex gap-2">
        <h1 className="font-bold">Name:</h1>
        <p>{userName ? userName : 'N/A'}</p>
      </div>
      <div className="flex gap-2">
        <h1 className="font-bold">Email:</h1>
        <p>{email}</p>
      </div>
    </>
  );
};

export default Profile;
