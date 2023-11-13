import React, { useEffect } from "react";
import { auth, auth11 } from "@/modules/fileauth";
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
