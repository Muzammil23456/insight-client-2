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
import { RootState } from "@/app/GlobalRedux/store";
import { AlertSuccess, AlertError } from "@/components/Alert/Alert";
import { Confirm } from "@/components/Confirmation/Confirm";
import { db } from "@/modules/filebase";
import loader from "@/public/loading.png";

const Home = () => {
  // delaration
  const [form, setForm] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [firebase, setFirebase] = useState(false);
  const [table, setTable] = useState(true);
  const [use, setUse] = useState<object|null>(null);
  const auth = getAuth();
  const { text, booleanValue } = useSelector(
    (state: RootState) => state.textBoolean
  );
  const { text2, booleanValue2 } = useSelector(
    (state: RootState) => state.textReducer2
  );
  const dispatch = useDispatch();
  const [editForm, setEditForm] = useState<boolean>(false);

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
   const unsub = auth.onAuthStateChanged( (user) => {
      if (user) {
        setUse(user);
        action();
      } else {
        action();
      }
    });
    return unsub;
  }, [onAuthStateChanged]);


  // Sign Out
  const signout = () => {
    signOut(auth)
      .then(() => {
        setUse(null);
        dispatch(setBoolean(true));
        dispatch(setText("Successfully Sign Out"));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(setBoolean2(true));
        dispatch(setText2(errorMessage));
        action();
      });
  };

  useEffect(() => {
    if (db) {
      setTimeout(() => setFirebase(true), 1000);
    }
  }, []);

  return (
    <>
      {!firebase && (
        <div className="h-[100vh] flex justify-center items-center">
          <img
            className="animate-spin text-center"
            src={loader.src}
            alt="spinner-frame-8"
          />
        </div>
      )}
      {firebase && (
        <>
          <Confirm />
          {booleanValue && <AlertSuccess purpose={text} />}
          {booleanValue2 && <AlertError purpose={text2} />}
          <div className="flex justify-end gap-2 py-3">
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
          {form && <Form ondata={(data: boolean) => setForm(data)} />}
          {table && (
            <Tablee
              ondata={(data: boolean) => setEditForm(data)}
              ondata2={(data: boolean) => setForm(data)}
            />
          )}
          {editForm && (
            <EditForm
              ondata={editForm}
              ondata2={(data: boolean) => setEditForm(data)}
            />
          )}
          {signIn && <SignIn ondata={(data: boolean) => setSignIn(data)} />}
          {signUp && <SignUp ondata={(data: boolean) => setSignUp(data)} />}
        </>
      )}
    </>
  );
};

export default Home;
