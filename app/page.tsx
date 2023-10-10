"use client";

import EditForm from "@/components/EditForm/EditForm";
import Form from "@/components/Form/Form";
import SignIn from "@/components/Signin/SignIn";
import SignUp from "@/components/Signup/SignUp";
import Stepper from "@/components/Stepper/Stepper";
import { getAuth, onAuthStateChanged ,signOut } from "firebase/auth";
import Tablee from "@/components/Table/Table";
import { useEffect, useState } from "react";
import "./style.css";
import Alertt from "@/components/Alert/Alert";
const Home = () => {
  const [form, setForm] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [table, setTable] = useState(true);
  const [use, setUse] = useState(null);
  const [editForm, setEditForm] = useState(false);

  const auth = getAuth();
useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      setUse(user);
    } else {
      // User is signed out
      // ...
    }
  });
},[])
 
  console.log(use)
  const signout = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      alert (`sign out`)
      setUse(null)
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <>
      {/* <Stepper/> */}
      <div className="flex justify-end gap-2 pt-3">
        {use === null && (
          <>
            <button onClick={() => setSignIn(true)} className="btn-in">
              <span>Sign In</span>
            </button>
            <button onClick={() => setSignUp(true)} className="btn-up">
              <span>Sign Up</span>
            </button>
          </>
        )}
        {use !== null && <button onClick={signout} className="btn-out">Sign Out</button>}
      </div>
      {form && <Form ondata={(data: any) => setForm(data)} />}
      {table && (
        <Tablee
          ondata={(data: any) => setEditForm(data)}
          ondata2={(data: any) => setForm(data)}
        />
      )}
      {editForm && (
        <EditForm
          ondata={editForm}
          ondata2={(data: any) => setEditForm(data)}
        />
      )}
      {signIn && <SignIn ondata={(data) => setSignIn(data)} />}
      {signUp && <SignUp ondata={(data) => setSignUp(data)} />}
    </>
  );
};

export default Home;
