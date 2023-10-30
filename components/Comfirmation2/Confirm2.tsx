"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setText4,
  setBoolean4,
  setContinue,
} from "../../app/GlobalRedux/Features/confirm/confirmSlice";
import {
  setText2,
  setBoolean2,
} from "../../app/GlobalRedux/Features/alert2/alert2Slice";
import {
  setText,
  setBoolean,
} from "../../app/GlobalRedux/Features/alert/alertSlice";
import { deleteDoc, doc} from "@firebase/firestore";
import { db } from "../../modules/filebase";
import { RootState } from "@/app/GlobalRedux/store";
import { deleteUser } from "firebase/auth";

export function Confirm2() {
  const [open, setOpen] = useState(false);
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

  const deleteItem = async (id: string,uid: string) => {
    console.log(id)
    await deleteDoc(doc(db, "user",id))
      .then(() => {       
        dispatch(setBoolean(true));
        dispatch(setText("Successfully Deleted"));
        action();
        dispatch(setContinue(false));
      })
      .catch((error) => {
        alert('f')
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
              const id = localStorage.getItem("delete2");
              const uid = localStorage.getItem("delete3");
              deleteItem(id,uid);
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
