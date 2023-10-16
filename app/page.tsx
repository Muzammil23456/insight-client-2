"use client";

import EditForm from "@/components/EditForm/EditForm";
import Form from "@/components/Form/Form";
import SignIn from "@/components/Signin/SignIn";
import SignUp from "@/components/Signup/SignUp";
import Stepper from "@/components/Stepper/Stepper";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Tablee from "@/components/Table/Table";
import { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { setText, setBoolean } from "./GlobalRedux/Features/alert/alertSlice";
import {
  setText2,
  setBoolean2,
} from "./GlobalRedux/Features/alert2/alert2Slice";
import { AlertSuccess, AlertError } from "@/components/Alert/Alert";
import { Confirm } from "@/components/Confirmation/Confirm";
const Home = () => {

  // delaration
  const [form, setForm] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [table, setTable] = useState(true);
  const [use, setUse] = useState(null);
  const auth = getAuth();
  const { text, booleanValue } = useSelector((state) => state.textBoolean);
  const { text2, booleanValue2 } = useSelector((state) => state.textReducer2);
  const dispatch = useDispatch();
  const [editForm, setEditForm] = useState(false);

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

  // useEffect
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUse(user);
        action();
      } else if (!user) {
        action();
      }
    });
  }, [onAuthStateChanged]);

  //Sign Out
  const signout = () => {
    signOut(auth)
      .then(() => {
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
      {/* <Stepper/> */}
      <Confirm/>
      {booleanValue && <AlertSuccess purpose={text} />}
      {booleanValue2 && <AlertError purpose={text2} />}
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
        {use !== null && (
          <button onClick={signout} className="btn-out">
            Sign Out
          </button>
        )}
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