import { auth } from "@/modules/fileauth";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
type data = {
  displayName: string;
  email: string;
};
const Profile = () => {
  const [user, setUser] = useState<any>({});
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user;
      setUser(uid);
    }
  });

  return (
    <>
      <div className="flex gap-2">
        <h1 className="font-bold">Name:</h1>
        <p>{user.displayName}</p>
      </div>
      <div className="flex gap-2">
        <h1 className="font-bold">Email:</h1>
        <p>{user.email}</p>
      </div>
    </>
  );
};

export default Profile;
