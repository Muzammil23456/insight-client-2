import { auth } from "@/modules/fileauth";
import React, { useEffect, useState } from "react";
const Profile = () => {

  return (
    <>
      <div className="flex gap-2">
        <h1 className="font-bold">Name:</h1>
        <p>{auth.currentUser?.displayName ? auth.currentUser?.displayName : 'N/A'}</p>
      </div>
      <div className="flex gap-2">
        <h1 className="font-bold">Email:</h1>
        <p>{auth.currentUser?.email}</p>
      </div>
    </>
  );
};

export default Profile;
