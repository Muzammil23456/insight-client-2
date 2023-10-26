"use client";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Tablee from "@/components/Table/Table";
import { useEffect, useState } from "react";
import "./style.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  setText,
  setBoolean,
} from "@/app/GlobalRedux/Features/alert/alertSlice";
import {
  setText2,
  setBoolean2,
} from "@/app/GlobalRedux/Features/alert2/alert2Slice";
import {
  setSignUp,
  setSignIn,
} from "@/app/GlobalRedux/Features/Register/registerSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const Nav = () => {
  const [use, setUse] = useState<object | null>(null);
  const [url, setUrl] = useState("");
  const auth = getAuth();
  const dispatch = useDispatch();
  const [editForm, setEditForm] = useState<boolean>(false);

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

  useEffect(() => {}, [localStorage]);
  // Sign Out
  const signout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("curUser");
        router.replace("/");
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
              className="btn-in"
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
                    {auth11.currentUser?.displayName?.substring(0, 3)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
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
