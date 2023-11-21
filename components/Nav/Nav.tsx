"use client";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import "./style.css";
import Link from "next/link";
import { useDispatch  } from "react-redux";
import {
  setText,
  setBoolean,
} from "@/app/GlobalRedux/Features/alert/alertSlice";
import {
  setText2,
  setBoolean2,
} from "@/app/GlobalRedux/Features/alert2/alert2Slice";
import { db } from "../../modules/filebase";
import {
  setSignUp,
  setSignIn,
} from "@/app/GlobalRedux/Features/Register/registerSlice";
import { collection, query, onSnapshot, orderBy } from "@firebase/firestore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { auth11 } from "@/modules/fileauth";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

type user={
  uid:string;
  role:string
}

const Nav = () => {
  const [use, setUse] = useState<object | null>(null);
  const auth = getAuth();
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");

  const [re, setRe] = useState(true);
  const dispatch = useDispatch();
  const [data3, setData3] = useState([]);
  const [verfied, setVerified] = useState(false);

  const router = useRouter();
  const action = () => {
    const X = window.scrollX;
    const Y = window.scrollY;
    window.scrollTo(0, 0);
    setTimeout(() => {
      dispatch(setBoolean(false));
      dispatch(setBoolean2(false));
      window.scrollTo(X, Y);
    }, 3000);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUse(user);
        action();
      } else {
        action();
      }
    });
  }, [onAuthStateChanged]);

  const getuser = () => {
    const q = query(collection(db, "user"));
    const unsub2: any = onSnapshot(q, (querySnapshot) => {
      let testarr2: any = [];
      querySnapshot.forEach((doc) => {
        testarr2.push({ ...doc.data() });
      });
      setData3(testarr2);
      // setLoading(false);
    });
    return unsub2;
  };
  const ttt = () => {
    const t = data3.forEach((e:user) => {
      if (auth11.currentUser?.uid == e?.uid && e?.role == "Admin") {
        localStorage.setItem("curUser", "admin");
        setRole("admin");
        setRe(false);
      } else if (auth11.currentUser?.uid == e?.uid && e?.role !== "Admin") {
        localStorage.setItem("curUser", "user");
      }
    });
    return t;
  };

  // useEffect


  useEffect(() => {
    getuser();
    ttt();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = auth11.currentUser?.displayName?.substring(0, 3)
        setAvatar(name as string)
        setUse(user);
        setRole((pre) => pre);
        setVerified(user.emailVerified);
      } else {
        setUse(null);
      }
    });
  }, [use,onAuthStateChanged]);

  // Sign Out
  const signout = () => {
    signOut(auth)
      .then(() => {
        router.replace("/");
        localStorage.removeItem("curUser");
        dispatch(setBoolean(true));
        dispatch(setText("Successfully Sign Out"));
        setUse(null);
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(setBoolean2(true));
        dispatch(setText2(errorMessage));
        action();
      });
  };

 
  return (
    <>
      <div className="flex justify-end gap-2 py-3">
        {use === null && (
          <>
            <button
              onClick={() => dispatch(setSignIn(true))}
              className="btn-signIn"
            >
              <span>Sign In</span>
            </button>
            <button
              onClick={() => dispatch(setSignUp(true))}
              className="btn-up"
            >
              <span>Sign Up</span>
            </button>
          </>
        )}
        {use !== null && (
          <>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback className="uppercase text-sm">
                    {avatar}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="block cursor-pointer"
                  onClick={() => {
                    router.replace("/");
                  }}
                >
                  Dashboard
                </DropdownMenuItem>
                <Link
                  className="active:text-red-600 block cursor-pointer"
                  href='/profile'
                >
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="block cursor-pointer"
                  onClick={signout}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </>
  );
};

export default Nav;
