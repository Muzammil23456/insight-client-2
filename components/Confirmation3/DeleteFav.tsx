"use client";

import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDispatch, useSelector } from "react-redux";
import { setContinue } from "../../app/GlobalRedux/Features/confirm/confirmSlice";
import {
  setText2,
  setBoolean2,
} from "../../app/GlobalRedux/Features/alert2/alert2Slice";
import { setBoolean5 } from "../../app/GlobalRedux/Features/confirm/confirmSlice";
import {
  setText,
  setBoolean,
} from "../../app/GlobalRedux/Features/alert/alertSlice";
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "../../modules/filebase";
import { RootState } from "@/app/GlobalRedux/store";

export function DeleteFav() {
  const { text5, booleanValue5 } = useSelector(
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
    await deleteDoc(doc(db, "Favourites", id))
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
    <AlertDialog open={booleanValue5} onOpenChange={setBoolean5}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{text5}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => dispatch(setBoolean5(false))}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              const id = localStorage.getItem("deleteFav");
              deleteItem(id);
              dispatch(setContinue(true));
              dispatch(setBoolean5(false));
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
