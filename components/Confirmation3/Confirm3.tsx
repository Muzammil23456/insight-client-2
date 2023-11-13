"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setContinue,
} from "../../app/GlobalRedux/Features/confirm/confirmSlice";
import {
  setText2,
  setBoolean2,
} from "../../app/GlobalRedux/Features/alert2/alert2Slice";
import { setBoolean4 } from "../../app/GlobalRedux/Features/confirm/confirmSlice";
import {
  setText,
  setBoolean,
} from "../../app/GlobalRedux/Features/alert/alertSlice";
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "../../modules/filebase";
import { RootState } from "@/app/GlobalRedux/store";

export function Confirm3() {
  const { text4, booleanValue4 } = useSelector(
    (state: RootState) => state.textReducer3
  );

  const dispatch = useDispatch();
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

  const deleteItem = async (id: any) => {
    await deleteDoc(doc(db, "Favourite-Movies", id))
      .then(() => {
        dispatch(setBoolean(true));
        dispatch(setText("Successfully Deleted"));
        action();
        dispatch(setContinue(false));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(setBoolean2(true));
        dispatch(setText2(errorMessage));
        action();
        dispatch(setContinue(false));
      });
  };

  useEffect(() => {}, []);
  return (
    <AlertDialog open={booleanValue4} onOpenChange={setBoolean4}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{text4}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => dispatch(setBoolean4(false))}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              const id = localStorage.getItem("delete3");
              deleteItem(id);
              dispatch(setContinue(true));
              dispatch(setBoolean4(false));
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
